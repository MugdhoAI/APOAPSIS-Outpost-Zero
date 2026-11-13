# APOAPSIS Security and Privacy Notes

**Project:** Outpost Zero  
**Security model:** Static educational browser game  
**Last reviewed:** 13 November 2026, Asia/Dhaka

## 1. Scope

The MVP is a client-side game hosted as static files. It does not need accounts, passwords, payments, a server, or a remote database. The safest and fastest design is to avoid collecting user information entirely.

This document sets minimum safeguards for the hackathon build. It is not a formal security audit or a claim that the application is suitable for safety-critical use.

## 2. Data and privacy

- Do not collect names, email addresses, phone numbers, precise location, school information, or other personal data in the game.
- Do not add sign-up, login, chat, user profiles, analytics, tracking pixels, or advertising for the MVP.
- Do not transmit game state to a remote service.
- If local progress saving is implemented, store only game state and preferences in the browser's `localStorage`.
- Explain local saving in the interface if it is not obvious.
- Provide a reset option that clears the game's saved state.
- Do not include participant contact information in the public repository, demo, video, or project description unless the team explicitly approves it and the submission requires it.

## 3. Secrets and configuration

- Never commit API keys, access tokens, passwords, private credentials, `.env` files, or browser session data.
- Treat every variable prefixed with `VITE_` as public because it can be embedded in the client bundle. Never place a secret in a Vite client environment variable.
- Do not add an API key merely to retrieve public NASA information. Prefer source links or data files that can be legally redistributed with attribution.
- If a future backend genuinely requires a secret, keep it in server-side environment configuration and document its name and purpose without recording its value.
- Add `.env*` to `.gitignore`, while allowing a safe `.env.example` containing placeholders only.

## 4. Browser security

- Use React's normal text rendering. Do not use `dangerouslySetInnerHTML` for game content.
- Do not execute downloaded scripts or embed untrusted HTML.
- Validate and constrain any values read from storage or URL parameters before using them.
- If external links open in a new tab, include `rel="noopener noreferrer"`.
- Avoid unnecessary third-party scripts, trackers, remote fonts, and embedded widgets.
- Do not expose development tools, debug routes, or internal stack traces in the production UI.
- Use HTTPS hosting.

## 5. Local storage safeguards

If local persistence is implemented:

1. Use a versioned key such as `outpost-zero:save:v1`.
2. Parse storage data inside error handling.
3. Validate the schema and numeric ranges before accepting it.
4. Treat invalid or old data as a recoverable save failure and start a fresh mission.
5. Never assume browser storage is available; the game must still run without it.
6. Do not store secrets or personal information.

## 6. Dependencies and supply chain

- Prefer a small dependency set and packages with active maintenance.
- Use the lockfile and reproducible install command (`npm ci` when using npm and a valid lockfile exists).
- Review a package's purpose, maintainership, licence, and install footprint before adding it.
- Run the package manager's vulnerability audit when available and practical. Review the findings; do not run force upgrades blindly during the hackathon.
- Do not install packages from unknown archives or execute scripts copied from untrusted sources.
- Commit dependency lockfile changes with the related code change.

## 7. Data, media, and attribution

- Treat external JSON, CSV, images, text, and links as untrusted input until inspected.
- Cite NASA datasets and publications accurately. Do not imply NASA has reviewed or endorsed the application.
- Record licences or usage notes for third-party images, sound, video, icons, fonts, and code.
- Do not copy assets from search results without checking their source and reuse rights.
- Avoid executable SVG or HTML supplied by untrusted sources; prefer raster images or reviewed local SVG assets.
- Label fictional or simplified game values as game units or model assumptions.

## 8. Git and release hygiene

Before each commit and before publishing:

- Inspect `git status` and the complete diff.
- Check for `.env`, credentials, personal data, editor caches, `node_modules`, and build output.
- Confirm `.gitignore` covers local secrets and generated directories.
- Do not make a repository public without the team's explicit approval.
- Ensure the production build contains no secrets or internal debug content.
- Open the public site in a private browser window and verify that it requests no login or private access.

## 9. Hosting safeguards

- Deploy only the production build.
- Use the provider's HTTPS default.
- Do not enable public write APIs or database rules because the MVP has no backend.
- If host-level security headers are supported without delaying delivery, use a restrictive Content Security Policy appropriate to the actual app. Do not paste an untested policy that breaks the app.
- Keep source maps private only if the team deliberately chooses to do so; do not confuse hidden source maps with actual protection of client code.

## 10. Threats and responses

| Risk | Required response |
|---|---|
| API key accidentally added to frontend | Remove it, rotate/revoke it immediately, inspect Git history and deployed bundles, then remove it from repository history if exposed. |
| Malformed local save crashes the game | Validate storage and recover to a fresh mission. |
| External asset has unclear rights | Do not use it; replace it with an original or clearly licensed asset. |
| Unsafe HTML or script content | Render as text; do not execute or inject it. |
| Private team information appears in public files | Remove it and replace with public project contact details only if needed. |
| New backend or third party service is proposed | Update the architecture and security review before implementation. |

## 11. Security acceptance checklist

- [ ] No accounts or personal data are collected.
- [ ] No secrets are stored in frontend source or committed files.
- [ ] `.gitignore` covers secrets and generated files.
- [ ] External content is rendered safely.
- [ ] Local storage is validated and optional.
- [ ] Dependencies are limited and lockfile is committed.
- [ ] Source and media attributions are recorded.
- [ ] The production site uses HTTPS and opens without authentication.
- [ ] Public repository and demo were checked for private information.
- [ ] The interface clearly states that the simulation is educational, simplified, and not an operational mission tool.
