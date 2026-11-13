import { describe, expect, it } from "vitest";
import { createInitialState, resolveCycle } from "../game/engine";
import { parseSavedMission } from "./persist";

function savedPayload(state: unknown): string {
  return JSON.stringify({ version: 1, state });
}

describe("parseSavedMission", () => {
  it("returns null when there is nothing stored", () => {
    expect(parseSavedMission(null)).toBeNull();
    expect(parseSavedMission("")).toBeNull();
  });

  it("returns null for malformed JSON", () => {
    expect(parseSavedMission("{not json")).toBeNull();
  });

  it("rejects an unknown save version", () => {
    const state = createInitialState();
    expect(parseSavedMission(JSON.stringify({ version: 99, state }))).toBeNull();
  });

  it("restores an unfinished mission", () => {
    const start = createInitialState();
    const first = resolveCycle(start, "solar");
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    const restored = parseSavedMission(savedPayload(first.state));

    expect(restored).not.toBeNull();
    expect(restored?.cycle).toBe(2);
    expect(restored?.resources).toEqual(first.state.resources);
    expect(restored?.solarServiced).toBe(true);
    expect(restored?.history).toHaveLength(1);
    expect(restored?.history[0]?.actionId).toBe("solar");
  });

  it("rejects a resource value outside the 0 to 100 range", () => {
    const state = createInitialState();
    const broken = { ...state, resources: { ...state.resources, power: 320 } };
    expect(parseSavedMission(savedPayload(broken))).toBeNull();
  });

  it("rejects a history that does not match the cycle count", () => {
    const start = createInitialState();
    const first = resolveCycle(start, "shelter");
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    const tampered = { ...first.state, cycle: 4 };
    expect(parseSavedMission(savedPayload(tampered))).toBeNull();
  });

  it("rejects a finished mission instead of restoring a stale debrief", () => {
    const start = createInitialState();
    const failed = { ...start, status: "failed", failureReasons: ["Power reserve reached zero."] };
    expect(parseSavedMission(savedPayload(failed))).toBeNull();
  });

  it("rejects unexpected extra data types", () => {
    expect(parseSavedMission(savedPayload({ ...createInitialState(), solarServiced: "yes" }))).toBeNull();
    expect(parseSavedMission("[1,2,3]")).toBeNull();
    expect(parseSavedMission(savedPayload("not an object"))).toBeNull();
  });
});
