---
name: apoapsis-engineering
version: 1.1.0
description: A reusable engineering operating guide for planning, researching, designing, building, testing, documenting, deploying, and submitting APOAPSIS's NASA Space Apps Challenge project. Use it throughout the project lifecycle, while obeying official event rules and submission requirements.
---

# APOAPSIS Engineering Skill

## 1. Mission

Help APOAPSIS deliver a small, functional, scientifically responsible, accessible, and well presented solution to NASA Space Apps Challenge 2026: **Build a Junior Astronaut Mission Trainer**.

The current working concept is **Outpost Zero**, a browser game in which students manage a lunar outpost and learn how decisions affect power, water, food, life support, radiation protection, and crew safety. Treat this as a working concept, not a fixed requirement. Before implementation, compare it with the complete official challenge brief and update the scope if needed. The Dhaka event is currently underway, so this is an immediate implementation check, not a reason to delay coding.

This skill applies to every stage of the work: project planning, requirements analysis, scientific research, product design, architecture, interface design, coding, functions, data handling, testing, debugging, documentation, deployment, the 30 second video, and final submission.

## 2. Authority and rule priority

Read the repository root `AGENTS.md` before working. It defines the operational requirements for Codex, including checkpointing, laptop handoff, and video production. This skill supplies the more detailed engineering practices; do not let the two documents drift apart.

When instructions conflict, follow this order:

1. Current official NASA Space Apps rules, Terms and Conditions, challenge statement, submission guide, and event instructions for the team's registered event.
2. The current project plan and decisions explicitly approved by the team.
3. This skill file.
4. Individual implementation preferences.

Never assume that a past year's rules, an unofficial post, or an earlier AI answer overrides current official instructions. Recheck deadlines, video length and format, required fields, judging route, and virtual event requirements on the official pages and team messages.

Official references:

- Main event: https://www.spaceappschallenge.org/2026/
- Selected challenge: https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/
- Dhaka NASA event page: https://www.spaceappschallenge.org/2026/local-events/dhaka/
- Dhaka local event portal: https://dhaka.nasaspaceappsbd.com/
- Universal Event: https://www.spaceappschallenge.org/2026/local-events/universal-event/
- Participant resources: https://www.spaceappschallenge.org/resources/
- Terms and Conditions: https://www.spaceappschallenge.org/legal/
- Current execution plan: `apoapsis_nasa_space_apps_2026_execution_plan.md`

## 3. Non negotiable style rule: humanize everything

Every written or user facing output must sound natural, specific, and purposeful. This rule applies to UI text, game explanations, research notes, code comments, variable names where appropriate, README files, project descriptions, video scripts, prompts, reports, messages, and presentations.

### Writing requirements

- Use plain, direct language. Prefer a clear sentence over a slogan or a string of buzzwords.
- Write as a thoughtful person explaining real work, not as a generic AI product description.
- Be specific. Say what the feature does, what the player chooses, and what changes as a result.
- Keep the user's intent, team facts, and actual project capabilities accurate. Never invent qualifications, completed work, test results, NASA endorsements, or scientific validation.
- Avoid stock phrases such as “revolutionary solution,” “cutting edge innovation,” “seamlessly empowers,” “leverages advanced technology,” and “redefines the future” unless the context genuinely requires those words and they can be substantiated.
- Remove repeated claims, filler, grand introductions, redundant conclusions, and any content that does not help the reader understand or use the deliverable.
- Keep tone consistent across the product. Educational copy should be approachable without sounding childish; technical documentation should be exact without becoming unnecessarily dense.
- Use active voice when it improves clarity. Keep labels and buttons short and action oriented.
- Do not make all sentences the same length. Natural writing has varied rhythm, but clarity remains the priority.
- Never claim that the game is an operational mission planning tool. State that its mechanics are simplified for learning.
- Do not hide AI assistance if the event's rules require disclosure. Follow the current official policy.

### Hyphen rule

