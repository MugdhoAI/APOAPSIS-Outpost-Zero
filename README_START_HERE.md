# APOAPSIS Project Files — Start Here

**Project:** Outpost Zero  
**Challenge:** Build a Junior Astronaut Mission Trainer  
**Event:** Dhaka Local Event, online, 13–14 November 2026

## Your extracted folder

The user reports that this bundle was extracted to:

```powershell
C:\NasaProject\APOAPSIS_project_control_bundle
```

Use this folder as the **repository root** unless an actual existing application repository already exists elsewhere. The ZIP contains project instructions and documentation, not a finished application. The application has not been scaffolded yet.

Recommended structure:

- Keep all Markdown control documents in this folder.
- Create the Vite application in a subfolder named `app/`.
- Keep `.git/` at this folder's root so the docs and app share one Git history.

## Files in the control bundle

### Required engineering controls

- `AGENTS.md` — repository level instructions for coding agents.
- `ARCHITECTURE.md` — application structure and state flow.
- `DESIGN_SYSTEM.md` — visual tokens, components, accessibility, and responsive behavior.
- `SECURITY.md` — privacy, secrets, dependencies, browser safety, and release safeguards.
- `engineering_skill.md` — reusable engineering and writing workflow.
- `GAMEPLAY_SPEC.md` — exact first version of the five-cycle game, actions, resource model, events, and outcomes.
- `NASA_DATA_PLAN.md` — NASA data sources, practical integration steps, caveats, and attribution.

### Execution and delivery

- `CODEX_LAUNCH_PROMPT.md` — exact first instruction to paste into Codex CLI.
- `TEAM_TASK_BOARD.md` — three-person task split and two-agent coordination.
- `AI_TOOLS_LOG.md` — truthful AI use disclosure record.
- `SUBMISSION_DRAFT.md` — project submission text to finalize after implementation.
- `apoapsis_nasa_space_apps_2026_execution_plan.md` — event timeline and competition plan.
- `APOAPSIS_30_second_video_plan.md` — 30-second video storyboard and production workflow.
- `CHECKPOINT.md` — current state and continuation instructions.
- `WORK_LOG.md` — milestone record.
- `DECISIONS.md` — decisions affecting future work.

## Start Codex

Open PowerShell in the extracted folder:

```powershell
cd C:\NasaProject\APOAPSIS_project_control_bundle
codex
```

Paste the content of `CODEX_LAUNCH_PROMPT.md` into Codex CLI. It tells Codex to inspect the folder, initialize Git if needed, scaffold `app/`, implement the first playable slice, then continue through the five-cycle game. It explicitly says not to overwrite control documents or assume the project already contains source code.

## Critical event checks

The official NASA global Project page opens on Saturday, 14 November at 9:00 AM local time and closes Sunday, 15 November at 11:59 PM local time. Current Navigator guidance says the demo can be a video of 30 seconds or less or up to seven slides; the Dhaka virtual schedule supplied by the team calls for the 30-second video. Follow the stricter local requirement and check the live Project Submission Guide.

The Dhaka local event portal describes a separate team registration process. The NASA dashboard screenshot confirms that the team selected Dhaka but does not prove that this separate local portal form has been completed. Check it immediately and contact the Local Lead if registration or the Friday video-folder checkpoint is unresolved.
