# APOAPSIS Current Checkpoint

- Updated at: 2026-11-13 21:26 Asia/Dhaka
- Stage: kickoff / repository setup / implementation not yet inspected
- Event: Dhaka Local Event, fully online, 13–14 November 2026
- Team: APOAPSIS
- Challenge: Build a Junior Astronaut Mission Trainer
- Product concept: Outpost Zero
- Branch: not yet verified
- Commit: not yet verified
- Current status: planning documents prepared; no application source repository was supplied in this chat workspace, so source code, build, and deployment status are not verified.

## Confirmed from the participant dashboard screenshot

- Registered event shown: 2026 NASA Space Apps Challenge.
- Team shown: Team APOAPSIS.
- Local Event shown: Dhaka.
- Selected challenge shown: Build a Junior Astronaut Mission Trainer.
- Registration date shown: October 17, 2026.

The screenshot does not show the complete team member list or prove that any separate Dhaka local event registration form has been completed.

## Event timing that matters now

- Dhaka event: Friday 13 November and Saturday 14 November 2026; the Dhaka Local Event page describes it as fully online.
- Friday 13 November 6:30 PM: local video-folder checkpoint in the schedule provided by the team. This has passed as of this checkpoint. Verify whether APOAPSIS uploaded the 30-second video. If not, contact the Dhaka Local Lead immediately to ask whether late upload is accepted and confirm the destination.
- Saturday 14 November 9:00 AM: 30-second video upload through the NASA Project page per the team's Dhaka schedule; the global Project form opens at this time.
- Sunday 15 November 11:59 PM local time: global NASA Project submission deadline.
- Four-minute “240 Seconds of Glory”: not an APOAPSIS deliverable under the team's explicit understanding for virtual participants. Reconfirm only if the Local Lead sends a new instruction for virtual teams.

## Local folder reported by the user

- The user reports extracting the control ZIP to `C:\NasaProject\APOAPSIS_project_control_bundle`. This local Windows folder cannot be inspected from this assistant workspace.
- The bundle contains documentation and instructions only; it does not include application source code or a working `package.json`. Codex should scaffold the Vite app in the `app/` subfolder.

## Completed in the planning workspace

- [x] Existing `AGENTS.md` reviewed and updated to reference control documents and current event status.
- [x] `ARCHITECTURE.md` created.
- [x] `DESIGN_SYSTEM.md` created.
- [x] `SECURITY.md` created.
- [x] Existing `engineering_skill.md` updated to use the current event context and new control documents.
- [x] `README_START_HERE.md` created with repository placement instructions and the first Codex prompt.
- [x] `APOAPSIS_project_control_bundle.zip` packaged for transfer.
- [x] Existing 30-second video plan reviewed.
- [x] Official challenge page and Dhaka local event details checked through accessible NASA / local event pages.

## Not yet verified

- [ ] All three teammates appear in the official NASA team member list.
- [ ] Separate Dhaka local team registration, if required by the local event portal, is complete.
- [ ] The correct virtual event communication link / announcement channel is available to all members.
- [ ] The local 6:30 PM video-folder upload is complete or late-upload permission was obtained.
- [ ] The actual application repository, current Git branch, and working tree have been inspected.
- [ ] Node.js, npm, Git, and Codex CLI are available on the primary machine.
- [ ] Teammate laptop can clone the same authorized repository.
- [ ] No application build, test, or deployment has yet been verified from the files available in this workspace.

## New implementation specifications

- `GAMEPLAY_SPEC.md` defines the exact five-cycle game, starting resources, action costs, deterministic events, win/failure logic, and a balanced example path.
- `NASA_DATA_PLAN.md` defines practical use of the LRO LOLA south polar illumination product and supporting NASA science sources.
- `CODEX_LAUNCH_PROMPT.md` is the single startup prompt for Codex CLI.
- `TEAM_TASK_BOARD.md`, `AI_TOOLS_LOG.md`, and `SUBMISSION_DRAFT.md` cover responsibilities and final delivery.

## Architecture summary

- Preferred MVP: static React + TypeScript + Vite browser game.
- Pure TypeScript simulation engine separated from React UI.
- No backend, database, accounts, or live APIs in the MVP.
- In-memory state by default; versioned localStorage only if useful.
- Public HTTPS static hosting.

## Verification

- Dashboard screenshot visually inspected: Team APOAPSIS, Local Event Dhaka, selected challenge visible.
- Existing planning files inspected.
- Official pages searched; some NASA pages returned server errors when opened directly. Search-index content and the Dhaka local event portal were used where available.
- Application commands: not run; project source repository not available in this workspace.

## Exact next actions

1. Open PowerShell and run `Set-Location 'C:\NasaProject\APOAPSIS_project_control_bundle'`, then start `codex`.
2. Paste the complete instruction from `CODEX_LAUNCH_PROMPT.md`. It is written for this folder and tells Codex to create the Vite application in `app/` without overwriting the control files.
3. Verify all three teammates appear on the NASA team page. Check the separate Dhaka portal registration immediately; the portal currently advertises a November 13 registration close. If uncertain, email the Dhaka Local Lead.
4. If the Friday 6:30 PM local video-folder upload was missed, ask the Local Lead now whether a late 30-second upload is accepted and request the exact folder/link.
5. Implement the playable game using `GAMEPLAY_SPEC.md`; integrate the LOLA source context from `NASA_DATA_PLAN.md`. Do not spend the first coding session on polish, audio, 3D, or a backend.
6. By the Saturday 9:00 AM NASA Project opening, target a playable build and the required 30-second demo video for upload. The global final submission deadline remains Sunday 15 November at 11:59 PM local time.
7. At each major milestone and before Codex quota becomes low, update this checkpoint and `WORK_LOG.md`, commit, and push to an authorized remote or create a portable handoff.
8. Complete `AI_TOOLS_LOG.md` and `SUBMISSION_DRAFT.md` using only verified features, sources, tools, and URLs. Save proof of the final NASA Project submission.

## Continuation prompt

Read `AGENTS.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `SECURITY.md`, `engineering_skill.md`, the execution plan, the 30-second video plan, and this `CHECKPOINT.md`. Inspect the actual repository, branch, Git status, and current files before editing. The Dhaka event has already started, so challenge implementation is allowed under the current event schedule. Do not assume the source repository is blank. Implement the smallest complete playable lunar outpost MVP, following the architecture and design rules. Keep all science claims sourced and every invented gameplay value labelled as a game assumption. Run the actual project checks. Update `CHECKPOINT.md`, `WORK_LOG.md`, and `DECISIONS.md`; commit a stable milestone and push only to the authorized remote. If usage is getting low, stop new work and complete a durable checkpoint before the hard limit.