Do not add unnecessary hyphens between words. Prefer normal phrasing, commas, or separate sentences over decorative hyphen chains. Use a hyphen only when standard grammar, a technical term, a proper name, or clarity genuinely requires it. Do not mechanically remove hyphens from official names, URLs, identifiers, code syntax, or terms whose spelling requires them. Human wording matters more than forcing a blanket rule.

### “No extra” rule

Deliver only what the task needs. Do not add optional features, long explanations, libraries, abstractions, slogans, sections, or UI elements merely because they are possible. Before adding anything, answer: does it satisfy an explicit requirement, prevent a real failure, improve learning, improve usability, or strengthen judging evidence? If not, leave it out.

## 4. Project control documents

For APOAPSIS, read and obey the repository's `AGENTS.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, and `SECURITY.md` before substantial implementation. These files define the operating process, system boundaries, visual language, and security limits. If they conflict with a current official NASA requirement, flag the conflict and follow the official requirement. If a team decision changes an architecture or design rule, record it in `DECISIONS.md` and update the relevant control document.

## 5. Work protocol for every task

Before taking action:

1. Identify the current stage and the expected result.
2. Read the relevant challenge requirement, project plan, and existing files before proposing edits.
3. Separate confirmed facts from assumptions. Mark any assumption that affects implementation or judging.
4. Check whether the requested work is allowed at the current time under the official hackathon rules.
5. Define a small, testable outcome and the minimum files or decisions needed to achieve it.
6. Choose the simplest approach that meets the requirement.

While working:

1. Make the smallest useful change that solves the stated problem.
2. Preserve working behavior and established interfaces unless changing them is necessary.
3. Do not rewrite whole files or redesign the whole product to fix a local issue.
4. Keep logic, interface, content, and sources separated when that makes the code easier to reason about.
5. Verify the result with relevant checks. Do not say a test passed unless it was actually run and passed.
6. Report the files changed, commands run, checks completed, limitations, and next critical action.

When a task is underspecified, use the project plan and current files to make a low risk choice. Ask a concise question only when different interpretations would materially change the deliverable or risk violating a rule. Never ask again for information already provided.

## 6. Active event status and boundaries

The Dhaka Local Event is scheduled for 13–14 November 2026 and its local event site describes it as fully online. The participant dashboard screenshot shows APOAPSIS registered under Dhaka with the selected challenge. At the latest review on Friday, 13 November 2026, the Dhaka event was already underway, so challenge implementation may proceed under the published local schedule.

Before coding, verify the current challenge statement, team member list, any separate Dhaka local registration, remote judging route, video handoff, and submission milestones. The global NASA Project form opens Saturday, 14 November at 9:00 AM and closes Sunday, 15 November at 11:59 PM local time. Those global milestones are separate from local Dhaka video and judging activities.

For future events, follow the pre-event restrictions in that event's current official rules. Do not assume dates, permissions, or processes from this event apply to a future event.

## 7. Product principles

The product must teach a decision, not merely look like space.

- Keep the first version to one environment, preferably a lunar outpost, unless the final challenge brief points elsewhere.
- Make the central loop obvious: inspect the outpost, choose an action, observe the consequence, understand the trade off, and try again.
- Each major decision must change at least one meaningful system and create a cost, risk, or opportunity elsewhere.
- Show the consequence immediately. Explain why it happened in a short “Why this matters” note.
- Provide a mission debrief that connects choices to learning outcomes.
- Make restart and replay work.
- Use a graceful failure state that teaches the player what went wrong rather than simply punishing them.
- Do not add a chatbot, accounts, multiplayer, complex 3D, a database, or live API integrations unless a confirmed requirement makes one necessary.
- Prefer a complete 2D game with clear feedback over a broad, unfinished simulation.

### Minimum viable product

The MVP should contain, if consistent with the final official brief:

