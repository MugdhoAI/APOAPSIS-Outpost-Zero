import {
  BASE_FOOD_USE,
  BASE_OXYGEN_USE,
  BASE_POWER_DEMAND,
  BASE_WATER_USE,
  CARD_ORDER,
  DUST_PENALTY_SERVICED,
  DUST_PENALTY_UNSERVICED,
  INITIAL_RESOURCES,
  MAX_CYCLES,
  PARTICLE_SHIELD_THRESHOLD,
  PARTICLE_SHIELDED_CREW_LOSS,
  PARTICLE_UNSHIELDED_CREW_LOSS,
  RATION_FOOD_USE,
  RESOURCE_META,
  RESOURCE_ORDER,
  SECURED_THRESHOLDS,
  SOLAR_GENERATION,
  SOLAR_UPGRADE_BONUS,
  STATUS_CUTOFFS,
  clampValue,
} from "./constants";
import { ACTIONS, ACTIONS_BY_ID, getEventForCycle } from "./content";
import type {
  ActionAvailability,
  ActionId,
  CycleReport,
  DecisionRecord,
  GameAction,
  GameState,
  MissionResult,
  ObjectiveCheck,
  ResolveResult,
  ResourceKey,
  Resources,
  SimulationStep,
} from "./types";

export function createInitialState(): GameState {
  return {
    cycle: 1,
    maxCycles: MAX_CYCLES,
    resources: { ...INITIAL_RESOURCES },
    solarServiced: false,
    history: [],
    status: "active",
    failureReasons: [],
  };
}

/** Clamp a partial change onto a resource set and report what actually happened. */
function applyDelta(
  resources: Resources,
  delta: Partial<Resources>,
): { resources: Resources; applied: Partial<Resources> } {
  const next: Resources = { ...resources };
  const applied: Partial<Resources> = {};

  for (const key of RESOURCE_ORDER) {
    const change = delta[key];
    if (change === undefined) continue;
    const before = next[key];
    const after = clampValue(before + change);
    if (after !== before) {
      next[key] = after;
      applied[key] = after - before;
    }
  }

  return { resources: next, applied };
}

function formatSigned(value: number): string {
  const rounded = Math.round(value);
  return rounded > 0 ? `+${rounded}` : `${rounded}`;
}

function findShortfall(resources: Resources, effects: Partial<Resources>): string | null {
  for (const key of RESOURCE_ORDER) {
    const change = effects[key];
    if (change === undefined || change >= 0) continue;
    const needed = Math.abs(change);
    if (resources[key] < needed) {
      const meta = RESOURCE_META[key];
      return `Needs ${needed} ${meta.unit}, reserve has ${resources[key]} ${meta.unit}`;
    }
  }
  return null;
}

export function getActionAvailability(state: GameState): ActionAvailability[] {
  return ACTIONS.map((action) => {
    if (action.id === "solar" && state.solarServiced) {
      return { action, available: false, reason: "Already serviced this mission" };
    }
    const shortfall = findShortfall(state.resources, action.effects);
    if (shortfall) return { action, available: false, reason: shortfall };
    return { action, available: true };
  });
}

export function describeActionEffects(action: GameAction): string {
  const parts = RESOURCE_ORDER.flatMap((key) => {
    const change = action.effects[key];
    if (change === undefined) return [];
    return [`${formatSigned(change)} ${RESOURCE_META[key].unit}`];
  });
  return parts.join(", ");
}

export function getResourceWarnings(resources: Resources): string[] {
  const warnings: string[] = [];
  for (const key of RESOURCE_ORDER) {
    const cutoffs = STATUS_CUTOFFS[key];
    const value = resources[key];
    const meta = RESOURCE_META[key];
    if (value <= 0) continue;
    if (value <= cutoffs.critical) {
      warnings.push(`${meta.name} is critical at ${value} ${meta.unit}. One more drain and it is empty.`);
    } else if (value <= cutoffs.low) {
      warnings.push(`${meta.name} is running low at ${value} ${meta.unit}.`);
    }
  }
  return warnings;
}

const FAILURE_MESSAGES: Partial<Record<ResourceKey, string>> = {
  power: "The power reserve reached zero. With no stored energy the habitat cannot run heating or life support.",
  water: "The water reserve reached zero. Drinking water and cooling are gone.",
  oxygen: "The oxygen reserve reached zero. The crew has no breathable air left.",
  food: "The food reserve reached zero. The crew has nothing left to eat.",
  crew: "Crew condition reached zero. The crew cannot keep the outpost running.",
};

function findFailures(resources: Resources): string[] {
  const reasons: string[] = [];
  for (const key of RESOURCE_ORDER) {
    if (resources[key] <= 0) {
      const message = FAILURE_MESSAGES[key];
      if (message) reasons.push(message);
    }
  }
  return reasons;
}

