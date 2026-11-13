# APOAPSIS Project Instructions for Codex

> **Purpose:** This is the repository-level operating instruction for Codex CLI and any coding agent working on APOAPSIS. Read it before making changes. It is designed to survive usage limits, context resets, and transfer to another teammate's laptop.

## 1. Project identity and goal

- Team: **APOAPSIS**, three virtual participants.
- Event: NASA Space Apps Challenge 2026, Dhaka Local Event. The team's NASA dashboard screenshot shows **Local Event: Dhaka**; the Dhaka Local Event site describes the event as fully online on 13–14 November 2026.
- Selected challenge: **Build a Junior Astronaut Mission Trainer**.
- Working project concept: **Outpost Zero**, a browser based educational game about managing a lunar outpost.
- Main learning goal: help students understand that life support, power, food, water, and radiation protection interact. Improving one system can cost resources or create pressure elsewhere.
- Primary delivery: a working public browser demo, accessible source code, accurate project page, and the required **30 second project video**.
- The four minute “240 Seconds of Glory” presentation is an in person activity. It is not an APOAPSIS deliverable unless the current event organizers explicitly change the requirement for virtual participants.

Do not confuse this project with a generic space themed landing page. The core deliverable is a playable game in which the player makes decisions, sees the consequences, and learns why the trade off occurred.

## 2. Files to read and authority order

At the start of a task, read the relevant parts of these files if present:

1. `AGENTS.md` — repository instructions and task workflow.
2. `ARCHITECTURE.md` — system boundaries, data flow, state model, and deployment architecture.
3. `DESIGN_SYSTEM.md` — visual tokens, components, responsive behavior, and accessibility.
4. `SECURITY.md` — privacy, secrets, browser security, dependencies, and release safeguards.
5. `GAMEPLAY_SPEC.md` — exact resource model, turn sequence, action effects, events, mission outcomes, and acceptance path.
6. `NASA_DATA_PLAN.md` — NASA data assets, science references, integration requirements, and source caveats.
7. `apoapsis_nasa_space_apps_2026_execution_plan.md` — event facts, product scope, schedule, science notes, and submission checklist.
8. `engineering_skill.md` — engineering workflow, scientific integrity, human writing, accessibility, testing, quota management, and handoff.
9. `APOAPSIS_30_second_video_plan.md` — required workflow for the 30-second project video.
10. `CHECKPOINT.md`, `WORK_LOG.md`, `DECISIONS.md`, `TEAM_TASK_BOARD.md`, `AI_TOOLS_LOG.md`, and `SUBMISSION_DRAFT.md` — current project state, work history, decisions, and setup steps.

If files are missing, state what is missing in the final status and continue using the available context. Do not invent a file's contents.

When instructions conflict, follow this order:

1. The latest applicable official NASA Space Apps rules, Terms and Conditions, challenge statement, submission guide, and current event organizer instructions.
2. Decisions made explicitly by the team and recorded in `DECISIONS.md`.
3. This `AGENTS.md` and the current execution plan.
4. `engineering_skill.md`.
5. Agent preferences.

Official links:

- Main event and global submission window: https://www.spaceappschallenge.org/2026/
- Selected challenge: https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/
- Dhaka Local Event and schedule: https://www.spaceappschallenge.org/2026/local-events/dhaka/?tab=schedule
- Dhaka Local Event portal (fully online): https://dhaka.nasaspaceappsbd.com/
- Universal Event: https://www.spaceappschallenge.org/2026/local-events/universal-event/
- Official resources and guides: https://www.spaceappschallenge.org/resources/
- 2026 Terms and Conditions: https://www.spaceappschallenge.org/legal/

The team's NASA dashboard screenshot confirms **Team APOAPSIS**, **Local Event: Dhaka**, and the selected challenge. The Dhaka Local Event site describes the event as fully online on 13–14 November 2026. The team's supplied Dhaka schedule specifies the exact daily activities. The global NASA Project form opens Saturday, 14 November at 9:00 AM and closes Sunday, 15 November at 11:59 PM local time. These global submission times are separate from Dhaka's local judging and video milestones. The Dhaka local event portal appears to have its own team registration form; the NASA dashboard screenshot does not prove that separate local form has been completed. Verify this with the local team portal and lead immediately.

## 3. Mandatory writing and humanization rules

