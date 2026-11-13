# Codex CLI — First Launch Prompt

Open Codex CLI with the workspace set to:

```powershell
cd C:\NasaProject\APOAPSIS_project_control_bundle
codex
```

Paste the following as the first instruction. This folder currently contains the project control documents, not a completed app. Codex must inspect it and scaffold the application without overwriting the documents.

---

## First instruction to Codex

You are the primary engineering agent for **Outpost Zero**, APOAPSIS's entry for the NASA Space Apps Challenge 2026 challenge **Build a Junior Astronaut Mission Trainer**.

This is an active hackathon build. Implement the application now. Do not spend the first session rewriting plans or creating another strategy document.

### 1. Read the project controls efficiently

`AGENTS.md` is the repository instruction file and should be followed throughout the session. Then:

- Read `GAMEPLAY_SPEC.md` and `NASA_DATA_PLAN.md` fully because they define the exact gameplay and NASA data integration.
- Read the relevant sections of `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, and `SECURITY.md` for the task being implemented.
- Read only the relevant sections of `engineering_skill.md` and `apoapsis_nasa_space_apps_2026_execution_plan.md`; do not dump both long files into context in full unless necessary.
- Read `CHECKPOINT.md`, the latest entries of `WORK_LOG.md`, and relevant entries in `DECISIONS.md` to recover state.
- Read `TEAM_TASK_BOARD.md` to understand ownership.
- Do not read `APOAPSIS_30_second_video_plan.md`, `AI_TOOLS_LOG.md`, or `SUBMISSION_DRAFT.md` in full until the app is close to release. Their relevant checklists can be opened when that stage begins.

### 2. Inspect before writing

- Confirm the current working directory is `C:\NasaProject\APOAPSIS_project_control_bundle` or the actual folder opened in the terminal.
- List files. Inspect Git status and any existing source files.
- The control bundle does not contain an application implementation. Do not assume a `package.json` exists. The intended code location is `app/` under this repository root; keep all control documents at the root.
- If there is no existing app, scaffold a Vite React TypeScript app inside an `app/` directory. Keep project control documents at the repository root. Do not put the application inside another nested app folder.
- Initialize Git at the repository root only if no `.git` directory exists. Check `git status` before every commit.
- Do not create or publish a GitHub remote without the team lead's authorization. If a remote is already configured, inspect it before pushing.
- Report the actual tools and versions available, then continue directly to the first implementation milestone.

### 3. Product to implement

Build the specific MVP in `GAMEPLAY_SPEC.md`. The first milestone is a complete playable vertical slice:

1. Mission start and briefing.
2. Operations dashboard with power, water, oxygen, food, radiation protection, and crew condition.
3. At least one decision with visible costs.
4. Deterministic game engine applies its effects and the cycle upkeep.
5. A consequence panel explains what changed and why.
6. The player can continue to the next cycle.
7. The game can reach a mission result, display a debrief, and restart.

Then implement the complete five-cycle game and deterministic events defined in `GAMEPLAY_SPEC.md`.

### 4. Technology and structure

- Use React, TypeScript, and Vite unless an existing valid project already exists.
- Keep a pure TypeScript game engine separate from React components.
- Keep all game constants and action definitions in a single domain layer.
- Use the design tokens and interaction rules in `DESIGN_SYSTEM.md`.
- Keep state in memory for MVP. Add validated, versioned localStorage only if time permits after the complete game loop works.
- No backend, database, user accounts, multiplayer, chatbot, or live API is needed for the MVP.
- Do not introduce large dependencies or a complex 3D engine.

### 5. Science integration is mandatory

Use `NASA_DATA_PLAN.md` as the source map. Integrate the NASA LOLA south polar illumination product into the project in a meaningful, source-linked way. Prefer an appropriately licensed NASA map preview or lightweight data extract. If a large raster cannot be processed quickly, use the official map/preview as contextual evidence and explain its long-term average nature. Do not invent pixel values or claim that the map is a live solar forecast.

Add student-friendly science notes for radiation, life support, power, and space crops. The app must clearly distinguish:

- NASA-measured or published facts.
- Any calculations made from a NASA dataset.
- Simplified game assumptions.

### 6. Work in time-boxed milestones

**Milestone 1 — Running app and vertical slice**

- Scaffold only what's missing.
- Make the app run locally.
- Build the first complete interaction from choice to consequence.
- Verify with a production build and at least one engine test.

**Milestone 2 — Complete five-cycle game**

- Implement all actions, consumption, events, thresholds, mission success/failure, debrief, and restart.
- Test the balanced example path in `GAMEPLAY_SPEC.md`.
- Test at least one failing strategy.

**Milestone 3 — Science and design**

- Integrate NASA source records and the LOLA context asset.
- Finish responsive layout, accessibility, and student friendly explanations.
- Keep the app fast and readable.

**Milestone 4 — Release**

- Run the actual checks defined in `package.json`.
- Build production output.
- Deploy using an accessible free static host after the team lead authorizes the target.
- Open the production URL in a private browser window and a phone-sized viewport.

**Milestone 5 — Video and submission**

- Follow `APOAPSIS_30_second_video_plan.md` after the final playable demo is stable.
- Record actual app footage, not a mockup of unimplemented features.
- Export a video of 30 seconds or less if that is what the current NASA and Dhaka instructions require. The current Space Apps Navigator guidance says the project demo may be a video of 30 seconds or less or up to seven slides; the Dhaka virtual schedule specifically calls for the 30-second video. Follow the stricter applicable local requirement.
- Complete `AI_TOOLS_LOG.md` and `SUBMISSION_DRAFT.md` with verified facts and links.

### 7. Shared work between two Codex accounts

Codex A is the integration agent and owns `main`. Codex B is a secondary agent on a separate branch. Do not allow both agents to edit the same files simultaneously.

Before parallel work, define and commit shared TypeScript interfaces. Assign Codex B isolated UI components or a separate data/source panel. Require Codex B to commit its branch and provide a summary, commit hash, and checks. Codex A reviews and merges.

### 8. Mandatory checkpoint before usage limits

When usage is low, context is getting large, you are about to stop, or a teammate will take over:

1. Stop starting new features.
2. Save all working files.
3. Run the fastest relevant check and record the result honestly.
4. Update `CHECKPOINT.md` with current milestone, branch, last commit, changed files, app run command, environment versions, known issues, and exact next task.
5. Append to `WORK_LOG.md`.
6. Update `DECISIONS.md` if any architecture, game balance, or scope decision changed.
7. Commit stable work. Push only if an authorized remote is configured and the push succeeds.
8. If no remote exists, create a Git bundle or portable archive that excludes `node_modules`, build output, `.env`, credentials, and other secrets. Verify the archive can be listed.
9. Output a concise handoff prompt for the next Codex session and the teammate's laptop.

Never rely on conversation history as the only record of work. Never claim a push, build, test, deployment, or upload succeeded unless you have verified it.

### 9. Coding style and content

- Humanize all writing. Avoid generic AI phrasing and marketing filler.
- Do not add unnecessary hyphens between words. Preserve correct technical terms, official names, URLs, and code syntax.
- Do not add features that are not required or clearly beneficial.
- Use small, readable functions, explicit types, and descriptive names.
- Avoid unnecessary abstraction and speculative optimization.
- Keep interface text concise and natural.
- Do not make a NASA endorsement claim or use NASA insignia as a team logo.

### 10. Begin now

Your first response must contain:
1. What you found in the directory.
2. Whether Git and Node are available and their versions.
3. Whether an existing application is present.
4. The exact first milestone you will implement.

Then begin the work. Do not stop after a plan. Do not ask the user to confirm routine engineering decisions that are already specified in the project files. Ask only if a credential, authorization, or important unresolved real-world requirement blocks progress.