export function meetsSecuredThresholds(resources: Resources): boolean {
  return (
    resources.power >= SECURED_THRESHOLDS.reserve &&
    resources.water >= SECURED_THRESHOLDS.reserve &&
    resources.oxygen >= SECURED_THRESHOLDS.reserve &&
    resources.food >= SECURED_THRESHOLDS.reserve &&
    resources.shielding >= SECURED_THRESHOLDS.shielding &&
    resources.crew >= SECURED_THRESHOLDS.crew
  );
}

export function getObjectiveChecks(resources: Resources): ObjectiveCheck[] {
  return [
    {
      label: `Power reserve at ${SECURED_THRESHOLDS.reserve} PU or higher`,
      met: resources.power >= SECURED_THRESHOLDS.reserve,
    },
    {
      label: `Water reserve at ${SECURED_THRESHOLDS.reserve} WU or higher`,
      met: resources.water >= SECURED_THRESHOLDS.reserve,
    },
    {
      label: `Oxygen reserve at ${SECURED_THRESHOLDS.reserve} OU or higher`,
      met: resources.oxygen >= SECURED_THRESHOLDS.reserve,
    },
    {
      label: `Food reserve at ${SECURED_THRESHOLDS.reserve} FU or higher`,
      met: resources.food >= SECURED_THRESHOLDS.reserve,
    },
    {
      label: `Protection index at ${SECURED_THRESHOLDS.shielding} RPI or higher`,
      met: resources.shielding >= SECURED_THRESHOLDS.shielding,
    },
    {
      label: `Crew condition at ${SECURED_THRESHOLDS.crew} CCI or higher`,
      met: resources.crew >= SECURED_THRESHOLDS.crew,
    },
  ];
}

/**
 * One cycle, in the documented order: action costs and benefits, power
 * balance, crew upkeep, then the scripted event. Returns a new state; the
 * input state is never mutated.
 */
export function resolveCycle(state: GameState, actionId: ActionId): ResolveResult {
  if (state.status !== "active") {
    return { ok: false, reason: "This mission has already ended." };
  }
  if (state.cycle > state.maxCycles) {
    return { ok: false, reason: "All five cycles are complete." };
  }

  const action = ACTIONS_BY_ID[actionId];
  if (!action) {
    return { ok: false, reason: "That action does not exist." };
  }

  const availability = getActionAvailability(state).find((entry) => entry.action.id === actionId);
  if (!availability || !availability.available) {
    return { ok: false, reason: availability?.reason ?? "That action is not available." };
  }

  const cycle = state.cycle;
  const before = { ...state.resources };
  const event = getEventForCycle(cycle);
  const arrayWasServiced = state.solarServiced;
  const steps: SimulationStep[] = [];

  // Step 1: the chosen action's immediate costs and benefits.
  let working = { ...state.resources };
  const actionResult = applyDelta(working, action.effects);
  working = actionResult.resources;
  steps.push({
    kind: "action",
    label: action.label,
    detail: `Immediate effect: ${describeActionEffects(action) || "no reserve change"}.`,
    delta: actionResult.applied,
  });

  // Step 2: power generation and baseline demand. Dust is handled in step 4 so
  // the event is visible in the report instead of hiding inside the balance.
  let workingPower = working;
  const generation = SOLAR_GENERATION + (arrayWasServiced ? SOLAR_UPGRADE_BONUS : 0);
  const netPower = generation - BASE_POWER_DEMAND;
  const powerResult = applyDelta(workingPower, { power: netPower });
  workingPower = powerResult.resources;
  steps.push({
    kind: "power",
    label: "Power balance",
    detail: `Solar generation +${generation} PU${arrayWasServiced ? " (serviced array)" : ""}, base demand −${BASE_POWER_DEMAND} PU.`,
    delta: powerResult.applied,
  });

  // Step 3: crew upkeep, with the ration protocol reducing food use.
  let workingUpkeep = workingPower;
  const foodUse = action.rationing ? RATION_FOOD_USE : BASE_FOOD_USE;
  const upkeepResult = applyDelta(workingUpkeep, {
    water: -BASE_WATER_USE,
    oxygen: -BASE_OXYGEN_USE,
    food: -foodUse,
  });
  workingUpkeep = upkeepResult.resources;
  steps.push({
    kind: "consumption",
    label: "Crew upkeep",
    detail: `Water −${BASE_WATER_USE} WU, oxygen −${BASE_OXYGEN_USE} OU, food −${foodUse} FU${
      action.rationing ? " (ration protocol in force)" : ""
    }.`,
    delta: upkeepResult.applied,
  });

  // Step 4: the deterministic event for this cycle.
  let workingEvent = workingUpkeep;
  let eventOutcome: string | null = null;

  if (event?.kind === "dust") {
    const penalty = arrayWasServiced ? DUST_PENALTY_SERVICED : DUST_PENALTY_UNSERVICED;
    const dustResult = applyDelta(workingEvent, { power: -penalty });
    workingEvent = dustResult.resources;
    eventOutcome = `Dust cut generation by ${penalty} PU because the array ${
      arrayWasServiced ? "was serviced earlier" : "had not been serviced"
    }.`;
    steps.push({
      kind: "event",
      label: `Event: ${event.title}`,
      detail: eventOutcome,
      delta: dustResult.applied,
    });
  } else if (event?.kind === "particle") {
    const shielded = workingEvent.shielding >= PARTICLE_SHIELD_THRESHOLD;
    const loss = shielded ? PARTICLE_SHIELDED_CREW_LOSS : PARTICLE_UNSHIELDED_CREW_LOSS;
    const particleResult = applyDelta(workingEvent, { crew: -loss });
    workingEvent = particleResult.resources;
    eventOutcome = shielded
      ? `Protection stood at ${workingUpkeep.shielding} RPI when the event arrived, at or above the ${PARTICLE_SHIELD_THRESHOLD} RPI target, so the crew lost ${loss} CCI.`
      : `Protection stood at ${workingUpkeep.shielding} RPI when the event arrived, below the ${PARTICLE_SHIELD_THRESHOLD} RPI target, so the crew lost ${loss} CCI.`;
    steps.push({
      kind: "event",
      label: `Event: ${event.title}`,
      detail: eventOutcome,
      delta: particleResult.applied,
    });
  }

  // Step 5: warnings, failure, and end conditions.
  const after = workingEvent;
  const warnings = getResourceWarnings(after);
  const failureReasons = findFailures(after);
  const status: GameState["status"] =
    failureReasons.length > 0
      ? "failed"
      : cycle >= state.maxCycles
        ? meetsSecuredThresholds(after)
          ? "secured"
          : "warnings"
        : "active";

  const record: DecisionRecord = {
    cycle,
    actionId: action.id,
    actionLabel: action.label,
    before,
    after,
    eventTitle: event?.title ?? null,
    eventOutcome,
    warnings,
  };

  const nextState: GameState = {
    cycle: status === "active" ? cycle + 1 : cycle,
    maxCycles: state.maxCycles,
    resources: after,
    solarServiced: state.solarServiced || action.id === "solar",
    history: [...state.history, record],
    status,
    failureReasons,
  };

  const report: CycleReport = {
    cycle,
    action,
    event,
    before,
    after,
    steps,
    warnings,
    tradeOff: action.tradeOff,
    status,
    failureReasons,
  };

  return { ok: true, state: nextState, report };
}

