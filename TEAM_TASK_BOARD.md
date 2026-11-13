# APOAPSIS Team Task Board

**Project:** Outpost Zero  
**Team size:** Three participants  
**Event:** Dhaka virtual Local Event, 13–14 November 2026

Use this as a lightweight work board. Put actual names next to owners before splitting work. Do not assume a teammate has accepted a task until they confirm.

## Priority 0 — Must be done

| Task | Suggested owner | Status | Evidence of completion |
|---|---|---|---|
| Verify NASA team has all intended members | Team lead | Not verified | Member list screenshot or page check |
| Verify Dhaka local portal registration and virtual channel | Team lead | Urgent | Portal confirmation / Local Lead response |
| Ask Local Lead about missed Friday 6:30 PM video-folder checkpoint, if missed | Team lead | Urgent | Written response and correct upload link |
| Inspect repo and initialize Git | Codex A + team lead | Done 13 Nov | First commit `e8f8591` on `master` |
| Scaffold the application | Codex A | Done | `app/` runs with `npm run dev` |
| Implement five-cycle game engine | Codex A | Done | 24 engine tests pass, spec totals asserted |
| Implement main dashboard and decision UI | Codex B | Done by Codex A | All screens verified in Chrome |
| Integrate LOLA data context and source cards | Research teammate + Codex | Done (schematic fallback) | Source screen, briefing citation, labelled notes |
| Finish a full playable run | Whole team | Done by agent, team replay pending | Recorded run in the video, balanced path tested |
| Deploy public demo | Team lead + Codex | Not started, needs team account | Public HTTPS URL opens in private window |
| Record and export 30-second video | Video owner + teammate | Done locally 13 Nov | `video/exports/apoapsis_outpost_zero_30s.mp4`, 25.2 s |
| Complete NASA Project page | Team lead | Not started | Submitted status / confirmation |

## Priority 1 — Quality improvements

- [x] Improve the mission briefing so the goal is understandable within 20 seconds.
- [x] Add an accessible mission history and debrief.
- [x] Cover the polar illumination context in the briefing. The NASA preview imagery is served from
  `core2.gsfc.nasa.gov`, which does not resolve from the build machine, so the game uses a labelled
  drawing plus the cited product page. See `DECISIONS.md`.
- [x] Test 375 px, 800 px, 1280 px, and 1920 px widths.
- [x] Test keyboard-only navigation and visible focus.
- [x] Add a science sources screen with a claim and a limitation for each source.

## Priority 2 — Only if the MVP is complete

- [x] Save and resume an unfinished mission in this browser.
- [ ] Optional second scenario or difficulty mode. Not planned; one strong scenario was the decision.
- [ ] Optional sound, subtle transitions, or advanced animation. Not planned.

Do not work on Priority 2 while any Priority 0 task is unfinished.

## Role split

### Person 1 — Team lead, integration, and submission

- Own event communication and registration verification.
- Own GitHub repository, merges, public deployment, and official NASA Project page.
- Run Codex A as the main integration agent.
- Keep `CHECKPOINT.md`, `WORK_LOG.md`, and `DECISIONS.md` accurate.

### Person 2 — Interface and visual design

- Own the mission dashboard, decision cards, responsive design, and player feedback.
- Run Codex B only on a separate branch and only after agreeing on shared types and component contracts with Person 1.
- Review UI changes in the actual browser.

### Person 3 — Science, playtesting, and video

- Verify NASA sources and asset reuse terms.
- Check science labels and game assumptions.
- Play the game using different strategies and record results.
- Own the video storyboard, recording, captions, attribution, export, and video upload checks.

All participants should understand the final game and be able to explain it. AI agents are contributors to the workflow, not registered team members.

## Two Codex account rules

1. Codex A is the integrator and owns the main branch.
2. Codex B works on a separate branch, never edits the same active files at the same time, and does not merge directly to `main`.
3. Define shared TypeScript interfaces before parallel UI and engine work.
4. Push work to the same authorized Git remote. If there is no remote, do not pretend the second laptop is synchronized; use a Git bundle or a reviewed archive.
5. Every handoff includes branch name, commit hash, changed files, test results, and exact next task.
