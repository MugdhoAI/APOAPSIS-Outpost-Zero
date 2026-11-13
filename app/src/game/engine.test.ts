import { describe, expect, it } from "vitest";
import {
  createInitialState,
  diffResources,
  evaluateMission,
  findKeyTradeOff,
  getActionAvailability,
  getResourceWarnings,
  meetsSecuredThresholds,
  resolveCycle,
} from "./engine";
import { INITIAL_RESOURCES, MAX_CYCLES, RESOURCE_ORDER } from "./constants";
import { ACTIONS } from "./content";
import type { ActionId, GameState } from "./types";

function playSequence(ids: ActionId[]): GameState {
  let state = createInitialState();
  for (const id of ids) {
    const result = resolveCycle(state, id);
    if (!result.ok) throw new Error(`Unexpected rejection for ${id}: ${result.reason}`);
    state = result.state;
  }
  return state;
}

describe("initial state", () => {
  it("uses the documented starting values and an empty history", () => {
    const state = createInitialState();
    expect(state.resources).toEqual(INITIAL_RESOURCES);
    expect(state.cycle).toBe(1);
    expect(state.maxCycles).toBe(MAX_CYCLES);
    expect(state.status).toBe("active");
    expect(state.history).toEqual([]);
    expect(state.solarServiced).toBe(false);
  });

  it("returns independent state objects so restart is clean", () => {
    const first = createInitialState();
    first.resources.power = 1;
    first.history.push({
      cycle: 1,
      actionId: "solar",
      actionLabel: "Service solar arrays",
      before: { ...INITIAL_RESOURCES },
      after: { ...INITIAL_RESOURCES },
      eventTitle: null,
      eventOutcome: null,
      warnings: [],
    });

    const second = createInitialState();
    expect(second.resources.power).toBe(INITIAL_RESOURCES.power);
    expect(second.history).toHaveLength(0);
  });
});