- One playable lunar outpost scenario.
- A clearly explained starting situation and goal.
- Visible resource values and their units or explicitly labelled game units.
- At least four meaningful decisions.
- Multiple events with understandable consequences.
- A turn or mission cycle counter.
- Clear success, struggle, and failure conditions.
- A mission debrief showing the effects of player choices.
- Brief science explanations and accessible references.
- A responsive interface that works in a current desktop browser and remains usable on mobile.
- A public demo link and an accessible source repository if required by the current rules.

Do not treat this list as a substitute for reading the full challenge statement. Mandatory challenge requirements always take precedence.

## 8. Research and scientific integrity

Use official NASA sources and any datasets explicitly named in the challenge. Follow source links to understand the actual content rather than relying only on search snippets.

For each factual mechanic or explanation, record:

- Claim or game mechanic supported.
- Exact source title and URL.
- Relevant statement or data field.
- How the project uses the information.
- Limitations, assumptions, and any conversion performed.

Rules for using science:

- Do not invent a NASA statistic, dataset, quote, model, or claim.
- Distinguish measured data, a NASA reference example, a design assumption, and a fictional gameplay value.
- If a number is invented for balance, label it as a game value. Do not present it as an engineering unit or NASA prediction.
- Explain simplifications openly. The game is educational, not a spacecraft simulator, medical tool, radiation dose calculator, or real mission forecast.
- Do not imply that a particular lunar site, system, or performance value is universal if the source does not support that.
- Check whether images, audio, code, fonts, and data can be used under their applicable licences. Record attribution and licence notes where necessary.
- Prefer a few accurately used sources over a long list of loosely related links.

## 9. Engineering and architecture standards

Use the stack the team can build and debug most reliably. The current suggestion is React, TypeScript, Vite, and CSS, but this is not a mandatory requirement.

Keep the project simple and modular:

- **Game types:** state, action, event, outcome, and resource definitions.
- **Game engine:** pure functions for applying decisions, processing events, updating resources, scoring, and checking end conditions.
- **Game content:** action text, event text, explanations, and source references.
- **Interface:** resource panel, decision cards, alerts, turn indicator, and mission debrief.
- **Tests:** core resource changes, edge cases, win and failure conditions, and restart behavior.
- **Documentation:** README, run instructions, sources, assumptions, and limitations.

Avoid unnecessary dependencies and complex state management. Do not add a service, database, authentication, or API key to a game that can run as a static site.

### Function design rules

Every function should have one clear responsibility and a meaningful name. Keep state transitions explicit and predictable.

- Prefer pure functions for core game rules.
- Pass required values as arguments instead of reading hidden global state.
- Define input and output types.
- Validate values at boundaries and handle missing or invalid inputs deliberately.
- Decide how resource values are bounded, rounded, and displayed. Make the rule consistent.
- Prevent resources from silently going below their allowed minimum or above their maximum unless the game rules explicitly permit it.
- Keep random events seeded or otherwise controllable during tests. If randomness is not necessary for learning, use deterministic events.
- Avoid mutating shared state in ways that make the outcome hard to trace.
- Make failure conditions and their order explicit. Test cases where two failure rules could trigger together.
- Do not put the entire game inside one giant component or function.
- Do not abstract a one line operation into a complicated utility without a clear benefit.

### Code quality

- Use readable names and small functions.
- Follow the code style already used in the project.
- Add comments to explain non obvious decisions, not to narrate every line.
- Handle errors that a user could encounter; do not hide failures with empty catch blocks.
- Avoid duplicate logic and magic numbers. Give gameplay constants descriptive names and document their purpose.
- Do not introduce a new library to save a few lines of code.
- Keep configuration and secrets out of the public repository. Never commit API keys or private credentials.

## 10. Interface and accessibility

The visual style should feel like a focused space mission dashboard, not a cluttered science fiction movie interface.

- Establish a clear visual hierarchy: mission status, resources, decision, consequence, and next action.
- Make values readable at normal laptop size and on mobile.
- Do not rely on color alone to communicate danger or success. Use labels or icons with text.
- Keep contrast high and text readable.
- Give every button a clear label and visible feedback.
- Make keyboard navigation work for important controls.
- Use semantic HTML elements where possible and give meaningful alternative text to informative images.
- Respect reduced motion preferences if animations are included.
- Avoid decorative animations that slow down the experience or compete with important numbers.
- Make the player's next action clear without requiring a tutorial video.
- Use real game states in the interface; avoid static mockups that appear functional but are not.