Apply these rules to every deliverable: UI copy, labels, onboarding, source notes, README, project description, code comments, function names where appropriate, prompts, the video script, captions, reports, and teammate handoffs.

- Write like a clear, thoughtful human. Make claims concrete and specific.
- Avoid generic AI language, marketing filler, inflated claims, and repetitive phrases.
- **Do not add unnecessary hyphens between words.** Use a hyphen only when grammar, an official name, a technical term, a URL, or clarity requires it. Do not alter code syntax or official wording to enforce this rule.
- Do not add content, features, dependencies, abstractions, sections, or animations that do not satisfy a real requirement or improve learning, accessibility, reliability, or judging evidence.
- Prefer active voice and short interface copy. Avoid paragraph-length buttons, decorative slogans, and verbose explanations inside the game.
- Do not claim that planned features are implemented, tests passed, links work, the project is NASA endorsed, or the simulation is operational unless that is demonstrably true.
- Label invented game values as **game units** or clearly identified simulation assumptions. Never present them as real NASA engineering measurements.
- If official rules require AI tool or asset disclosure, follow that requirement accurately.
- Do not copy whole third party articles or use unlicensed images, video, music, fonts, or code.

## 4. Event status and implementation boundary

**Status at last review: Friday, 13 November 2026, approximately 9:26 PM Asia/Dhaka. The Dhaka Local Event has started. Challenge implementation is now permitted under the published Dhaka schedule.** Do not apply the old pre-event restriction to the current session.

Before implementing or changing the product:

1. Recheck the selected challenge statement and any linked challenge resources.
2. Confirm the NASA dashboard still shows Team APOAPSIS, Local Event Dhaka, and this challenge.
3. Confirm all three intended teammates appear as registered members. The supplied dashboard screenshot does not show the full member list.
4. Check the Dhaka local event portal and team lead messages. The Dhaka site describes a separate local team registration process; confirm whether APOAPSIS has completed it.
5. Keep local event judging and upload milestones separate from the global Project form deadline.

**Immediate timing note:** the Dhaka schedule's Friday 6:30 PM local YouTube-folder video checkpoint has passed as of the last review time. Do not report it as complete unless verified. Contact the Dhaka Local Lead immediately to ask whether late upload is accepted and confirm the correct folder/link. The Saturday 9:00 AM 30-second video upload and opening of the global NASA Project form are the next hard milestones. The four-minute “240 Seconds of Glory” presentation is treated as in-person only for APOAPSIS, based on the team's explicit organizer guidance; do not create it unless the Local Lead gives a new instruction that applies to virtual teams.

## 5. Repository layout and startup

The user extracted the control bundle to `C:\NasaProject\APOAPSIS_project_control_bundle`. Treat that folder as the repository root if no other real source repository exists. The bundle contains control documents only; it does not contain a working application. Scaffold the React + TypeScript + Vite application under `app/`, while keeping `.git/` and the control Markdown files at the repository root. Do not waste time copying the docs into another empty folder. If an existing app repository is found elsewhere, inspect it and move or merge these documents safely before coding. See `CODEX_LAUNCH_PROMPT.md`.

## 6. Product scope and architecture

### Core product

Build a complete, short, replayable lunar outpost game. Prefer one strong lunar scenario over separate Moon and Mars modes. Use the exact five-cycle game rules in `GAMEPLAY_SPEC.md` as the initial implementation contract. Do not independently invent another balancing model before testing the specified one.

The player loop should be:

1. Read a concise mission briefing.
2. Inspect the current outpost status.
3. Choose a meaningful action.
4. See resources and mission condition change.
5. Read a short explanation of the trade off.
6. Continue through an incident or next cycle.
7. Reach a clear success, struggle, or failure outcome.
8. Review a mission debrief and restart.

### MVP requirements

- One playable lunar outpost scenario.
- Clearly stated goal and starting conditions.
- A dashboard for power, water, oxygen, food, radiation protection index, and crew condition as defined in `GAMEPLAY_SPEC.md`.
- At least four meaningful decisions with competing benefits and costs.
- The two deterministic events defined in `GAMEPLAY_SPEC.md`; add more only after the full five-cycle game is stable.
- Visible cause and effect after every decision.
- Mission cycle counter, success and failure logic, restart, and debrief.
- Short science explanations tied to reliable source links and meaningful NASA LOLA polar illumination context, following `NASA_DATA_PLAN.md`.
- Clear note that this is a simplified educational simulation, not a mission planning or safety tool.
- Responsive interface and a publicly accessible demo.

