import type { ResourceKey, Resources, ResourceStatus } from "./types";

// Every number in this file is a gameplay tuning value. None of them are
// measured lunar engineering figures, radiation doses, or NASA parameters.

export const MAX_CYCLES = 5;

export const INITIAL_RESOURCES: Resources = {
  power: 74,
  water: 62,
  oxygen: 64,
  food: 58,
  shielding: 32,
  crew: 100,
};

export const MIN_VALUE = 0;
export const MAX_VALUE = 100;

/** Solar output at the start of the mission, in power units. */
export const SOLAR_GENERATION = 10;
/** Extra generation once the array has been serviced. */
export const SOLAR_UPGRADE_BONUS = 5;
/** Base power demand of the outpost, in power units. */
export const BASE_POWER_DEMAND = 13;

export const BASE_WATER_USE = 5;
export const BASE_OXYGEN_USE = 5;
export const BASE_FOOD_USE = 5;
export const RATION_FOOD_USE = 2;

/** Shielding index needed to keep the Cycle 2 particle event mild. */
export const PARTICLE_SHIELD_THRESHOLD = 50;
export const PARTICLE_SHIELDED_CREW_LOSS = 5;
export const PARTICLE_UNSHIELDED_CREW_LOSS = 25;

/** Generation lost to dust in Cycle 4, depending on array servicing. */
export const DUST_PENALTY_SERVICED = 2;
export const DUST_PENALTY_UNSERVICED = 5;

/** Mission secured thresholds. Design targets, not safety limits. */
export const SECURED_THRESHOLDS = {
  reserve: 10,
  shielding: 45,
  crew: 60,
} as const;

/**
 * Status cutoffs per resource. Shielding and crew use their own ranges because
 * they are indices rather than reserves.
 */
export const STATUS_CUTOFFS: Record<ResourceKey, { critical: number; low: number }> = {
  power: { critical: 15, low: 35 },
  water: { critical: 15, low: 35 },
  oxygen: { critical: 15, low: 35 },
  food: { critical: 15, low: 35 },
  shielding: { critical: 25, low: 45 },
  crew: { critical: 40, low: 60 },
};

export const RESOURCE_META: Record<
  ResourceKey,
  { name: string; shortName: string; unit: string; meaning: string }
> = {
  power: {
    name: "Power reserve",
    shortName: "Power",
    unit: "PU",
    meaning: "Stored energy for heating, life support, and every repair.",
  },
  water: {
    name: "Water reserve",
    shortName: "Water",
    unit: "WU",
    meaning: "Recoverable water for drinking, cooling, and oxygen production.",
  },
  oxygen: {
    name: "Oxygen reserve",
    shortName: "Oxygen",
    unit: "OU",
    meaning: "Breathable oxygen held in tanks and the habitat loop.",
  },
  food: {
    name: "Food reserve",
    shortName: "Food",
    unit: "FU",
    meaning: "Stored food plus what the greenhouse can add.",
  },
  shielding: {
    name: "Radiation protection",
    shortName: "Protection",
    unit: "RPI",
    meaning: "Relative protection index of the regolith shelter. Not a dose.",
  },
  crew: {
    name: "Crew condition",
    shortName: "Crew",
    unit: "CCI",
    meaning: "A fictional condition indicator for the four crew members.",
  },
};

/** Order used everywhere in the interface. */
export const RESOURCE_ORDER: ResourceKey[] = [
  "power",
  "water",
  "oxygen",
  "food",
  "shielding",
  "crew",
];

/** The five systems shown as resource cards; crew condition sits in the header. */
export const CARD_ORDER: ResourceKey[] = ["power", "water", "oxygen", "food", "shielding"];

export function getResourceStatus(key: ResourceKey, value: number): ResourceStatus {
  const cutoffs = STATUS_CUTOFFS[key];
  if (value <= cutoffs.critical) return "critical";
  if (value <= cutoffs.low) return "low";
  return "stable";
}

export function clampValue(value: number): number {
  if (!Number.isFinite(value)) return MIN_VALUE;
  return Math.min(MAX_VALUE, Math.max(MIN_VALUE, Math.round(value)));
}