## 11. Codex and model usage under a limited quota

Treat Codex time and other model quotas as limited engineering capacity. Spend them on changes that remove blockers or create verifiable progress.

### Before asking a coding model for help

- Read the current files and error output.
- State the intended behavior and the observed failure.
- Identify relevant files and constraints.
- Ask for one bounded change, not a rewrite of the full project.

### Prompt template

> Inspect the existing code before editing. Implement only **[specific task]** in **[relevant files]**. Preserve existing behavior and public interfaces unless a change is required. Do not modify unrelated files or add dependencies without explaining why. Include the assumptions made, files changed, exact commands to verify the result, and any known limitations. Do not claim tests passed unless you ran them.

### Efficient iteration

1. Ask for an implementation plan only when a task has multiple meaningful steps or substantial risk.
2. For a small task, ask directly for the smallest patch.
3. Batch related changes when they share the same files and can be tested together. Do not batch unrelated changes.
4. Run the suggested test or build command yourself and inspect the result.
5. If a fix fails, provide the exact error and the relevant code. Do not repeatedly request a full rewrite.
6. Keep a short `DECISIONS.md` or issue list for important choices, blockers, and follow up work.
7. Use other models for second opinions, wording, research summaries, or review when suitable, but independently verify technical, scientific, and event rule claims.
8. Do not paste large amounts of code into a model when a filename and focused excerpt are enough.

A model's confident answer is not proof. The running application, tests, official sources, and observable output are the evidence.

### Mandatory durable checkpoint and cross laptop handoff

The repository and checkpoint files are the source of truth, not the chat history. Read `AGENTS.md` in the repository root first; Codex should follow its project specific instructions. Keep the current execution plan and this skill alongside the repository where possible.

Create or update a checkpoint after each major milestone, when usage is getting low, before a long task, before changing devices, and before ending a work session. Do not wait until the usage limit is exhausted because a hard stop may prevent further edits. Check `/status` or `/usage` only if the installed Codex version supports it; do not guess at remaining quota.

Maintain `CHECKPOINT.md`, `WORK_LOG.md`, and `DECISIONS.md`, unless the repository already has an equivalent system. The checkpoint must record the stage, Asia/Dhaka timestamp, branch, latest commit, completed work, work in progress, files changed, checks and their actual results, blockers, environment requirements, exact next actions, and a continuation prompt. Never include secrets or credentials.

Checkpoint procedure:

1. Inspect `git status --short --branch`, `git diff --stat`, and the full relevant diff.
2. Check new files and `.gitignore`. Exclude credentials, `.env` files, personal data, caches, `node_modules`, and generated build output.
3. Run a relevant test or build and record truthfully whether it passed, failed, or was not run.
4. Update the checkpoint and append the milestone to the work log.
5. Review the staged changes before committing. Do not blindly stage unrelated files.
6. Commit a stable checkpoint and push it to the authorized team remote if configured. Verify the push succeeded before claiming it is backed up.
7. If no remote is available, prepare a portable source archive or, when preserving history matters, a Git bundle. Exclude secrets and regenerable dependency folders.

For a friend's laptop, clone the repository, check out the exact branch from `CHECKPOINT.md`, read `AGENTS.md`, this skill, the execution plan, and checkpoint, install dependencies from the lockfile, run the stated test/build, and continue with the first listed next action. Do not reconstruct completed work or restart the architecture without evidence that it is necessary.

### 30 second video: make the product visible

For the full standalone storyboard and production checklist, also read `APOAPSIS_30_second_video_plan.md`. The video must prove the working product and its learning value, not merely advertise the concept. Use the exact current official format, duration, hosting, and upload rules. A useful starting storyboard is: 0–2.5 seconds, a real resource problem; 2.5–6 seconds, the outpost dashboard; 6–15 seconds, a real player decision and its consequences; 15–21.5 seconds, the explanation of the trade off; 21.5–26 seconds, the actual debrief; 26–30 seconds, the project and team identity.