Implement the challenge's full mandatory requirements before treating any part of this list as sufficient. Use the official brief as authority.

### Recommended stack if the repo is blank

- React, TypeScript, and Vite for the browser app.
- CSS or a small styling solution the team already knows.
- Pure TypeScript functions for simulation rules.
- Local TypeScript or JSON data for scenario content.
- `localStorage` only if saving settings or current progress has real value.
- Git and GitHub for version control and handoff.
- Static hosting such as GitHub Pages or Netlify for the demo.

First inspect the repository and available tools. If a working stack already exists, do not replace it without evidence that it blocks delivery. A backend, user accounts, remote database, multiplayer, a chatbot, live APIs, and complex 3D are out of scope unless an official requirement or team approved feature justifies them. The MVP does not require a server or database.

### Keep logic separate from presentation

Create or preserve clear boundaries between:

- Domain types: `GameState`, `GameAction`, `GameEvent`, and `SimulationResult`.
- Pure simulation functions: resource updates, decision effects, incident effects, end conditions, and scoring.
- Content: event text, decision text, educational notes, and citations.
- UI: dashboard, decisions, events, result feedback, and debrief.

Keep resource changes predictable and testable. Each important decision must have documented costs and benefits. Use named constants rather than scattering unexplained numbers throughout components. Do not add abstractions that make the short simulation harder to understand.

## 7. Agent workflow from first task to release

For every task:

1. State the stage and the exact outcome needed.
2. Inspect the relevant files before editing.
3. Make a short plan only if the task has meaningful complexity; otherwise make the smallest useful change.
4. Edit only the relevant files.
5. Run the relevant tests, build, or manual check. Use the actual `package.json` scripts rather than guessing names.
6. Inspect `git diff`, check for accidental deletions, placeholders, secrets, broken links, and unrelated changes.
7. Update the work log and checkpoint when a milestone is complete.
8. Report what changed, what was verified, what remains, and the exact next step.

Do not rewrite a working application to make it stylistically different. Avoid adding dependencies unless the benefit is specific and worth the install and debugging time. If two agents work in parallel, assign disjoint files or use separate Git branches/worktrees. Do not let both agents rewrite the same files.

### Prompt discipline

Use short, bounded tasks. Each prompt should specify:

- Desired behavior.
- Relevant files or subsystem.
- Constraints and existing interfaces to preserve.
- Acceptance criteria.
- Exact verification command(s).
- Required final report: files changed, checks run, outcomes, limitations, next task.

Do not request “finish the whole project” in a single unbounded turn after the repo is created. Work in milestones and integrate continuously.

## 8. Mandatory checkpoint and laptop handoff protocol

**This section is mandatory.** A usage limit, context compaction, session timeout, computer shutdown, or move to a teammate's laptop must never be the only place where project state is stored. The repository and checkpoint files are the source of truth, not the chat transcript.

### When to checkpoint

Create or update a checkpoint:

- After every meaningful milestone, especially after the first playable loop, first successful production build, deployment, and final submission preparation.
- Before starting a large task.
- When the user says usage is low, requests a checkpoint, or says they may switch devices.
- When the usage indicator suggests the current allowance is getting low. Check `/status` or `/usage` if supported by the installed Codex version; do not pretend to know the quota if it is not visible.
- Before ending a session or handing work to another agent.

Do not wait for the usage limit to be reached. Codex may not be able to execute a checkpoint after a hard stop. Keep checkpoints small and frequent.

### Required checkpoint files

Create and maintain:

- `CHECKPOINT.md` — the latest complete handoff state, replacing older current-state information.
- `WORK_LOG.md` — a concise, append only record of milestones, significant changes, checks, and decisions.
- `DECISIONS.md` — key decisions and reasons when decisions have meaningful future impact.

If the repository already uses equivalent files, reuse them rather than creating duplicate systems.

`CHECKPOINT.md` must include:

