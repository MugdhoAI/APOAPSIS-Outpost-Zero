# APOAPSIS Work Log

## 2026-11-13 21:26 Asia/Dhaka — Project control documents prepared

- Reviewed the existing `AGENTS.md`, engineering skill, execution plan, and 30-second video plan.
- Confirmed from the participant dashboard screenshot that Team APOAPSIS is registered under the Dhaka Local Event and has selected Build a Junior Astronaut Mission Trainer.
- Checked the NASA challenge listing, global submission timing, and Dhaka Local Event page. The Dhaka event page describes the event as fully online on 13–14 November 2026.
- Created `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, and `SECURITY.md`.
- Updated `AGENTS.md` and `engineering_skill.md` to reference those documents and to remove the stale pre-event block for the current active event.
- Created an initial `CHECKPOINT.md`, `WORK_LOG.md`, and `DECISIONS.md`.
- Created `README_START_HERE.md` with an initial Codex prompt and repository placement instructions.
- Packaged the current control and planning documents in `APOAPSIS_project_control_bundle.zip`.
- Updated the start prompt to load supporting documents only when relevant, reducing unnecessary Codex context use.
- Noted that the Friday 6:30 PM local video-folder checkpoint is already past as of 21:26; upload state is unknown and must be checked with the team / Local Lead.
- No application source files were supplied in this workspace. No project build, tests, deployment, or Git commit was run or claimed.

## Next entry

Append the first implementation milestone only after inspecting and modifying the actual project repository. Record exact files, commands, and results.


## 2026-11-13 evening — Codex-ready implementation package

- Added `GAMEPLAY_SPEC.md` with starting state, resource units, action costs, deterministic events, success/failure conditions, and a tested target path for Codex to implement and verify.
- Added `NASA_DATA_PLAN.md` centered on NASA LRO LOLA south polar illumination data, plus supporting radiation, power, life support, and crop sources.
- Added `CODEX_LAUNCH_PROMPT.md`, `TEAM_TASK_BOARD.md`, `AI_TOOLS_LOG.md`, and `SUBMISSION_DRAFT.md`.
- Updated `AGENTS.md`, `ARCHITECTURE.md`, `README_START_HERE.md`, and `CHECKPOINT.md` to use the extracted Windows folder as repository root and the `app/` subfolder for source code.
- Rebuilt and integrity-checked `APOAPSIS_CODEX_READY_BUNDLE.zip`.
- No application source code, build, test, deployment, local Dhaka portal registration, or video upload has been verified from this assistant workspace.

## 2026-11-13 22:40 Asia/Dhaka — Playable game built and verified

- Created the Vite application in `app/` with React 19, TypeScript, and plain CSS. Kept the control
  documents at the repository root.
- Implemented the pure simulation engine from `GAMEPLAY_SPEC.md`: five cycles, six actions, two
  deterministic events, secured and failed outcomes.
- Wrote 32 tests: 24 for the engine (including the documented balanced path totals) and 8 for save
  and restore. All pass.
- Built the full interface: title, briefing with site schematic and LOLA citation, dashboard,
  consequence report with per step explanations, debrief, and a sources screen.
- Added versioned `localStorage` resume for an unfinished mission, with validation and clearing at
  mission end.
- `npm run build` passes: 280 kB JS, 24 kB CSS after gzip 86 kB and 5 kB.
- Verified in Chrome: title, briefing, a full balanced playthrough, secured debrief with the expected
  totals, keyboard activation, resume after reload, and no console errors.
- Checked layout at 375, 800, 1280, and 1920 px. Fixed a cramped delta chip on narrow screens.
- Removed the temporary layout preview page used for viewport checks.
- Initialised Git at the repository root and committed the project as `e8f8591`.

## 2026-11-13 23:00 Asia/Dhaka — Video, documentation, and release preparation

- Installed `puppeteer-core` and ffmpeg/ffprobe binaries under `video/tools` (system ffmpeg was not
  available; the gyan build download was abandoned in favour of the npm packages).
- Wrote `video/tools/capture.mjs`, which records a real playthrough of the production build through
  the Chrome DevTools screencast, driving real mouse events and logging screen change timestamps.
- Wrote `video/tools/encode.mjs`, which builds a timed base video from the captured frames, cuts the
  selected shots, burns in captions, adds the end card, and reports each segment's timing.
- Rendered the end card from `video/tools/endcard.html` and exported
  `video/exports/apoapsis_outpost_zero_30s.mp4`: 25.2 s, 1280x720, 30 fps, H.264 with a silent AAC
  track, burned in captions, no third party footage or music.
- Documented the production in `video/README.md`, `video/script.md`, and
  `video/assets/attribution.md`.
- Added the project `README.md`, `LICENSE` (MIT), `.gitignore`, `netlify.toml`, a GitHub Pages
  workflow, `app/README.md`, and `HANDOFF_TO_NEXT_AGENT.md`.
- Added a favicon and social meta tags to `app/index.html`.
- Fixed the title screen, which offered "Resume mission" while always starting a new mission. It now
  says "Start mission"; a saved run still resumes automatically after a reload.
- Deployment, video upload, and the NASA Project form remain unverified and are the next actions.
