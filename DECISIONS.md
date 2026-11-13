# APOAPSIS Project Decisions

This file records decisions that affect future implementation. Update it when the team changes scope or architecture.

## D-001 — Build Outpost Zero as a lunar outpost game

**Status:** Accepted  
**Date:** 2026-11-13  
**Decision:** Build one short, replayable lunar outpost scenario first rather than separate Moon and Mars modes.  
**Reason:** A focused playable loop is more valuable and achievable within the active hackathon window than multiple unfinished scenarios.

## D-002 — Use a static client-side architecture for the MVP

**Status:** Accepted  
**Date:** 2026-11-13  
**Decision:** Use React, TypeScript, and Vite if the existing repository does not already have a suitable working stack. Keep simulation rules in pure TypeScript. Do not add a backend or database to the MVP.  
**Reason:** The challenge's core requirements are gameplay, trade-off learning, and an interactive interface. They do not require user accounts, shared data, or a remote service. Static hosting is cheaper, faster, and easier to hand off.

## D-003 — Keep game calculations separate from the UI

**Status:** Accepted  
**Date:** 2026-11-13  
**Decision:** React components display state and send actions; pure engine functions calculate outcomes and return the next state plus explanations.  
**Reason:** This makes resource effects testable, reviewable, and consistent.

## D-004 — Treat numerical gameplay values as educational abstractions

**Status:** Accepted  
**Date:** 2026-11-13  
**Decision:** Label invented resource amounts as game units and simplified indicators as indices. Do not present the simulation as a real lunar mission or radiation model.  
**Reason:** Protects scientific accuracy while still allowing students to experiment with meaningful choices.

## D-005 — Use the 30-second video, not the four-minute in-person pitch

**Status:** Accepted based on the team's explicit virtual-event guidance  
**Date:** 2026-11-13  
**Decision:** APOAPSIS prepares the 30-second project video. The four-minute “240 Seconds of Glory” presentation is not in the team's deliverables unless the Dhaka Local Lead explicitly changes the requirement for virtual participants.  
**Reason:** The team is participating virtually and has been instructed that the four-minute presentation is for in-person participants.

## D-006 — Preserve work through Git and durable checkpoints

**Status:** Accepted  
**Date:** 2026-11-13  
**Decision:** Use a shared authorized Git repository, milestone commits, `CHECKPOINT.md`, `WORK_LOG.md`, and a precise continuation prompt. Push before usage limits or laptop handoff whenever possible.  
**Reason:** Work must survive Codex quota limits and transfer to another teammate's laptop without relying on chat history.


## 2026-11-13 — Implementation-ready game model

**Decision:** Use the exact five-cycle model in `GAMEPLAY_SPEC.md` as the initial balancing contract. The starting resources, action costs, two deterministic events, success thresholds, and balanced example path are labeled as gameplay assumptions.

**Reason:** Codex needs one consistent, testable ruleset rather than inventing game math while implementing the interface.

## 2026-11-13 — NASA data integration

**Decision:** Use NASA's LOLA Lunar Polar Illumination product as the primary NASA data asset or map context. Cite NASA LRO CRaTER and supporting NASA radiation, power, life support, and space crop references. Do not claim to process CRaTER data unless the archive is actually downloaded and inspected.

**Reason:** The game must make NASA data use visible, accurate, and explainable without spending the limited hackathon window parsing a large scientific archive.

## 2026-11-13 — Repository layout

**Decision:** Treat `C:\NasaProject\APOAPSIS_project_control_bundle` as the repository root if no existing application repository is found. Keep project documents at the root and scaffold the Vite app under `app/`.

**Reason:** This preserves the extracted control bundle and avoids overwriting project instructions while creating the application.

## 2026-11-13 — Crew condition as a sixth resource, shown in the mission header

**Decision:** Model crew condition (`crew`, in CCI) as a resource in the state, but keep the five
required resource cards (PU, WU, OU, FU, RPI) and show crew condition in the mission summary.

**Reason:** `GAMEPLAY_SPEC.md` uses crew condition in the success test and in one action cost, so it
needs to be state, not decoration. Keeping the card grid at five matches the spec's dashboard and
the challenge's list of systems.