```markdown
# Current Checkpoint

- Updated at: YYYY-MM-DD HH:MM Asia/Dhaka
- Stage: [requirements / implementation / testing / video / submission]
- Branch:
- Commit:
- Current status: [running / partially working / blocked / ready for review]

## Completed
- ...

## In progress
- ...

## Not started
- ...

## Current architecture and important interfaces
- ...

## Verification
- Command: `...`
  Result: pass / fail / not run
  Notes: ...

## Known issues and blockers
- ...

## Important files changed
- ...

## How to run on a new laptop
1. ...

## Exact next actions
1. ...
2. ...
3. ...

## Continuation prompt
Read AGENTS.md, engineering_skill.md, the execution plan, and this CHECKPOINT.md. Inspect the current branch and git status before changing anything. Continue with the first exact next action, preserve completed work, run the stated verification, and update CHECKPOINT.md and WORK_LOG.md when done.
```

Use Bangladesh local time for the human readable checkpoint timestamp. Do not include API keys, passwords, access tokens, private contact data, or other secrets. Do not dump a huge transcript into the checkpoint.

### Checkpoint procedure

1. Inspect `git status --short --branch` and `git diff --stat`.
2. Inspect `git diff` and new files. Ensure `.env`, tokens, private data, local caches, `node_modules`, generated build folders, and large unrelated files are excluded from version control.
3. Run the fastest relevant check, and a full build/test if it is reasonable. Record truthfully what was run and any failures.
4. Update `CHECKPOINT.md` and append a concise entry to `WORK_LOG.md`.
5. Review staged content before committing. Do not use `git add -A` blindly when there may be secrets or unrelated user files.
6. Commit a stable checkpoint with a message such as `checkpoint: playable mission loop` or `checkpoint: pre video handoff`.
7. If a configured remote exists and the user/team repository is authorized, push the branch and verify the push succeeded. Never claim a remote backup exists unless confirmed. Do not make a repository public without explicit approval and a secret scan.
8. If pushing is unavailable, report that clearly and create a portable handoff archive containing the source, lockfile, required docs, and checkpoint, while excluding `node_modules`, build output, secrets, and unnecessary cache. Keep Git history by using the remote where possible; if full history is important and no remote exists, consider a Git bundle.
9. Confirm the exact branch name and latest commit hash in the final status.

### Continue on a friend's laptop

Preferred method:

1. Install compatible Git and Node.js versions.
2. Clone the authorized GitHub repository.
3. Check out the branch named in `CHECKPOINT.md`.
4. Read `AGENTS.md`, `engineering_skill.md`, the execution plan, `CHECKPOINT.md`, and the latest relevant `WORK_LOG.md` entries.
5. Install from the lockfile with `npm ci` if the project uses npm and the lockfile exists.
6. Run the documented test/build command, then start the dev server.
7. Continue with the first exact action in `CHECKPOINT.md`; do not recreate completed features or restart the architecture without evidence that it is necessary.
8. After a successful new milestone, checkpoint and push again.

If transferring by archive, include all source files, lockfiles, required static assets, and documentation. Do not include `node_modules`; reinstall dependencies. Keep credentials out of the archive. Record any environment variables by name and purpose only, not their values.

## 9. Low quota and multi model policy

Codex is the primary implementation agent. Gemini CLI or another available model may be used as a fallback for review, isolated components, test ideas, wording, or debugging. Do not assume one model's student offer extends to every CLI or tool. Check the live usage indicator and current official docs.

When the Codex allowance is low:

1. Stop starting large exploratory tasks.
2. Finish or safely stop the current change.
3. Save a checkpoint using Section 7.
4. Push the working branch or prepare a portable archive.
5. Write a precise continuation prompt in `CHECKPOINT.md`.
6. Switch models only after the handoff is durable. The next model must read the same repository state and preserve the same interfaces.

Never ask a second model to “make its own version.” Ask it to inspect and modify the current branch, name the exact files, and run appropriate checks. A model's confident explanation is not verification.

## 10. Scientific integrity and source handling

Use official NASA material and the specific resources linked from the current challenge brief first. Verify all challenge linked datasets and use any mandatory dataset as instructed. For every meaningful science claim, record the source title, URL, organization, and which game mechanic or lesson it supports.

- Distinguish operational systems from planned concepts and proposals.
- Do not imply an ISS water recovery result is a guaranteed lunar habitat result.
- Do not model radiation dose, lunar survival, life support, or engineering safety as real predictions.
- Label simplified numbers and probabilities as game balance assumptions.
- If sources disagree, keep the disagreement visible and choose the most authoritative relevant source; do not silently merge incompatible claims.
- Include citations in the game or debrief where helpful and list sources in the README/project submission.
- Do not use a NASA logo or language that implies NASA endorsement of APOAPSIS.

