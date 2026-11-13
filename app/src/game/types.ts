// Domain types for Outpost Zero. Kept free of React and browser APIs so the
// simulation can be tested and reasoned about on its own.

export type ResourceKey = "power" | "water" | "oxygen" | "food" | "shielding" | "crew";

export type Resources = Record<ResourceKey, number>;

export type ResourceStatus = "stable" | "low" | "critical";

export type MissionStatus = "active" | "secured" | "warnings" | "failed";

export type ActionId =
  | "solar"
  | "shelter"
  | "waterRecovery"
  | "oxygenGenerator"
  | "greenhouse"
  | "ration";

/** A short science label that tells students where a statement comes from. */
export type ScienceLabel = "NASA fact" | "Data-derived context" | "Game assumption";

export type ScienceNote = {
  label: ScienceLabel;
  text: string;
  sourceId?: string;
};

export type GameAction = {
  id: ActionId;
  label: string;
  summary: string;
  costText: string;
  benefitText: string;
  /** Immediate change applied before cycle upkeep. */
  effects: Partial<Resources>;
  /** Actions that may only be taken once per mission. */
  once: boolean;
  /** True when the action changes this cycle's food consumption. */
  rationing?: boolean;
  /** One or two sentences explaining the trade off after resolution. */
  tradeOff: string;
  science: ScienceNote;
};

export type GameEvent = {
  id: string;
  cycle: number;
  title: string;
  warning: string;
  /** Only Cycle 4 changes generation, and that is handled in the power step. */
  kind: "particle" | "dust";
};

export type SimulationStepKind = "action" | "power" | "consumption" | "event";

export type SimulationStep = {
  kind: SimulationStepKind;
  label: string;
  detail: string;
  delta: Partial<Resources>;
};

export type DecisionRecord = {
  cycle: number;
  actionId: ActionId;
  actionLabel: string;
  before: Resources;
  after: Resources;
  eventTitle: string | null;
  eventOutcome: string | null;
  warnings: string[];
};

export type GameState = {
  cycle: number;
  maxCycles: number;
  resources: Resources;
  solarServiced: boolean;
  history: DecisionRecord[];
  status: MissionStatus;
  failureReasons: string[];
};

export type CycleReport = {
  cycle: number;
  action: GameAction;
  event: GameEvent | null;
  before: Resources;
  after: Resources;
  steps: SimulationStep[];
  warnings: string[];
  tradeOff: string;
  status: MissionStatus;
  failureReasons: string[];
};

export type ResolveResult =
  | { ok: true; state: GameState; report: CycleReport }
  | { ok: false; reason: string };

export type ActionAvailability = {
  action: GameAction;
  available: boolean;
  reason?: string;
};

export type ObjectiveCheck = {
  label: string;
  met: boolean;
};

export type MissionResult = {
  status: MissionStatus;
  headline: string;
  summary: string;
  score: number;
  checks: ObjectiveCheck[];
  weakest: { key: ResourceKey; value: number } | null;
};
