# APOAPSIS 30 Second Project Video Plan

**Project:** Outpost Zero  
**Team:** APOAPSIS  
**Challenge:** Build a Junior Astronaut Mission Trainer  
**Target:** A clear, polished 30 second video showing the real working game  
**Schedule:** Dhaka virtual Local Event, subject to the latest organizer instructions

## 1. Purpose

The video must prove that APOAPSIS built a working educational game. It should show a player making one meaningful decision, the game changing as a result, and a short explanation of the engineering trade off.

Do not spend the time on a long team introduction, a generic space montage, or a logo animation. The product should appear almost immediately. Every claim in the narration must match the actual version submitted.

## 2. Rules first

Before recording or uploading, verify the latest official instructions for the registered event, especially:

- Allowed video duration and format.
- Whether the video must be public or unlisted.
- Whether captions or spoken English are required.
- The required NASA Project page field and upload method.
- Any separate Dhaka Local Event upload process.

Official pages:

- https://www.spaceappschallenge.org/2026/
- https://www.spaceappschallenge.org/2026/challenges/build-a-junior-astronaut-mission-trainer/
- https://www.spaceappschallenge.org/2026/local-events/dhaka/?tab=schedule
- https://www.spaceappschallenge.org/resources/
- https://www.spaceappschallenge.org/legal/

The storyboard and export settings below are recommendations, not replacements for official requirements.

## 3. Thirty second storyboard

| Time | Footage | On screen text | Purpose |
|---|---|---|---|
| 0.0–2.5 s | Start on the real game screen with a clear resource pressure or mission problem. | **One outpost. Limited resources.** | Hook viewers with the actual challenge. |
| 2.5–6.0 s | Show the main dashboard and the resource values. A subtle highlight can guide the eye. | **Every choice has a cost.** | Show what the player manages. |
| 6.0–15.0 s | Record the player making a real decision. Keep the action, resource changes, and feedback visible. | Use short labels that match the actual result, such as **Food ↑ / Power ↓** only if those values truly change that way. | Provide proof of interaction and cause and effect. |
| 15.0–21.5 s | Show the “Why this mattered” explanation and a source note. | **Understand the trade off.** | Communicate the learning value. |
| 21.5–26.0 s | Show the mission debrief and a real success, struggle, or failure state. | **Play. Decide. Learn.** | Demonstrate a complete game loop. |
| 26.0–30.0 s | Simple end card with the project name and team identity. | **Outpost Zero · APOAPSIS** | Finish cleanly. Include the demo URL only if readable and allowed. |

Edit for timing if the real game takes longer to demonstrate. A visible and truthful cause and effect is more important than matching a storyboard exactly.

## 4. Draft voiceover

Record only after the game works, then adjust the script to the real footage.

> A lunar outpost has no easy choices. In Outpost Zero, students manage power, water, food, and life support. Choose an upgrade and watch the trade offs unfold. Each result explains why it happened, with learning notes linked to NASA sources. APOAPSIS built Outpost Zero to make mission engineering tangible, one decision at a time.

Speak naturally and leave room for the screen to communicate. Shorten the script if the narrator must rush. Captions must match the narration exactly.

## 5. Production workflow

### Step 1: Select a repeatable demo

Choose one scenario that reliably shows a resource problem, an action, a measurable effect, and the explanation of the trade off. Record a backup take. Do not change source code or composite fake values simply to make the video look dramatic.

### Step 2: Capture the product

- Record the actual, tested browser build at a stable resolution.
- Hide notifications, private information, browser clutter, terminals, and any API keys.
- Use a consistent zoom level and cursor speed.
- Keep the resource values and decision result readable at phone size.
- Capture the screen at a frame rate supported by the chosen editor and export format.

### Step 3: Gather supporting media only if needed

Use the product's own UI as the primary visual. If external images or clips add real context, use NASA material permitted under the current media rules or another asset with a verified reuse licence. Do not use random search result images as if they were automatically free to reuse.

For every outside asset, record the title, original URL, creator or organization, licence or usage note, and where it appears in the video in `video/assets/attribution.md`. Avoid unlicensed music, stock footage, and third party animations. Do not use NASA insignia or wording that implies NASA endorses the team.

### Step 4: Edit with the simplest reliable workflow

