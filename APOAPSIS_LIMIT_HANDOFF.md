# APOAPSIS — Agent Usage Limit Handoff

**Purpose:** Resume the existing Outpost Zero project after the OpenCode / model free usage limit is reached. Do not restart the project or discard existing work.

## 1. Project location

Windows workspace:

`C:\NasaProject\APOAPSIS_CODEX_READY_BUNDLE`

The user has already extracted the APOAPSIS Codex-ready project bundle into this directory. Continue in this repository and preserve the existing implementation.

## 2. Usage limit status

The screenshot supplied by the user on November 13, 2026 shows:

- OpenCode free usage limit reached.
- UI states the free usage resets on **November 14, 2026 at 6:41 AM** (the timezone displayed by the user's local application; confirm from the UI when resuming).
- The session displays `Used 83 Execute, Read, Shell, Edit, Grep` and `2 shells`.
- The session's last stated next action was: **"re-run the dashboard contrast check from a clean state."**

Do not assume the usage reset automatically resumes the session. Reopen the existing project directory and inspect its state first.

## 3. Last known technical observations from the previous agent session

These are observations visible in the user's screenshot. Revalidate them before relying on them:

- Chrome executable: `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- No system-level FFmpeg executable was found by the previous session.
- `video/tools/node_modules/` exists inside the project.
- NASA domain resolution was mixed: `core2.gsfc.nasa.gov` was DNS-blocked, while `pdga.gsfc.nasa.gov`, `nasa.gov`, `srag.jsc.nasa.gov`, `science.nasa.gov`, and `www.nasa.gov` resolved.
- Video timeline markers are stored in `video/tools/capture/timeline.json`.
- `video/tools/encode.mjs` refuses cuts beyond captured footage and warns about overlapping timeline markers. Do not bypass these safeguards to force an export.
- `video/tools/capture/` and `video/tools/node_modules/` are ignored by Git.
- The exported MP4 is committed to Git according to the previous session's note. Verify its existence and commit history.
- Browser automation guidance recorded by the previous agent: use `tools.browser.evaluate` with `{ tabID, script }`; click decision cards by evaluating the text of `button.decision-card`, not by using references. Verify the current tool API before use.

## 4. Mandatory resume procedure

Before editing anything:

1. Open PowerShell.
2. Run `Set-Location 'C:\NasaProject\APOAPSIS_CODEX_READY_BUNDLE'`.
3. Run `git status --short --branch`.
4. Run `git log -5 --oneline --decorate`.
5. Run `git diff --stat` and inspect untracked files.
6. Read `AGENTS.md`, `CHECKPOINT.md`, `WORK_LOG.md`, `DECISIONS.md`, `HANDOFF_TO_NEXT_AGENT.md` if present, plus the video timeline and relevant video scripts.
7. Confirm no secrets or `.env` files would be added to Git.
8. Confirm the latest exported MP4 and its duration/playback before making assumptions about the video being complete.

Do not run `git reset --hard`, `git clean -fd`, overwrite files, or discard uncommitted changes.

## 5. Preserve work before changing it

If there are uncommitted changes, inspect and preserve them. Do not blindly stage secret files, local environment files, node_modules, or large raw capture directories. Review `.gitignore` and `git status` first.

After verifying the current state, create a clear checkpoint commit if appropriate. If a Git remote is configured and the user has authorized its use, push the checkpoint. Otherwise keep a local commit and create a portable backup without including secrets or unnecessary dependencies.

Update these files with verified information:

- `CHECKPOINT.md`
- `WORK_LOG.md`
- `HANDOFF_TO_NEXT_AGENT.md`

Include the current branch, latest commit, clean/dirty working tree state, completed work, test evidence, known blockers, exact next step, and commands to resume.

## 6. Immediate next task

The last recorded next action was to **re-run the dashboard contrast check from a clean state**.

Resume this task only after inspecting the current implementation and browser state:

1. Ensure the app starts successfully from the repository's documented command.
2. Use a clean browser state without deleting project files or application data needed by the user.
3. Inspect dashboard text, muted text, buttons, cards, focus states, disabled states, and overlays against the approved `DESIGN_SYSTEM.md`.
4. Fix contrast issues without changing unrelated layout or gameplay behavior.
5. Re-run the check and record concrete evidence.

Then continue the next incomplete milestone in `CHECKPOINT.md` and the project execution instructions. Do not repeat completed work.

## 7. Video-specific rules

- Keep the 30-second virtual-team video as the required video deliverable for APOAPSIS.
- Do not produce the in-person four-minute “240 Seconds of Glory” presentation unless the Dhaka Local Lead explicitly changes the requirement.
- Inspect `video/tools/capture/timeline.json` before encoding.
- Ensure every cut is within the recorded footage duration and timeline markers do not overlap.
- Do not claim the video is final until the MP4 has been exported, opened, played through, and checked for duration, aspect ratio, audio, and visible content.
- Confirm the separate Dhaka YouTube-folder upload instructions with the organizers if the local checkpoint was missed. Do not invent a replacement upload route.

## 8. Continuation prompt for the next agent

> Continue the existing APOAPSIS Outpost Zero project in `C:\NasaProject\APOAPSIS_CODEX_READY_BUNDLE`. Do not recreate the repository or overwrite existing work. First inspect `git status`, recent commits, diffs, untracked files, `AGENTS.md`, `CHECKPOINT.md`, `WORK_LOG.md`, `DECISIONS.md`, and this handoff file. Confirm the actual current implementation and revalidate all technical observations. The previous session's last next action was to rerun the dashboard contrast check from a clean state. Preserve all existing work, avoid destructive Git commands, protect secrets, and update the checkpoint and work log after completing the next task. Follow the project instructions and prioritize a working, verifiable submission over unnecessary redesign.

## 9. Accuracy warning

This file records what was visible in one screenshot and what the previous agent stated. It is not proof that all files remain saved, all commits exist, DNS conditions are unchanged, or the video is valid. The next agent must inspect the actual repository and verify each item before acting.