Record actual gameplay. Do not fabricate results, rely only on mockups, or spend the opening on a long logo animation. Use official NASA material or assets with verified reuse permissions. Record the source URL, title, creator or organization, and usage note in `video/assets/attribution.md`. Avoid copyrighted music and do not imply NASA endorsement. Make captions readable at phone size, keep narration natural, and ensure every spoken claim matches the delivered app.

Inspect installed editing tools before installing new ones. Use FFmpeg for simple trims/encoding if available, or a familiar editor. Use Remotion or another code based video workflow only if it improves the result without risking the app or deadline. Export using the official requirements; if none specify otherwise, MP4/H.264 at 1080p is a reasonable default, not an official rule. Watch the complete export and check duration, codec, audio, captions, link access, and playback. Keep the editable project, source capture, final export, and asset attributions durable across laptop transfers.

## 12. Testing and debugging

Test the system in layers, starting with the highest risk logic.

### Game logic

- Each action changes only the intended state fields.
- Resource costs and gains match the documented rules.
- Resource limits are enforced consistently.
- Events have clear preconditions and consequences.
- A player cannot take actions after the game has ended.
- Win, failure, restart, and repeated play work.
- The same state and action produce the same result unless randomness is explicitly part of the design.

### User interface

- All choices can be activated.
- Consequences are visible after a decision.
- Labels and resource units are clear.
- No text overlaps or becomes unreadable at small widths.
- Error, success, and disabled states are understandable.
- The browser console has no unresolved important errors.

### Release checks

- The production build succeeds.
- The deployed URL opens in a private/incognito browser without login.
- The app works from a fresh load and after refresh.
- The README contains correct setup and run instructions.
- External links and citations work.
- The final video and all submission fields meet the current official requirements.

Do not spend the final hour adding features while unresolved launch blockers remain.

## 13. Stage by stage execution guide

### Stage A: Rules and requirements

- Confirm the registered event route: Dhaka online Local Event or Universal Event.
- Read the final challenge brief, submission guide, judging guide, and event announcements.
- Convert each requirement into a checklist item with a way to prove it is satisfied.
- Mark items as mandatory, useful, or optional.
- Resolve conflicting deadlines or video rules with the official event contact.

### Stage B: Scope and product design

- Write a one sentence problem statement and a one sentence learning goal.
- Define the target learner and the single core player loop.
- Sketch the main screens before coding: briefing, outpost dashboard, decision, consequence, and debrief.
- Agree on the MVP and explicitly list features that will not be built.
- Keep one backup scope that can be finished if time becomes tight.

### Stage C: Research and game model

- Collect a small set of authoritative sources.
- Map each source to the mechanic or lesson it supports.
- Define the game's state and resource rules in plain language before implementing them.
- Mark all invented balance values as game values.
- Review the model with a teammate who did not write it and ask whether each outcome is understandable.

### Stage D: Implementation

- Start with a working app shell and one playable turn.
- Implement and test the game engine before expanding the interface.
- Add the resource dashboard and decision feedback.
- Add events and the end state.
- Add the mission debrief and citations.
- Integrate UI and game logic continuously instead of waiting for a large merge at the end.

### Stage E: Validation and polish

- Ask each teammate to play from a fresh start without coaching.
- Record confusing decisions, dead ends, exploits, incorrect outcomes, and unclear science statements.
- Fix blockers before visual polish.
- Remove placeholder text, dead buttons, unused sections, console errors, and unverified claims.
- Make the demo work with a clean page load and a stable, repeatable scenario.

### Stage F: Deploy and document

- Deploy early enough to catch configuration and hosting problems.
- Confirm the deployed app matches the tested source commit.
- Write a direct README: problem, solution, how to play, technology, sources, assumptions, limitations, and credits.
- Make links public and accessible to judges as required by the official rules.
- Confirm the project page uses accurate language and does not describe planned features as finished features.