export function evaluateMission(state: GameState): MissionResult {
  const checks = getObjectiveChecks(state.resources);
  const reserveAverage =
    (state.resources.power + state.resources.water + state.resources.oxygen + state.resources.food) / 4;

  // Outpost Stability: 40 points crew condition, 40 points average consumable
  // reserves, 20 points protection. A transparent game score, not a measure of
  // real mission performance.
  const score = Math.round(
    (state.resources.crew / 100) * 40 +
      (reserveAverage / 100) * 40 +
      (state.resources.shielding / 100) * 20,
  );

  let weakest: { key: ResourceKey; value: number } | null = null;
  for (const key of CARD_ORDER) {
    if (!weakest || state.resources[key] < weakest.value) {
      weakest = { key, value: state.resources[key] };
    }
  }

  const headline =
    state.status === "secured"
      ? "Mission secured"
      : state.status === "warnings"
        ? "Mission survived with warnings"
        : "Mission failed";

  const summary =
    state.status === "secured"
      ? "All five cycles are complete and every mission objective was met."
      : state.status === "warnings"
        ? "The crew is alive and the outpost still has reserves, but at least one objective was missed."
        : "A critical reserve ran out before the fifth cycle ended.";

  return { status: state.status, headline, summary, score, checks, weakest };
}

export type KeyTradeOff = {
  cycle: number;
  actionLabel: string;
  text: string;
  cost: number;
};

/** The choice that consumed the most points in total. Used in the debrief. */
export function findKeyTradeOff(history: DecisionRecord[]): KeyTradeOff | null {
  let best: KeyTradeOff | null = null;

  for (const record of history) {
    const action = ACTIONS_BY_ID[record.actionId];
    const cost = RESOURCE_ORDER.reduce((total, key) => {
      const change = action.effects[key];
      return change !== undefined && change < 0 ? total + Math.abs(change) : total;
    }, 0);

    if (!best || cost > best.cost) {
      best = {
        cycle: record.cycle,
        actionLabel: action.label,
        text: action.tradeOff,
        cost,
      };
    }
  }

  return best;
}

/** Total change between two resource snapshots, for history chips. */
export function diffResources(before: Resources, after: Resources): Partial<Resources> {
  const delta: Partial<Resources> = {};
  for (const key of RESOURCE_ORDER) {
    const change = after[key] - before[key];
    if (change !== 0) delta[key] = change;
  }
  return delta;
}
