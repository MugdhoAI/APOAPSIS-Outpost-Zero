import { ACTIONS_BY_ID } from "../game/content";
import { MAX_CYCLES, RESOURCE_ORDER } from "../game/constants";
import type { ActionId, DecisionRecord, GameState, Resources } from "../game/types";

const SAVE_KEY = "outpost-zero:save:v1";
const SAVE_VERSION = 1;

type SavedPayload = {
  version: number;
  state: GameState;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isUnitValue(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100;
}

function parseResources(value: unknown): Resources | null {
  if (!isRecord(value)) return null;
  const parsed = {} as Resources;
  for (const key of RESOURCE_ORDER) {
    const entry = value[key];
    if (!isUnitValue(entry)) return null;
    parsed[key] = entry;
  }
  return parsed;
}

function parseRecord(value: unknown): DecisionRecord | null {
  if (!isRecord(value)) return null;

  const before = parseResources(value.before);
  const after = parseResources(value.after);
  const cycle = value.cycle;
  const actionId = value.actionId;
  const actionLabel = value.actionLabel;

  if (!before || !after) return null;
  if (typeof cycle !== "number" || !Number.isInteger(cycle) || cycle < 1 || cycle > MAX_CYCLES) {
    return null;
  }
  if (typeof actionId !== "string" || !(actionId in ACTIONS_BY_ID)) return null;

  return {
    cycle,
    actionId: actionId as ActionId,
    actionLabel: typeof actionLabel === "string" ? actionLabel : "Recorded action",
    before,
    after,
    eventTitle: typeof value.eventTitle === "string" ? value.eventTitle : null,
    eventOutcome: typeof value.eventOutcome === "string" ? value.eventOutcome : null,
    warnings: Array.isArray(value.warnings)
      ? value.warnings.filter((warning): warning is string => typeof warning === "string")
      : [],
  };
}

function parseHistory(value: unknown): DecisionRecord[] | null {
  if (!Array.isArray(value) || value.length > MAX_CYCLES - 1) return null;
  const records: DecisionRecord[] = [];
  for (const entry of value) {
    const record = parseRecord(entry);
    if (!record) return null;
    records.push(record);
  }
  return records;
}

/**
 * Validate a stored mission. Only an unfinished mission is restored: the
 * debrief is intentionally not persisted, so a refresh never shows a stale
 * result. Returns null for anything unexpected and the caller starts fresh.
 */
export function parseSavedMission(raw: string | null): GameState | null {
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(parsed) || parsed.version !== SAVE_VERSION) return null;
  const state = parsed.state;
  if (!isRecord(state)) return null;

  const resources = parseResources(state.resources);
  const history = parseHistory(state.history);
  const cycle = state.cycle;

  if (!resources || !history) return null;
  if (typeof cycle !== "number" || !Number.isInteger(cycle) || cycle < 1 || cycle > MAX_CYCLES) {
    return null;
  }
  if (state.maxCycles !== MAX_CYCLES) return null;
  if (state.status !== "active") return null;
  if (typeof state.solarServiced !== "boolean") return null;
  // An active mission has exactly one record per completed cycle.
  if (history.length !== cycle - 1) return null;

  return {
    cycle,
    maxCycles: MAX_CYCLES,
    resources,
    solarServiced: state.solarServiced,
    history,
    status: "active",
    failureReasons: [],
  };
}

export function loadMission(): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    return parseSavedMission(window.localStorage.getItem(SAVE_KEY));
  } catch {
    return null;
  }
}

export function saveMission(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    const payload: SavedPayload = { version: SAVE_VERSION, state };
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch {
    // Storage may be blocked or full. The game still runs without saving.
  }
}

export function clearSavedMission(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // Ignore: clearing is best effort.
  }
}