## 2026-11-13 — No hidden penalty for low but non empty reserves

**Decision:** Low and critical reserves produce warnings and colour changes only. The mission ends
when a reserve reaches zero or crew condition is lost, exactly as written in the spec.

**Reason:** The spec says penalties apply only "if defined". Inventing extra penalties would make the
game harder than the model the team agreed, and would be untestable against the documented path.

## 2026-11-13 — Transparent stability score and a named costliest choice

**Decision:** Report a score of 40 points for crew condition, 40 for the average of the four
consumable reserves, and 20 for protection, and state that formula in the debrief. Also name the
action that spent the most units rather than an undefined "most important trade off".

**Reason:** Judging and classroom use both need an explainable number. A formula the player can read
is honest; an unexplained score is not, and "most important" cannot be measured without inventing
weights.

## 2026-11-13 — Save only an unfinished mission, under a versioned key

**Decision:** Persist state to `localStorage` under `outpost-zero:save:v1` while a mission is active.
Clear it when the mission ends or the player returns to the title. Validate the payload on load and
discard anything that fails.

**Reason:** A judge or student who reloads mid mission should not lose the run, but keeping finished
missions would raise privacy and storage questions for no learning benefit. Validation keeps an old
or corrupted payload from breaking the app.

## 2026-11-13 — Drawn site schematic instead of a LOLA raster

**Decision:** Use an authored SVG schematic labelled "Illustrative schematic, drawn for this game",
next to the cited LOLA product page and its facts, instead of a downsampled illumination raster.

**Reason:** The LOLA previews are served from `core2.gsfc.nasa.gov`, which does not resolve from the
build machine, and naively reusing a NASA image risks implying endorsement. `NASA_DATA_PLAN.md`
allows this fallback as long as the context is cited and the illustration is clearly not data. A
raster derivative remains an optional enhancement, not a requirement.

## 2026-11-13 — The title screen always says "Start mission"

**Decision:** Remove the "Resume mission" label. A saved run still resumes automatically when the
page reloads, but the button text no longer changes.

**Reason:** The label was driven by state captured at mount, so after returning to the title it
claimed a saved run that had just been cleared, and clicking it started a new mission anyway. An
honest single label is better than a resume path that does not resume.

## 2026-11-13 — Video recorded from the build, 720p, captions instead of narration

**Decision:** Capture the 30 second video from the local production build with a scripted Chrome
playthrough, export at 1280x720 with burned in captions and a silent audio track, and publish a
voiceover script rather than synthesised speech.

**Reason:** The interface container is 1200 px wide, so a 1080p canvas would add margin, not detail.
Captions keep the video usable muted, and a synthetic narrator would weaken a submission that is
supposed to sound like three students explaining their own work. A teammate can record the scripted
voiceover later without re-editing the cuts.

## 2026-11-13 — MIT licence for the source

**Decision:** Release the source under the MIT licence with the team named as the copyright holder.

**Reason:** Public source is expected, and a permissive licence with no custom terms is the least
ambiguous option for judges and for anyone reusing the classroom material.

## 2026-11-14 — Host the demo on Vercel

**Decision:** Deploy the demo to Vercel from the private repository (root directory `app`, free
Hobby plan). GitHub Pages and Netlify remain prepared alternatives in the repo.

**Reason:** The team lead chose Vercel, where the team already has an account and another live
project. The demo went live and was played end to end within minutes, at
https://apoapsis-outpost-zero.vercel.app/, without waiting on the repository visibility change.

## 2026-11-14 — Narration added to the video, reversing the earlier no narration note

**Decision:** The team lead reversed the earlier preference against a synthetic narrator. The
30 second video now carries an AI text to speech reading of the team's own script in
`video/script.md`, with captions replaced to match the spoken words, disclosed in
`AI_TOOLS_LOG.md`.

**Reason:** The exported video had a silent audio track on the night before the submission
window, and no teammate recording was available. A teammate can still record the same script
later and replace the narration without re-editing the cuts, as the earlier note intended.
