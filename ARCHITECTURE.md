# APOAPSIS Architecture

**Project:** Outpost Zero  
**Team:** APOAPSIS  
**Challenge:** Build a Junior Astronaut Mission Trainer  
**Status:** Proposed implementation architecture for the active Dhaka virtual hackathon  
**Last reviewed:** 13 November 2026, Asia/Dhaka

## 1. Architectural goal

Build a small, reliable browser game that teaches students how decisions in a lunar outpost affect connected systems. A player must be able to start a mission, make decisions, see measurable consequences, understand why they happened, and reach a clear mission result.

The architecture should help the team finish and explain the project during the hackathon. It should not imitate a production aerospace control system.

## 2. Chosen architecture

Use a **static client-side web application** unless the team discovers a verified requirement that cannot be met this way. The exact first-release gameplay and turn rules are in `GAMEPLAY_SPEC.md`; data integration is specified in `NASA_DATA_PLAN.md`.

- **UI:** React + TypeScript + Vite.
- **Game rules:** Pure TypeScript functions, separate from React components.
- **Scenario content:** Local TypeScript or JSON data, with source references stored alongside claims.
- **State:** In-memory application state. Add versioned `localStorage` persistence only if it is useful and can be completed safely.
- **Backend:** None for the MVP.
- **Database:** None for the MVP.
- **Hosting:** Static hosting such as GitHub Pages or Netlify.
- **Source control:** Git and a shared GitHub repository.

Do not add authentication, user accounts, a server, remote database, multiplayer, live APIs, or API keys just to call the project full stack. Those features are not needed to demonstrate the challenge's core learning loop.

## 3. System overview

```text
Browser
  |
  +-- React interface
  |     +-- Mission briefing
  |     +-- Resource dashboard
  |     +-- Decision cards
  |     +-- Event / consequence panel
  |     +-- Mission debrief
  |
  +-- Game application state
  |     +-- Current cycle
  |     +-- Resource values
  |     +-- Shielding / risk state
  |     +-- Mission status
  |     +-- Decision history
  |
  +-- Pure TypeScript game engine
  |     +-- Apply player action
  |     +-- Apply cycle consumption
  |     +-- Resolve incident
  |     +-- Evaluate warnings and end conditions
  |     +-- Build debrief summary
  |
  +-- Local scenario and science notes
        +-- Decisions and events
        +-- Educational explanations
        +-- Source metadata
```

The browser renders the interface. The game engine computes the result. The interface must never contain the authoritative resource calculations.

## 4. Core gameplay model

### 4.1 Scenario

Build one lunar outpost scenario first. Do not build separate Moon and Mars modes during the MVP. A five-cycle mission is a proposed target; shorten it if the time available requires it.

### 4.2 Systems to represent

The game must visibly teach the systems named in the challenge:

- **Life support:** oxygen and water availability or a clearly explained combined life-support indicator.
- **Power:** energy available to run essential systems.
- **Food production and supply:** food reserves and the cost or benefit of growing food.
- **Radiation protection:** a shielding or protection indicator that affects exposure risk; it must not be presented as a real radiation dose calculator.

Use consistent labels and units. Values created for game balance must be called **game units**, **game days**, or a clearly stated **protection index**. Never label invented values as real NASA engineering measurements.

### 4.3 Player loop

1. Read the mission briefing and objective.
2. Review the current outpost condition.
3. Choose one of the available decisions.
4. Apply the decision and the cycle's resource effects.
5. Resolve an optional scripted event.
6. Show before-and-after values and a short explanation.
7. Continue until the mission reaches its end condition.
8. Show a debrief with the choices, consequences, and learning points.

The first playable version should use deterministic events. Randomness is optional and must be seeded or otherwise controllable in tests if introduced.

### 4.4 Suggested domain types

Adapt names to the codebase, but keep equivalent boundaries:

```ts
type MissionStatus = "briefing" | "active" | "success" | "failure";

type ResourceState = {
  power: number;
  water: number;
  oxygen: number;
  food: number;
  shieldingIndex: number;
};

type GameState = {
  cycle: number;
  maxCycles: number;
  status: MissionStatus;
  resources: ResourceState;
  history: DecisionRecord[];
};

type GameAction = {
  id: string;
  label: string;
  effects: Partial<ResourceState>;
  explanation: string;
  sourceIds: string[];
};

type SimulationResult = {
  nextState: GameState;
  changes: Partial<Record<keyof ResourceState, number>>;
  explanation: string;
  warnings: string[];
};
```