describe("documented balanced path", () => {
  const path: ActionId[] = ["solar", "shelter", "waterRecovery", "oxygenGenerator", "greenhouse"];

  it("reaches the totals listed in GAMEPLAY_SPEC.md", () => {
    const state = playSequence(path);

    expect(state.resources.power).toBe(28);
    expect(state.resources.water).toBe(40);
    expect(state.resources.oxygen).toBe(53);
    expect(state.resources.food).toBe(51);
    expect(state.resources.shielding).toBe(52);
    expect(state.resources.crew).toBe(95);
  });

  it("ends with a secured mission and a full history", () => {
    const state = playSequence(path);

    expect(state.status).toBe("secured");
    expect(meetsSecuredThresholds(state.resources)).toBe(true);
    expect(state.history).toHaveLength(MAX_CYCLES);
    expect(state.history.map((record) => record.cycle)).toEqual([1, 2, 3, 4, 5]);

    const result = evaluateMission(state);
    expect(result.headline).toBe("Mission secured");
    expect(result.checks.every((check) => check.met)).toBe(true);
    expect(result.score).toBeGreaterThan(50);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("is deterministic for the same starting state and action", () => {
    const start = createInitialState();
    const first = resolveCycle(start, "solar");
    const second = resolveCycle(start, "solar");

    expect(first.ok && second.ok).toBe(true);
    if (!first.ok || !second.ok) return;
    expect(first.state).toEqual(second.state);
    expect(first.report).toEqual(second.report);
  });

  it("does not mutate the state it was given", () => {
    const start = createInitialState();
    const snapshot = JSON.stringify(start);

    resolveCycle(start, "shelter");

    expect(JSON.stringify(start)).toBe(snapshot);
  });

  it("reports step deltas that add up to the recorded change", () => {
    const start = createInitialState();
    const result = resolveCycle(start, "shelter");
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    for (const key of RESOURCE_ORDER) {
      const summed = result.report.steps.reduce((total, step) => total + (step.delta[key] ?? 0), 0);
      const recorded = result.report.after[key] - result.report.before[key];
      expect(summed, `delta mismatch for ${key}`).toBe(recorded);
    }
  });
});

describe("cycle rules", () => {
  it("applies base cycle upkeep of minus three power without upgrades", () => {
    const state = playSequence(["ration"]);
    // 74 power, no action power cost, +10 generation, -13 demand
    expect(state.resources.power).toBe(71);
    // 62 water - 5 upkeep
    expect(state.resources.water).toBe(57);
    // 64 oxygen - 5 upkeep
    expect(state.resources.oxygen).toBe(59);
  });

  it("lets the array upgrade raise generation only in later cycles", () => {
    const afterServicing = playSequence(["solar"]);
    // 74 - 8 cost, then +10 generation - 13 demand
    expect(afterServicing.resources.power).toBe(63);
    expect(afterServicing.solarServiced).toBe(true);

    const next = playSequence(["solar", "ration"]);
    // 63 + 15 generation - 13 demand
    expect(next.resources.power).toBe(65);
  });

  it("blocks a second array servicing", () => {
    const state = playSequence(["solar"]);
    const availability = getActionAvailability(state).find((entry) => entry.action.id === "solar");
    expect(availability?.available).toBe(false);
    expect(availability?.reason).toMatch(/already serviced/i);

    const attempt = resolveCycle(state, "solar");
    expect(attempt.ok).toBe(false);
    if (!attempt.ok) expect(attempt.reason).toMatch(/already serviced/i);
  });

  it("rejects an action the outpost cannot pay for without changing state", () => {
    const poor: GameState = { ...createInitialState(), resources: { ...INITIAL_RESOURCES, power: 4 } };
    const availability = getActionAvailability(poor).find((entry) => entry.action.id === "greenhouse");
    expect(availability?.available).toBe(false);
    expect(availability?.reason).toContain("Needs 11 PU");

    const attempt = resolveCycle(poor, "greenhouse");
    expect(attempt.ok).toBe(false);
    expect(poor.resources.power).toBe(4);
  });

  it("reduces food use by three units under the ration protocol and costs crew condition", () => {
    const normal = playSequence(["solar"]);
    const rationed = playSequence(["ration"]);

    expect(normal.resources.food).toBe(53);
    expect(rationed.resources.food).toBe(56);
    expect(rationed.resources.power - normal.resources.power).toBe(8);
    expect(rationed.resources.crew).toBe(96);
  });

  it("keeps the particle event small when protection is at the threshold", () => {
    // The shelter action is taken in cycle 2, the same cycle the event resolves in.
    // This is intended: the event checks protection after the action (GAMEPLAY_SPEC.md),
    // so the cycle 2 science note must not claim a shelter built that late is wasted.
    const shielded = playSequence(["ration", "shelter"]);
    expect(shielded.resources.shielding).toBe(52);
    expect(shielded.resources.crew).toBe(91);

    const unshielded = playSequence(["ration", "waterRecovery"]);
    expect(unshielded.resources.shielding).toBe(32);
    expect(unshielded.resources.crew).toBe(71);
  });

  it("applies the larger dust penalty when the array was never serviced", () => {
    const state = playSequence(["shelter", "shelter", "shelter", "shelter"]);
    // Power path: 59, 44, 29, then 17 + 10 - 13 - 5 dust = 9
    expect(state.resources.power).toBe(9);
    // Shielding clamps at the maximum instead of running past it.
    expect(state.resources.shielding).toBe(100);
  });

  it("clamps every resource inside the 0 to 100 range", () => {
    const sequences: ActionId[][] = [
      ["greenhouse", "greenhouse", "greenhouse", "greenhouse", "greenhouse"],
      ["shelter", "shelter", "shelter", "shelter", "shelter"],
      ["ration", "ration", "ration", "ration", "ration"],
    ];

    for (const sequence of sequences) {
      let state = createInitialState();
      for (const id of sequence) {
        const result = resolveCycle(state, id);
        if (!result.ok) continue;
        state = result.state;
        for (const key of RESOURCE_ORDER) {
          expect(state.resources[key], `${key} out of range`).toBeGreaterThanOrEqual(0);
          expect(state.resources[key], `${key} out of range`).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

describe("mission outcomes", () => {
  it("fails when a reserve is emptied and names the system", () => {
    const nearlyOut: GameState = {
      ...createInitialState(),
      resources: { ...INITIAL_RESOURCES, power: 3 },
    };

    const result = resolveCycle(nearlyOut, "ration");
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.state.status).toBe("failed");
    expect(result.state.failureReasons).toHaveLength(1);
    expect(result.state.failureReasons[0]).toMatch(/power reserve reached zero/i);
    expect(result.state.cycle).toBe(1);
    expect(result.report.status).toBe("failed");
    expect(evaluateMission(result.state).headline).toBe("Mission failed");
  });

  it("survives with warnings when reserves stay above zero but miss a target", () => {
    const state = playSequence(["shelter", "shelter", "shelter", "shelter", "ration"]);

    expect(state.status).toBe("warnings");
    expect(state.resources.power).toBe(6);
    expect(state.resources.crew).toBeGreaterThan(0);

    const result = evaluateMission(state);
    expect(result.headline).toBe("Mission survived with warnings");
    expect(result.checks.some((check) => !check.met)).toBe(true);
  });

  it("fails a strategy that spends power faster than the array replaces it", () => {
    const state = playSequence([
      "greenhouse",
      "greenhouse",
      "greenhouse",
      "greenhouse",
      "greenhouse",
    ]);

    expect(state.status).toBe("failed");
    expect(state.failureReasons[0]).toMatch(/power reserve reached zero/i);
    expect(state.history).toHaveLength(5);
  });

  it("refuses to resolve another cycle once the mission has ended", () => {
    const state = playSequence(["solar", "shelter", "waterRecovery", "oxygenGenerator", "greenhouse"]);
    const attempt = resolveCycle(state, "ration");
    expect(attempt.ok).toBe(false);
  });

  it("gives every action a documented trade off sentence", () => {
    for (const action of ACTIONS) {
      expect(action.tradeOff.length).toBeGreaterThan(40);
      expect(action.costText.length).toBeGreaterThan(0);
      expect(action.benefitText.length).toBeGreaterThan(0);
    }
  });

  it("finds the costliest decision for the debrief", () => {
    const state = playSequence(["solar", "shelter", "waterRecovery", "oxygenGenerator", "greenhouse"]);
    const key = findKeyTradeOff(state.history);
    expect(key?.actionLabel).toBe("Run greenhouse cycle");
    expect(key?.cycle).toBe(5);
    expect(key?.cost).toBe(18);
  });
});

describe("helpers", () => {
  it("diffs resource snapshots", () => {
    const before = { ...INITIAL_RESOURCES };
    const after = { ...INITIAL_RESOURCES, power: INITIAL_RESOURCES.power - 8, shielding: 52 };
    const delta = diffResources(before, after);

    expect(delta.power).toBe(-8);
    expect(delta.shielding).toBe(20);
    expect(delta.water).toBeUndefined();
  });

  it("warns about low and critical reserves with units", () => {
    const warnings = getResourceWarnings({ ...INITIAL_RESOURCES, power: 10, food: 30 });
    const text = warnings.join(" ");

    expect(text).toContain("Power reserve is critical at 10 PU");
    expect(text).toContain("Food reserve is running low at 30 FU");
  });

  it("does not warn about healthy reserves", () => {
    expect(getResourceWarnings({ ...INITIAL_RESOURCES, shielding: 60 })).toEqual([]);
  });
});