## 11. Interface, accessibility, and competitive quality

Prioritize a visible learning loop over feature count.

- A first time player must understand the goal and first action without a developer explaining it.
- After an action, show the change and a concise “Why this mattered” explanation.
- Show resource units or clearly label values as game units.
- Communicate danger and success with text as well as color.
- Provide keyboard accessible main controls, visible focus, adequate contrast, readable type, and mobile usable layout.
- Avoid visual effects that obscure important numbers or slow play.
- Use consistent spacing and a restrained visual system. Space themed design should support clarity, not cover the interface with decoration.
- Test the deployed game as a new user, not only the local development version.

## 12. Production plan for the 30 second video

The video is a separate workstream with a strict **30 second maximum target**. The final required duration, format, submission location, video hosting, and any restrictions must be checked against the current official submission instructions and the latest Dhaka organizer messages. The plan below is the production method, not a claim that every technical specification is an official rule.

### Video objective

Within 30 seconds, prove three things:

1. The team has built a working educational game, not just a concept or mockup.
2. A player makes a meaningful outpost decision and sees a consequence.
3. The consequence teaches a real space engineering trade off and is backed by traceable NASA references.

The product must appear almost immediately. Do not spend the opening on a long logo animation, stock footage montage, or generic claims about space exploration.

### Exact draft timeline

| Time | Visual | On screen text | Audio / purpose |
|---|---|---|---|
| 0.0–2.5 s | Actual game screen with a clear resource warning or difficult starting state. Use a quick, clean cut. | “One outpost. Limited resources.” | Begin with a concrete problem. |
| 2.5–6.0 s | Full dashboard and mission goal. Briefly highlight power, water, food, and life support. | “Every choice has a cost.” | Establish the system and the goal. |
| 6.0–15.0 s | Record a real decision in the game. Show the click, the resource changes, and the response. | Use short labels such as “Food ↑ / Power ↓” only if those are the actual results. | This is the main proof. No fake or composited outcomes. |
| 15.0–21.5 s | Show the “Why this mattered” explanation and one source note. | “Understand the trade off.” | Explain the learning value. |
| 21.5–26.0 s | Show mission debrief and an actual result state. | “Play. Decide. Learn.” | Demonstrate that the loop has an ending. |
| 26.0–30.0 s | Minimal end card with project name and team identity. | “Outpost Zero · APOAPSIS” and a short challenge label or demo URL if allowed. | Clean end, no unnecessary tagline. |

Adjust shot durations if the product's real action takes longer, but retain a visible cause and effect. The actual build takes precedence over this draft storyboard.

### Draft voiceover

Adapt this after the game works. Do not narrate features that are absent.

> A lunar outpost has no easy choices. In Outpost Zero, students manage power, water, food, and life support. Choose an upgrade and watch the trade offs unfold. Each result explains why it happened, with learning notes linked to NASA sources. APOAPSIS built Outpost Zero to make mission engineering tangible, one decision at a time.

Aim for calm, natural delivery. Leave brief breathing room around the actual gameplay moment. If narration crowds the visuals, shorten the script instead of speaking unnaturally fast.

### Professional production workflow

