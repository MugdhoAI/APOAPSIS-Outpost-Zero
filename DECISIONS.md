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
