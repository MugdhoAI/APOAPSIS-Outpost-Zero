# 30 second project video

**File:** `exports/apoapsis_outpost_zero_30s.mp4`
**Duration:** 25.2 s (limit is 30 s)
**Format:** MP4, H.264 High, 1280x720, 30 fps, AAC silent track, about 1.3 MB
**Captions:** burned in, so the video works with sound off
**Narration:** none. There is no soundtrack and no unlicensed audio.

## What the footage is

Every frame comes from the production build of the game (`app/dist`) served locally, driven by
scripted mouse input through Chrome DevTools Protocol. Nothing was edited in the page, no value
was changed in the code, and no UI state was mocked. The only post production work is cutting
between real screens, adding captions, a fade, and the end card.

The run recorded is the documented balanced path from `GAMEPLAY_SPEC.md`: solar service, shelter,
water recovery, oxygen generator, greenhouse. It ends in "Mission secured" with 66 / 100 and the
final values 28 PU, 40 WU, 53 OU, 51 FU, 52 RPI, 95 CCI.

## Shot list

| In | Out | Shot | Caption |
| --- | --- | --- | --- |
| 0.0 | 2.6 | Title screen with the mission summary and Start mission | One outpost. Five cycles. One decision at a time. |
| 2.6 | 5.1 | Briefing: systems, goal, order of a cycle | Four crew, six systems, one shared budget. |
| 5.1 | 7.5 | Cycle 1 dashboard: the five reserves, crew condition, decision cards | Every action spends a reserve the crew needs. |
| 7.5 | 11.4 | Cycle 5 dashboard, greenhouse card highlighted and committed | Cycle 5: the last decision of the mission. |
| 11.4 | 13.4 | Consequence report: action, trade off sentence, before and after table | Food rises. Power and water fall. |
| 13.4 | 15.4 | Report: the resource table with per change chips | The report itemises each change and its cause. |
| 15.4 | 17.8 | Report: the three resolution steps and the "Why this mattered" note with its NASA source | Then it explains why, with a NASA source. |
| 17.8 | 20.2 | Debrief: Mission secured, 66 / 100, final state, objectives | Five cycles end in a clear debrief. |
| 20.2 | 22.2 | Debrief: the two takeaways with their source labels | Two takeaways, each with its source. |
| 22.2 | 25.2 | End card: project name, team, challenge, disclaimer | none |

The cuts skip the three cycles between the first dashboard and the final decision. No cycle is
shown out of order and no result is fabricated; the caption marks the jump to cycle 5.

## How to rebuild it

Requirements: Node.js 22 or newer, Google Chrome, and the packages in `tools/package.json`
(`puppeteer-core`, `@ffmpeg-installer/ffmpeg`, `@ffprobe-installer/ffprobe`).

```bash
cd app && npm run build && npm run preview -- --port 4173   # production build
cd video/tools && npm install
node capture.mjs    # real playthrough, writes capture/frames and capture/timeline.json
node endcard.mjs    # renders the end card from endcard.html
node encode.mjs     # cuts, captions, end card, writes ../exports/apoapsis_outpost_zero_30s.mp4
```

`encode.mjs` prints each segment's source and output time and refuses to cut past the captured
footage. The capture and encode folders are excluded from Git; only the source scripts, the end
card, and the exported MP4 are committed.

## Checks done on the export

- `ffprobe`: duration 25.2 s, 1280x720, 30 fps, H.264 video, AAC audio stream present.
- Frames sampled every second and inspected for correct cuts, readable captions, and no black or
  blank section other than the intended fade in and fade out.
- Caption text proofread against the screens shown.
- No personal information, browser chrome, or desktop content appears; the capture is headless.

## If the team wants a narrator

`script.md` has a 72 word voiceover that fits the 25 second cut with room to breathe. Record it,
then either replace the silent track or add it under the captions. Keep the captions either way:
judges frequently watch submissions muted.