1. **Lock the actual demo path.** Decide on one reliable playthrough that shows a decision and the resulting state change. Set up a known save or repeatable start state where possible. Do not fake gameplay by editing values in the code or compositing a false result.
2. **Capture clean footage.** Record the deployed or tested local build at a stable resolution. Hide the browser bookmarks bar, terminal, personal notifications, and private information. Use a consistent browser zoom and cursor movement. Capture a safety take and a clean alternate take.
3. **Prepare visual assets.** Prefer the real application UI and custom project graphics. If reference images or video clips are needed, use only assets permitted by NASA media guidelines or assets with a clear reuse licence. Save the source URL, title, creator or organization, licence/usage note, and exact use in `video/assets/attribution.md`. Do not use unlicensed stock footage, copyrighted music, or third party work merely because a search engine exposes it. Do not use NASA insignia in a way that implies endorsement.
4. **Create a storyboard and shot list.** Match every edit to the 30 second timeline. Each visual needs a purpose. Use a simple motion graphic or zoom only to guide attention to a relevant UI change. Avoid unnecessary transitions and excessive space imagery.
5. **Choose the simplest reliable editor.** Inspect what is already installed before adding a dependency. If FFmpeg is available, it can trim, scale, join, and encode footage. If a programmatic video is useful and time permits, Codex may create a small Remotion or similar timeline project, but only if that does not delay the app or submission. Otherwise use a familiar editor already available to the team. Do not spend a large share of project time learning a new editor.
6. **Add narration and captions.** Record clean voiceover with low background noise. Burn in accurate captions or add captions if supported by the delivery platform. Keep all text readable at phone size and clear of critical UI. Music is optional; if used, it must be licensed and quieter than speech.
7. **Polish the sound and pacing.** Trim dead air, align clicks or visual changes with the narration, keep audio levels consistent, and use only a few unobtrusive transitions. Do not bury product proof under effects.
8. **Export.** If the current official guide does not specify a different format, use a standard MP4/H.264 export at 1080p and a sensible frame rate. Treat this as a technical default, not an official rule. Keep the actual final duration at or below the allowed limit.
9. **Verify the export.** Use `ffprobe` if available to check duration, resolution, video codec, and audio presence. Watch the complete exported file from beginning to end. Check caption spelling, clipping, black frames, silent audio, unreadable text, unexpected interface states, and that all visuals match the actual game.
10. **Keep the editable source.** Save the project file, source recording, exported MP4, and attribution notes in a clear directory. Do not leave the only copy in a temporary editor cache. Avoid committing huge raw clips or temporary renders unless the team agrees; back them up separately and make sure the final submission video remains accessible.

Suggested structure if the existing project does not already use one:

```text
video/
  storyboard.md
  script.md
  assets/
    attribution.md
  captures/
  edit-project/
  exports/
    apoapsis_30s.mp4
```

### Video acceptance checklist

- [ ] Meets the current official duration and format rules.
- [ ] Shows the real working product, not only a mockup or a logo.
- [ ] Shows one actual decision and its actual consequence.
- [ ] Explains the educational value within the time limit.
- [ ] Does not claim features, scientific accuracy, or NASA endorsement that are not true.
- [ ] Captions are accurate and readable on a phone.
- [ ] Speech is clear and no copyrighted or unlicensed audio is used.
- [ ] Every third party image or clip has a verified usage basis and is documented.
- [ ] Export has been watched and checked for duration and playback.
- [ ] Final video link is viewable by a judge without special access.
- [ ] Local organizer upload and NASA Project page upload are both handled if both are required.

### Video schedule for the Dhaka route

The Dhaka schedule supplied by the team lists Friday, 13 November at 6:30 PM for a local YouTube-folder video checkpoint and Saturday, 14 November at 9:00 AM for the final 30-second video upload to the NASA site. The Friday checkpoint has passed as of the last review time. If it was missed, contact the Local Lead immediately to ask whether late upload is accepted. The Saturday 9:00 AM NASA upload is the next hard video milestone. A local folder upload does not replace the NASA Project page upload if both are required. Do not create the four-minute “240 Seconds of Glory” pitch unless the Local Lead explicitly changes the virtual team's requirements.

## 13. Release and submission requirements

Before declaring the project done, verify:

- The core loop can be played from a clean start through a clear ending.
- The main actions and outcomes have relevant tests or documented manual checks.
- The production build succeeds.
- The deployed app opens in a private/incognito browser and does not require the judge to log in.
- The deployed version matches the tested commit.
- The public source repository, README, licence, and citations are present as required by current rules.
- No secrets, API keys, private contact details, or unrelated files are committed.
- The project description accurately explains the problem, solution, audience, science, and limitations.
- Video duration, format, link permissions, and every required local upload have been checked.
- All NASA Project fields and required teammate details are complete.
- The team saves submission confirmation and records the submitted links in `CHECKPOINT.md`.

The final project needs a functioning demo, public source where required, credible sources, clear project story, and the required video. Do not add a backend or database just to claim a full stack build. Add those layers only if they fulfil a real, verified need.

## 14. Required final report after each coding task

Finish each task with a compact report:

- **Outcome:** what changed.
- **Files:** list meaningful files changed.
- **Verification:** exact commands and truthful results.
- **Checkpoint:** commit hash/branch if a checkpoint was created; state clearly if remote push failed or was not possible.
- **Remaining:** blockers or unverified assumptions.
- **Next action:** one specific action with the highest value.

Be direct. Do not claim flawless execution or guarantee a winning result. The goal is a complete, clear, testable, scientifically responsible submission delivered on time.
