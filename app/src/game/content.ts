import type { ActionId, GameAction, GameEvent, ScienceNote } from "./types";

export const ACTIONS: GameAction[] = [
  {
    id: "solar",
    label: "Service solar arrays",
    summary: "Clean the array, reset the trackers, and replace two worn drive motors.",
    costText: "8 PU now",
    benefitText: "+5 PU generation in every later cycle",
    effects: { power: -8 },
    once: true,
    tradeOff:
      "You spent stored power to raise future generation. That only pays back if there are enough cycles left for the extra output to add up.",
    science: {
      label: "Data-derived context",
      text:
        "LRO illumination maps show that polar sites differ enormously: some sit in permanent shadow while a few stay in sunlight most of the time. Site selection and array upkeep both shape how much power a base can count on.",
      sourceId: "lola-illumination",
    },
  },
  {
    id: "shelter",
    label: "Reinforce regolith shelter",
    summary: "Sinter local soil over the crew module to thicken the radiation shield.",
    costText: "12 PU",
    benefitText: "+20 RPI",
    effects: { power: -12, shielding: 20 },
    once: false,
    tradeOff:
      "Shielding is the only reserve that softens the particle event, and the power spent here is gone from this cycle's balance.",
    science: {
      label: "Game assumption",
      text:
        "Radiation risk depends on the environment, how long the crew stays exposed, and how much material sits between them and it. The game turns that into a single protection index with a threshold at 50 before a solar particle event.",
      sourceId: "srag",
    },
  },
  {
    id: "waterRecovery",
    label: "Service water recovery",
    summary: "Swap filter beds and seals in the water processor to cut losses.",
    costText: "10 PU",
    benefitText: "+14 WU",
    effects: { power: -10, water: 14 },
    once: false,
    tradeOff:
      "Water recovery buys back reserve water, but the processor runs on the same power the habitat needs for heating and life support.",
    science: {
      label: "NASA fact",
      text:
        "Deep space habitats link air revitalisation, water recovery, and waste processing, so a repair in one loop changes what the others can do.",
      sourceId: "deep-space-habitation",
    },
  },
  {
    id: "oxygenGenerator",
    label: "Service oxygen generator",
    summary: "Overhaul the electrolysis stack that splits water into breathable oxygen.",
    costText: "8 PU and 4 WU",
    benefitText: "+14 OU",
    effects: { power: -8, water: -4, oxygen: 14 },
    once: false,
    tradeOff:
      "The oxygen generator needs power and water, so improving oxygen puts pressure on two other systems at the same time.",
    science: {
      label: "Game assumption",
      text:
        "Oxygen production from water is a real engineering approach, but the exchange rate in this game is tuned for play, not copied from a life support specification.",
      sourceId: "deep-space-habitation",
    },
  },
  {
    id: "greenhouse",
    label: "Run greenhouse cycle",
    summary: "Start a grow cycle under lamps in the pressurised greenhouse module.",
    costText: "11 PU and 7 WU",
    benefitText: "+18 FU",
    effects: { power: -11, water: -7, food: 18 },
    once: false,
    tradeOff:
      "This is the most expensive action on the board. A grow cycle takes power and water that the crew also needs to survive.",
    science: {
      label: "NASA fact",
      text:
        "NASA studies controlled environment crop production in space because fresh food helps, and because plants can take part in air and water recycling. A real crop cycle takes far longer than one turn here.",
      sourceId: "space-crops",
    },
  },
  {
    id: "ration",
    label: "Crew ration protocol",
    summary: "Cut portions for one cycle to stretch the food store further.",
    costText: "4 CCI",
    benefitText: "Food use drops from 5 FU to 2 FU this cycle",
    effects: { crew: -4 },
    once: false,
    rationing: true,
    tradeOff:
      "Rationing protects the food store without spending power, but the crew pays in condition, and a low condition is slow to recover.",
    science: {
      label: "Game assumption",
      text:
        "Short rationing is modelled as a one cycle saving with a crew condition cost. Real nutrition planning is far more detailed than this single rule.",
    },
  },
];