These are illustrative contracts, not a requirement to copy them verbatim. The team may refine the types after inspecting the actual project.

## 5. Game engine boundaries

Keep the engine independent of React and browser APIs. Prefer functions with explicit inputs and outputs, such as:

- `createInitialState(scenario)`
- `applyAction(state, action)`
- `advanceCycle(state, scenario)`
- `resolveEvent(state, event)`
- `getResourceWarnings(state)`
- `evaluateMission(state, scenario)`
- `buildDebrief(history)`

Rules:

- Each function has one responsibility.
- Do not mutate the input state.
- Define minimum and maximum values deliberately.
- Apply costs and benefits in a documented order.
- Define whether the turn ends before or after cycle consumption; use the same order everywhere.
- Define simultaneous failure conditions and their precedence.
- Keep all gameplay constants in one named configuration area.
- Never hide key rules in component event handlers.

## 6. Suggested repository layout

Adapt this to an existing repository. Do not move or rename working files just to match the diagram.

```text
.  # repository root: C:\NasaProject\APOAPSIS_project_control_bundle
├── .git/
├── AGENTS.md
├── ARCHITECTURE.md
├── DESIGN_SYSTEM.md
├── SECURITY.md
├── GAMEPLAY_SPEC.md
├── NASA_DATA_PLAN.md
├── TEAM_TASK_BOARD.md
├── AI_TOOLS_LOG.md
├── SUBMISSION_DRAFT.md
├── CODEX_LAUNCH_PROMPT.md
├── engineering_skill.md
├── apoapsis_nasa_space_apps_2026_execution_plan.md
├── APOAPSIS_30_second_video_plan.md
├── CHECKPOINT.md
├── WORK_LOG.md
├── DECISIONS.md
└── app/
    ├── package.json
    ├── package-lock.json
    ├── public/
    │   └── assets/
    └── src/
        ├── app/
        ├── components/
        ├── game/
        │   ├── types.ts
        │   ├── engine.ts
        │   ├── rules.ts
        │   └── scenarios/
        ├── data/
        │   └── sources.ts
        ├── storage/
        └── styles/
```

For a short hackathon project, combine folders where that reduces friction. Do not create empty layers or abstraction for appearance alone.

## 7. State persistence

Persistence is optional. The MVP can restart a mission from the beginning and still be complete.

If persistence is implemented:

- Use a single versioned key such as `outpost-zero:save:v1`.
- Validate parsed data before using it.
- Handle missing, malformed, or outdated data by starting a new mission with a clear message.
- Never store personal information, authentication secrets, or sensitive data.
- Provide a visible reset / new mission control.
- Keep the game usable if browser storage is unavailable.

## 8. Science and source data flow

Keep a local source registry. Each science note should identify:

- The claim or concept.
- Source title and organization.
- Direct URL.
- Access date if useful.
- Which mechanic or explanation uses it.
- The simplification made for gameplay.

Use the challenge's linked resources first. If a source only provides a broad concept, do not turn it into a precise numeric model. The game should explain that its resource points and outcomes are simplified teaching abstractions, not predictions for a real lunar base.

## 9. Quality gates

Before calling a milestone complete:

1. TypeScript check passes.
2. Relevant game-engine tests pass.
3. Production build succeeds.
4. Main player loop works from a clean browser session.
5. Every decision has a visible and understandable effect.
6. End states and restart work.
7. Source notes are accessible and claims are accurate.
8. The layout works at desktop and mobile widths.
9. Keyboard interaction and visible focus work for the main controls.
10. No secrets, private data, or broken external links are present.

Use the actual scripts in `package.json`. Do not invent test commands or report checks that were not run.

## 10. Deployment architecture

Build a static production bundle from `app/` and host the generated `app/dist/` files over HTTPS. Configure Vite's `base` setting or the hosting base directory correctly for the chosen host. Verify the deployed URL in a private browser window and on a phone-sized viewport.

The judges must not need an account, local server, API key, invitation, or access request to use the demo.

## 11. Architecture change rule

Any proposal to add a backend, database, external API, account system, analytics, or a new major library must state:

1. The exact challenge requirement or user problem it solves.
2. Why the current static architecture cannot solve it.
3. Its implementation and security cost.
4. Its failure mode and fallback.

Do not add it unless the benefit clearly exceeds the risk and time cost.