First inspect the tools already installed. Use a familiar editor or FFmpeg for trimming, resizing, joining, and encoding if available. A code based timeline such as Remotion is an option only when it clearly saves time or improves consistency without putting the app or submission deadline at risk. Do not install several editors or spend hours learning a new workflow.

Editing standards:

- Cut directly to the game.
- Use only a few subtle transitions.
- Zoom or highlight only to clarify a meaningful resource change.
- Keep captions short, high contrast, and away from important UI elements.
- Use narration as the primary audio. Music is optional and must be licensed and quiet.
- Avoid glitch effects, excessive lens flares, fake interface overlays, and distracting motion.
- Keep every clip honest to the submitted product.

### Step 5: Export and verify

Follow the official video specifications. If they do not specify a different format, MP4 with H.264 video at 1080p is a sensible default, not an official rule. Keep the duration at or below the permitted limit.

If available, use `ffprobe` to inspect duration, resolution, video codec, and audio. Watch the entire exported file. Check for:

- Runtime outside the permitted limit.
- Unreadable or misspelled captions.
- Clipped narration, uneven volume, or silent audio.
- Blank frames, stutters, or accidental screen transitions.
- Resource changes that do not match the actual game.
- Small text, cursor obscuring information, or content hidden by captions.
- URLs or shared video permissions that prevent judges from opening the video.

Keep the editable project, source captures, attribution notes, and final export in durable storage. Do not leave the only copy in a temporary editor folder.

Suggested folders, if no existing structure is in place:

```text
video/
  storyboard.md
  script.md
  assets/
    attribution.md
  captures/
  edit-project/
  exports/
    apoapsis_30s.mp4
```

Do not put huge raw footage or temporary renders into the source repository unless the team has deliberately chosen to version those files. Back them up separately and record their location in the checkpoint.

## 6. Dhaka virtual schedule

All times are Bangladesh time (Asia/Dhaka). The Dhaka Local Event site describes the event as fully online on 13–14 November 2026. The team dashboard screenshot shows the Local Event as Dhaka.

- **Friday, 13 November, 6:30 PM:** The schedule supplied by the team lists a local YouTube-folder video checkpoint. This deadline has passed as of the latest plan update (Friday evening). If APOAPSIS did not upload, contact the Dhaka Local Lead immediately and ask whether late upload is accepted. Do not claim that the upload is complete without proof.
- **Saturday, 14 November, 9:00 AM:** The schedule supplied by the team lists the final 30-second video upload to the NASA website. The global NASA Project form also opens at this time. Upload the final video through the official Project page and verify the video link or preview.
- **Saturday, 14 November, 2:00 PM:** The supplied Dhaka schedule lists final judging. Follow the virtual judging instructions from the Local Lead; do not assume an in-person presentation applies to this team.
- **Sunday, 15 November, 11:59 PM local time:** Global NASA Project submission closes. Keep this deadline for completing or correcting the official Project page, but do not treat it as an extension of a local judging deadline.

The four-minute “240 Seconds of Glory” presentation is treated as in-person only and is not an APOAPSIS deliverable based on the team's explicit guidance for virtual participants. If the Local Lead sends a new instruction that clearly applies to virtual teams, record the change in `DECISIONS.md` before reallocating time.

## 7. Final sign off checklist

- [ ] The video follows current official requirements.
- [ ] The game appears in the first few seconds.
- [ ] One real decision and its real consequence are visible.
- [ ] The explanation connects the decision to a learning outcome.
- [ ] Spoken and written claims match the app.
- [ ] NASA references and third party asset usage are recorded.
- [ ] No unlicensed audio, footage, or imagery is present.
- [ ] Captions are accurate and readable on a phone.
- [ ] The exported file has been watched in full and its duration checked.
- [ ] The team saved the editable project and final video in two durable locations where practical.
- [ ] The upload permissions have been tested without relying on the uploader's logged in account.
- [ ] The local folder upload is complete if required.
- [ ] The NASA Project page upload is complete and submission proof is saved.

## 8. When editing or usage time runs low

Stop adding effects and return to the essential proof: actual game, actual decision, actual consequence, brief learning note, project identity. Use the checkpoint routine in `AGENTS.md`. Save the edit project, last usable export, source capture location, audio file, asset attributions, and the exact remaining edits in `CHECKPOINT.md`. A clear, honest video beats an ambitious unfinished edit.