export const ACTIONS_BY_ID: Record<ActionId, GameAction> = ACTIONS.reduce(
  (map, action) => {
    map[action.id] = action;
    return map;
  },
  {} as Record<ActionId, GameAction>,
);

export const EVENTS: GameEvent[] = [
  {
    id: "particle-event",
    cycle: 2,
    title: "Solar particle event alert",
    warning:
      "A solar particle event is expected during this cycle. Crew protection is checked after upkeep, so raising the protection index to 50 or higher now keeps the crew loss small.",
    kind: "particle",
  },
  {
    id: "dust-on-array",
    cycle: 4,
    title: "Lunar dust on the array",
    warning:
      "Dust is settling on the solar array and output will drop this cycle. A recently serviced array keeps more of its output.",
    kind: "dust",
  },
];

export function getEventForCycle(cycle: number): GameEvent | null {
  return EVENTS.find((event) => event.cycle === cycle) ?? null;
}

export type CycleFocus = {
  cycle: number;
  heading: string;
  note: ScienceNote;
};

/**
 * The "Why this matters" note shown beside the decisions. It follows the
 * system the current cycle puts under the most pressure.
 */
export const CYCLE_FOCUS: CycleFocus[] = [
  {
    cycle: 1,
    heading: "Sunlight is a site problem first",
    note: {
      label: "Data-derived context",
      text:
        "NASA's LOLA illumination maps average sunlight across an 18.6 year lunar cycle. Terrain decides how much of it a site gets, so the array here is a planned reserve rather than unlimited power.",
      sourceId: "lola-illumination",
    },
  },
  {
    cycle: 2,
    heading: "Protection has to arrive early",
    note: {
      label: "NASA fact",
      text:
        "Space radiation exposure depends on the environment, the time spent in it, and the material around the crew. The event here resolves after your action, so a shelter reinforced this cycle still counts; 50 RPI is a teaching threshold, not a safety limit.",
      sourceId: "srag",
    },
  },
  {
    cycle: 3,
    heading: "Water is a loop, not a tank",
    note: {
      label: "NASA fact",
      text:
        "Habitats link air revitalisation, water recovery, waste processing, and monitoring. Repairing one loop changes what the others can do, and every loop needs power to keep running.",
      sourceId: "deep-space-habitation",
    },
  },
  {
    cycle: 4,
    heading: "Dust is an engineering problem",
    note: {
      label: "NASA fact",
      text:
        "Lunar dust is abrasive and clings to surfaces. NASA develops dust mitigation alongside surface power systems because dust degrades seals, radiators, and solar arrays over time.",
      sourceId: "lunar-surface-technology",
    },
  },
  {
    cycle: 5,
    heading: "Crops are part of life support",
    note: {
      label: "NASA fact",
      text:
        "NASA studies controlled environment plant growth because crops supply fresh food and can contribute to air and water recycling. That is why a grow cycle draws on power and water instead of producing food for free.",
      sourceId: "space-crops",
    },
  },
];

export function getCycleFocus(cycle: number): CycleFocus {
  return CYCLE_FOCUS.find((focus) => focus.cycle === cycle) ?? CYCLE_FOCUS[0]!;
}

export const LEARNING_TAKEAWAYS: ScienceNote[] = [
  {
    label: "Data-derived context",
    text:
      "At the lunar poles, sunlight depends on terrain. NASA's LOLA illumination maps show sites in permanent shadow a short distance from ridges that stay lit almost continuously.",
    sourceId: "lola-illumination",
  },
  {
    label: "NASA fact",
    text:
      "Radiation protection has to be planned before the crew needs it. NASA's radiation guidance links exposure to the environment, duration, and shielding, which is why reinforcing the shelter early changes the Cycle 2 outcome.",
    sourceId: "srag",
  },
];
