# Handoff to the next agent or teammate

Written 2026-11-13 23:00 Asia/Dhaka, after the game and the video were finished locally.

## Where things stand

| Item | State |
| --- | --- |
| Game code | Complete, in `app/`, tests pass, production build passes |
| Local production build | Verified in Chrome through `vite preview` |
| Public deployment | Not done. Needs a GitHub or Netlify account the team owns |
| 30 second video | Exported at `video/exports/apoapsis_outpost_zero_30s.mp4` (25.2 s) |
| Video upload | Not done. Destination for the Dhaka folder is still unknown |
| NASA Project form | Draft only, in `SUBMISSION_DRAFT.md` |
| Team registration checks | Not verified from this machine |

Nothing above should be described as published, uploaded, submitted, or endorsed by NASA until a
person has confirmed it.

## Read in this order

1. `AGENTS.md` — rules, writing style, and release requirements.
2. `CHECKPOINT.md` — current state and the next actions.
3. `GAMEPLAY_SPEC.md` — the game model the code implements.
4. `README.md` — what the project claims, with sources and limitations.
5. `app/README.md` — how to run, test, and deploy the application.
6. `video/README.md` — how the video was produced and how to rebuild it.

## Environment notes that cost time to learn

- Windows PowerShell blocks `npm.ps1`. Use `cmd /c "npm.cmd run build"` or `npm.cmd run test`.
- The repository root is `C:\NasaProject\APOAPSIS_CODEX_READY_BUNDLE`. The app lives in `app/`.
- Chrome is at `C:\Program Files\Google\Chrome\Application\chrome.exe`. The video tooling drives it
  through `puppeteer-core`; no Chrome download is needed.
- There is no system `ffmpeg`. The video scripts use the binaries from
  `@ffmpeg-installer/ffmpeg` and `@ffprobe-installer/ffprobe` inside `video/tools/node_modules`.
- `core2.gsfc.nasa.gov` did not resolve from this machine. Other NASA hosts did.
- `npm install` warns that esbuild's postinstall script was blocked by the npm allow script
  setting. Tests, the dev server, and the production build all work anyway.

## Rules that protect the submission

- Never present game units as NASA measurements. The interface labels every claim.
- Do not swap the site schematic for imagery unless the licence and source are recorded.
- Do not rebalance the game (costs, thresholds, event effects) without updating
  `app/src/game/engine.test.ts` and recording the playtest reason in `DECISIONS.md`.
- Do not add a backend, accounts, analytics, or a paid API. The static build is the submission.
- Keep the video honest: if the interface changes in a way a viewer would notice, recapture it.

Accessibility status: keyboard activation, visible focus, and live region announcements were checked
by hand, and a contrast audit of every visible text node on all five screens measured 6.02:1 or
better. A `prefers-reduced-motion` block at the end of `app.css` removes transitions and animations.
Do not lower a colour token without re-running that contrast check.

## The four remaining jobs, in priority order

1. **Publish.** Create the repository, push `master`, enable GitHub Pages with "GitHub Actions" as
   the source, wait for the deploy job, then open the URL in a private window and play two cycles.
   Record the URL, the commit hash, and the time in `CHECKPOINT.md`. Netlify also works and needs
   no configuration beyond the included `netlify.toml`.
2. **Upload the video.** Ask the Dhaka Local Lead for the current upload location if it is still
   unclear. Upload the exported MP4, confirm it plays from a signed out browser, and keep a
   screenshot of the confirmation.
3. **Submit.** Fill the NASA Project form from `SUBMISSION_DRAFT.md`, replace every placeholder with
   a verified link, and keep the confirmation page. The form closes Sunday 15 November at 11:59 PM
   local time.
4. **Rehearse.** Two minutes of walking a judge through one decision and one consequence is worth
   more than another feature. Use the same balanced path as the video so the numbers match.

## What a reviewer should check first

- Start a mission, choose "Run greenhouse cycle" in cycle 1, and read the consequence report. If the
  numbers and the explanation agree, the core loop is intact.
- Open the debrief and confirm the score explanation is present and honest.
- Resize to 375 px and confirm the action cards remain readable and tappable.
- Reload mid mission and confirm the dashboard returns instead of an empty title screen.
