# Current Checkpoint

- Updated at: 2026-11-13 23:00 Asia/Dhaka
- Stage: implementation complete, video exported, deployment and submission pending
- Branch: master
- Commit: e8f8591 (first commit, before the video, docs, and final polish; the next commit covers them)
- Current status: playable end to end, tests and build pass, 30 second video exported. Not yet
  deployed and not yet uploaded.

## Completed

- React + TypeScript + Vite application in `app/`, built from `GAMEPLAY_SPEC.md`.
- Pure simulation engine with 32 passing tests (24 engine, 8 persistence).
- Full interface: title, briefing, dashboard, consequence report, debrief, sources.
- Deterministic events in cycle 2 and cycle 4; secured, warning, and failed outcomes.
- NASA source registry (`app/src/data/sources.ts`) with a claim and a limitation per source; every
  in game science note shows a NASA fact, data derived, or game assumption label.
- `localStorage` resume for an unfinished mission, validated on load and cleared at mission end.
- Responsive layout checked at 375, 800, 1280, and 1920 px; keyboard activation and visible focus
  verified; production build opened and inspected.
- Project README, MIT licence, `app/README.md`, Netlify config, and a GitHub Pages workflow.
- 30 second video exported at `video/exports/apoapsis_outpost_zero_30s.mp4` (25.2 s, 1280x720,
  H.264, burned in captions). Captured from the real production build with a scripted playthrough.
- Video production notes, caption script, and asset attribution in `video/`.

## In progress

- Nothing in flight. The working tree has the video, documentation, and small polish changes
  waiting for the second commit.

## Not started

- Public deployment. No hosting credentials are available to this agent.
- Upload of the video to the Dhaka folder or the NASA Project page.
- Final NASA Project form fields, teammate confirmation, and submission proof.
- Optional: a downsampled LOLA raster derivative as a real map visual instead of the drawn schematic.

## Current architecture and important interfaces

- `app/src/game/types.ts`: `GameState`, `CycleReport`, `GameEvent`, `ActionId`, `ResourceKey`.
- `app/src/game/engine.ts`: `createInitialState`, `resolveCycle`, `getActionAvailability`,
  `getResourceWarnings`, `evaluateMission`, `findKeyTradeOff`, `diffResources`.
- `resolveCycle` is pure: it returns `{ ok: true, state, report }` or `{ ok: false, reason }` and
  never mutates its input. Turn order: action, power balance, upkeep, event, end check.
- `app/src/storage/persist.ts`: versioned save under `outpost-zero:save:v1`, discarded if invalid.
- Vite uses `base: "./"`, so the same `dist/` works on GitHub Pages, Netlify, or a subfolder.

## Verification

- Command: `cd app && npm.cmd run test`
  Result: pass. 32 tests, 2 files.
- Command: `cd app && npm.cmd run build`
  Result: pass. `tsc --noEmit` clean, bundle 280 kB JS and 24 kB CSS.
- Command: opened `http://localhost:4173/` (vite preview of `dist/`) in Chrome
  Result: pass. Title screen renders, favicon present, no console errors, no horizontal overflow.
- Command: scripted playthrough through Chrome DevTools (`video/tools/capture.mjs`)
  Result: pass. Balanced path reaches "Mission secured", 66 / 100, final values 28 PU, 40 WU,
  53 OU, 51 FU, 52 RPI, 95 CCI.
- Command: `ffprobe` on `video/exports/apoapsis_outpost_zero_30s.mp4`
  Result: pass. 25.2 s, 1280x720, 30 fps, H.264 plus AAC, 1.3 MB.
- Deployment: not run. No URL exists yet, so nothing about hosting is claimed.

## Known issues and blockers

- Deployment needs a GitHub or Netlify account the team controls. Steps are in `app/README.md`.
- The Dhaka local video folder link is still unknown to this agent; the team must confirm it.
- The video is 720p, not 1080p. The app layout is 1200 px wide, so a 1080p canvas would only add
  empty margin; 720p keeps the interface text larger. This is a deliberate choice, not an
  official requirement either way.
- Video has no narration; captions carry the story. `video/script.md` has a 72 word voiceover if a
  teammate wants to record one.
- `core2.gsfc.nasa.gov` does not resolve from this machine, so the LOLA preview imagery was not
  used. The game links the product page and cites Mazarico et al. 2011 instead.

## Important files changed

- `app/src/**` (application), `app/README.md`, `app/index.html` (favicon, social meta)
- `README.md`, `LICENSE`, `.gitignore`, `netlify.toml`, `.github/workflows/deploy-pages.yml`
- `video/README.md`, `video/script.md`, `video/assets/attribution.md`, `video/tools/*`
- `video/exports/apoapsis_outpost_zero_30s.mp4`

## How to run on a new laptop

1. Install Git and Node.js 22 or newer.
2. Clone the repository and open the root folder.
3. `cd app`
4. `npm ci`
5. `npm.cmd run dev` (Windows PowerShell blocks `npm.ps1`) or `npm run dev` elsewhere.
6. `npm.cmd run test` and `npm.cmd run build` before making a claim about the build.
7. Read `AGENTS.md`, `HANDOFF_TO_NEXT_AGENT.md`, and this file before changing anything.

## Exact next actions

1. Create the public repository, push `master`, and enable Pages with source "GitHub Actions".
2. Open the published URL in a private window, play one cycle, and record the URL and timestamp.
3. Upload the video to the Dhaka folder named by the Local Lead, then to the NASA Project page.
4. Fill `SUBMISSION_DRAFT.md` into the Project form using only verified links, then save the
   confirmation screenshot.
5. Optional polish if time remains: LOLA raster derivative, one more playtest pass with a student.

## Continuation prompt

Read `AGENTS.md`, `engineering_skill.md`, `GAMEPLAY_SPEC.md`, `HANDOFF_TO_NEXT_AGENT.md`, and this
checkpoint. Inspect `git status`, `git log --oneline -5`, and the current branch before editing.
The game is complete and tested; do not rebuild the architecture or rebalance the numbers without
playtest evidence recorded in `DECISIONS.md`. The remaining work is deployment, the video upload,
and the NASA Project form. Verify every link before putting it in the submission, and update
`CHECKPOINT.md` and `WORK_LOG.md` when a milestone lands.