### Stage G: Thirty second video

Confirm the exact requirements for the registered event before recording. If a 30 second video is required, use a timed outline such as:

- **0 to 4 seconds:** project name and problem.
- **4 to 10 seconds:** show the outpost and its resource constraints.
- **10 to 21 seconds:** show a real player choice and its visible consequence.
- **21 to 27 seconds:** show the mission debrief and learning outcome.
- **27 to 30 seconds:** project name and public demo location if allowed by the format.

Show the actual running product, not only mockups or slides. Make the on screen text readable, keep narration natural, and do not promise features that are absent. Verify timing, audio, captions if appropriate, accessibility, required hosting, visibility, and upload method. If a teammate is under 18, follow the current official restrictions on including identifiable faces, names, or voices in the submission video.

### Stage H: Submission and handoff

- Submit through the correct Project page or event form for the registered route.
- Check every required field and link.
- Confirm the repository and demo remain accessible.
- Confirm the video is viewable by judges and meets the current specifications.
- Capture a screenshot or record the confirmation after successful submission.
- Do not wait until the final minutes to upload.

## 14. Three person team operating model

Adapt roles to the actual strengths and availability of each member. One person may hold more than one role, but every critical task must have an owner.

- **Product and integration lead:** requirements, scope, repository coordination, game engine integration, deployment, and deadline control.
- **Interface and experience lead:** screen layout, interaction states, responsive design, accessibility, and visual demo capture.
- **Research and quality lead:** NASA sources, model assumptions, test scenarios, user testing, README, and submission narrative.

Use short check ins with three questions: what is complete, what is blocked, and what must be done next. Integrate code early, keep the main branch runnable, and avoid a large untested merge at the deadline.

## 15. Competitive strategy

The aim is not to build the most features. It is to produce the clearest, most complete answer to the challenge.

Prioritize:

1. Direct alignment with the challenge's educational goal.
2. Meaningful and clearly explained engineering trade offs.
3. Evidence based science with transparent assumptions.
4. A complete, playable experience rather than static screens.
5. A distinctive, readable interface that supports the learning loop.
6. Evidence of testing, clear source attribution, and reliable access.
7. A concise video showing the product and its value immediately.

Do not claim that any particular strategy guarantees an award. Judges decide using the current official criteria. Read those criteria and make evidence of each relevant quality visible in the product, project description, demo, and video.

## 16. Definition of done

A task is done only when its stated acceptance conditions are met and the result is checked. “Code written” is not the same as “feature completed.”

The project is ready to submit when:

- Mandatory challenge requirements have been mapped to working features or clearly documented evidence.
- The core game loop works from beginning to end.
- Resource changes are internally consistent and covered by relevant tests or repeatable checks.
- Main screens are readable and usable on a typical laptop and mobile viewport.
- Science claims are sourced, and assumptions are labelled.
- No required button or interaction is merely decorative.
- The production build and deployed app work.
- Documentation, credits, and licences are accurate.
- The video and all submission fields match the official instructions for the team's registered event.
- The final submission is completed before the applicable deadline and confirmation is recorded.

## 17. Response format when executing a task with this skill

For substantial tasks, report the result in this order:

1. **Goal:** what this task is meant to accomplish.
2. **Decision:** the simplest defensible approach and why.
3. **Work:** files, code, design, or research completed.
4. **Verification:** exact tests, builds, checks, or sources inspected.
5. **Limitations:** anything unverified, blocked, or incomplete.
6. **Next critical step:** one concrete action, only when one is needed.

For a small request, skip the headings and give the result directly. Never claim to have run a command, deployed a site, checked a link, or verified a source unless that action actually occurred.

## Final operating rule

Protect correctness, scope, and submission readiness. Humanize every piece of writing. Avoid unnecessary hyphens. Add nothing without a reason. Verify claims and code. Keep the product working. Follow the current official rules above all else.
