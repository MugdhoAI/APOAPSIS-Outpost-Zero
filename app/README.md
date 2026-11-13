# Outpost Zero — application

The playable build. React 19, TypeScript, Vite 7, plain CSS. No backend, no runtime
network calls, no analytics.

For the project story, NASA sources, and limitations, read the repository `README.md`.

## Commands

```bash
npm ci          # install from the lockfile
npm run dev     # dev server on http://localhost:5173
npm test        # vitest: engine and persistence tests
npm run typecheck
npm run build   # tsc --noEmit then vite build into dist/
npm run preview # serve the production bundle locally
```

On Windows PowerShell, `npm.ps1` may be blocked by the execution policy. Use `cmd /c
"npm.cmd run build"` or `npm.cmd run dev` instead.

## Source layout

```text
src/game/types.ts       GameState, GameAction, GameEvent, CycleReport, ActionId
src/game/constants.ts   every tuning value: starting resources, costs, upkeep, thresholds
src/game/content.ts     action text, event text, cycle focus notes, learning takeaways
src/game/engine.ts      createInitialState, getActionAvailability, resolveCycle,
                        getResourceWarnings, evaluateMission, findKeyTradeOff, diffResources
src/data/sources.ts     NASA source registry; each record carries a claim and a limitation
src/storage/persist.ts  save/load/clear for an unfinished mission, with validation
src/components/         one file per screen or card
src/styles/tokens.css   colours, spacing, type scale
src/styles/app.css      layout and components, breakpoints at 1080, 820, 640, 420 px
```

### Simulation contract

`resolveCycle(state, actionId)` returns either `{ ok: false, reason }` when the action is
unavailable or unaffordable, or `{ ok: true, state, report }`. It never mutates its input, and
the same state plus action always produces the same result. The report contains the before and
after state plus a step list (decision, power balance, upkeep, event) so the interface can
explain each change instead of only showing totals.

Turn order is fixed and visible in the interface:

1. Pay the action cost, apply the action benefit.
2. Apply solar generation and base power demand.
3. Subtract water, oxygen, and food upkeep.
4. Resolve the cycle's scripted event.
5. Check for an emptied reserve or lost crew condition, then advance the cycle.

### Changing balance

All numbers live in `constants.ts` and `content.ts`. If you change a value, update the
expected totals in `src/game/engine.test.ts` in the same commit and record the reason with
playtest evidence in `../DECISIONS.md`. `GAMEPLAY_SPEC.md` is the current authority.

### Adding an action or an event

1. Add the entry to `constants.ts` (`ACTIONS` or `EVENTS`) and reference it by id.
2. Add its player facing copy to `content.ts`.
3. If the effect needs new logic, extend `resolveCycle` in `engine.ts` and keep it pure.
4. Add a test that covers the effect, including the unavailable or unaffordable path.
5. Check the consequence report shows the step, so the change is explained rather than implied.

## Save format

`localStorage` key `outpost-zero:save:v1`, written only while a mission is active and on the
dashboard or report screen. `parseSavedMission` validates the shape, the cycle range, and the
resource values before restoring; invalid or older payloads are discarded silently. Bump the
key suffix if the state shape changes, otherwise old saves are rejected by the validator.

## Accessibility notes

Every action is a real `button`, disabled actions keep their position and explain the reason,
focus styles are visible, cycles and status use text as well as colour, and screen readers get
an `aria-live` announcement after each decision. The mobile layout was checked at 375 px and
the desktop layout at 1280 px.

## Deployment

The bundle is static and uses relative asset paths (`base: "./"`), so it works at a domain
root or in a subfolder.

- GitHub Pages: `.github/workflows/deploy-pages.yml` builds, tests, and publishes `app/dist`
  on every push to `main`. Enable Pages with source "GitHub Actions" in the repository
  settings.
- Netlify: `../netlify.toml` sets base `app`, publish `dist`, and Node 22.
- Any other static host: run `npm run build` and upload the contents of `dist/`.

Check the published URL in a private window before submitting it anywhere.
