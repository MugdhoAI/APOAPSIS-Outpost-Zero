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

## 2026-11-13 23:09 Asia/Dhaka — Contrast audit and teacher notes

- Re-ran the contrast audit from a clean state (`localStorage.clear()`, reload, Start mission,
  Enter outpost) on the production build at `http://localhost:4173`. Measured every visible text
  node against its resolved background on five screens: title (18 nodes, 6.38 to 17.59), dashboard
  (109 nodes, lowest 6.38), consequence report (65 nodes, lowest 6.38), debrief (94 nodes, lowest
  6.3), sources (77 nodes, lowest 6.02). Every ratio clears its WCAG AA target. The only reported
  failure was a `.sr-only` label, which is clipped to a 1x1 box and not visible; the audit now
  skips it.
- Confirmed no application source changed after commit `e8f8591`, so the exported video still
  matches the code in the repository.
- Added a "Using it with a class" section to `README.md` with a four step lesson sequence and two
  discussion questions. Both questions use values from `constants.ts` (12 PU for +20 RPI against a
  32 RPI start and a 50 RPI threshold; 8 PU for +5 PU per cycle against a 5 or 2 PU dust penalty) and
  were checked against `content.ts` and `engine.ts`. The section is documentation only, so the
  recorded video is unaffected.

## 2026-11-13 23:36 Asia/Dhaka — Repository backup and independent verification

- OpenCode reached its free usage limit. The team committed the remaining work as `900f1b5` and
  pushed `master` to the new private GitHub repository `MugdhoAI/APOAPSIS-Outpost-Zero`. Push
  verified from the laptop: branch up to date with `origin/master`, working tree clean.
- A second agent (Muse) took over from `APOAPSIS_LIMIT_HANDOFF.md`, pulled the repository through
  the GitHub connection, and independently re-ran the recorded checks on a clean install:
  `npm ci` (102 packages), `npm test` (32 of 32 pass), `npm run build` (pass; 280.41 kB JS,
  24.24 kB CSS, matching the sizes recorded earlier).
- Downloaded the exported MP4 from the repository and verified the actual bytes: 1,263,151 bytes,
  25.2 s, 1280x720 at 30 fps, H.264 plus AAC. A frame at 12 s shows the cycle 5 consequence
  report with the balanced path values (28 PU, 40 WU, 53 OU, 51 FU, 52 RPI, 95 CCI) and the
  burned in caption, so the video matches the shipped game.
- Still outstanding: public deployment (hosting decision and, for GitHub Pages, the user's
  explicit approval to make the repository public), the Dhaka video upload after the missed
  Friday checkpoint, and the NASA Project form, which opens 2026-11-14 09:00 local.

## 2026-11-13 23:47 Asia/Dhaka — Voiceover added to the 30 second video

- The exported video had captions but a silent audio track. At the team lead's request, Muse
  generated the voiceover from the team's own script in `video/script.md`, word for word, with an
  AI text to speech voice, and disclosed it in `AI_TOOLS_LOG.md`.
- The five sentences were timed to the video following the script's timing notes: voice starts at
  0.4 s, the food store line lands while the cycle 5 report is on screen, a pause covers the
  itemised table, and the voice ends at 22.0 s so the end card stays silent.
- The narration was mixed in without touching the picture (video stream copied, not re-encoded).
  Final file measures 25.2 s, loudness -14.6 LUFS, true peak -1.4 dB. A speech recognition pass
  over the finished audio recovered the full script in the right order as an intelligibility
  check, and the end card segment measures as silence.
- The voiced file is delivered to the team lead to commit from the laptop as
  `video/exports/apoapsis_outpost_zero_30s.mp4`, replacing the silent export under the same name
  (the silent version stays in Git history). The connector used by Muse cannot push binary
  files, so this one commit happens from the laptop after a `git pull`.

## 2026-11-14 00:02 Asia/Dhaka — Voiceover v2: warmer voice, captions matched to the audio

- The team lead found the first voice too blunt and robotic, and the original burned in captions
  described the scenes instead of matching the spoken words. Both are fixed in v2.
- The narration was regenerated with a warmer, casual text to speech voice. Its natural pace is
  slower, so long pauses inside the sentences were tightened and a mild pitch preserving time
  stretch (atempo 1.10) was applied to fit the same 0.4 to 22.0 s window.
- The old caption strip was covered with a black bar in the original caption style, and new
  captions show exactly the spoken words. Their timings come from a word level recognition pass
  over the finished audio, not from estimates.
- Verified: 25.2 s, loudness -14.7 LUFS, true peak -1.3 dB, end card silent and caption free, and
  frames checked at five timestamps show the caption on screen matching the words being spoken.
- The team lead pushes this file himself as `video/exports/apoapsis_outpost_zero_30s.mp4`.

## 2026-11-14 00:06 Asia/Dhaka — Deployed to Vercel and verified live

- The team lead chose Vercel over GitHub Pages and Netlify. The project was imported from the
  private GitHub repository with root directory `app`, the Vite preset, build command
  `npm run build`, output `dist`, and no environment variables, on the free Hobby plan.
- Production URL: https://apoapsis-outpost-zero.vercel.app/, deployed from master commit
  6aa5060. The build finished in about 20 seconds.
- Live verification on the production URL: the title screen rendered, Start mission opened the
  briefing and then the cycle 1 dashboard with the correct starting values (Power 74, Water 62,
  Oxygen 64, Food 58, Radiation protection 32, Crew condition 100). The action Reinforce
  regolith shelter produced the correct consequence report (Power 74 to 59, Radiation
  protection 32 to 52, upkeep applied). An unauthenticated request from a separate machine
  returned HTTP 200, so the demo loads signed out.
- The live demo link is now filled in `SUBMISSION_DRAFT.md`. Still open: making the repository
  public and filling its link, the video uploads, and the NASA Project form (opens 09:00).

## 2026-11-14 00:18 Asia/Dhaka — Repository finished and made public

- An animated hero in the project's colours (near black, teal accent, moon and outpost scene)
  was added at `assets/outpost-zero-hero.svg`, and the README opening was rebuilt around it:
  centred hero, badges, live demo and video links, one line summary. The body of the README
  was already precise and was kept.
- The About section now carries the description, the live demo as the website, and 12 topics.
- The team lead removed nine process files (launch and handoff prompts, task board, internal
  plans) in commit fcee4cf, leaving 19 root entries: source, licence, and the substantive
  project documents only.
- Release v1.0.0 was published as a pre-release on master, then the repository was made public
  with the team lead confirming GitHub sudo mode. The public page was read back from outside
  the account: visibility Public, hero and badges rendering, release listed.
- `SUBMISSION_DRAFT.md` now has both the live demo and the source repository links. Only the
  public video URL placeholder remains, plus the video uploads and the Project form.