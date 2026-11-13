<p align="center">
  <img src="assets/outpost-zero-hero.svg?v=1" alt="Outpost Zero: keep the crew alive" width="100%">
</p>

<p align="center">
  <a href="https://apoapsis-outpost-zero.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-Play%20now-brightgreen" alt="Live demo"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/Tests-32%20passing-brightgreen" alt="32 tests passing">
  <img src="https://img.shields.io/badge/NASA-Space%20Apps%202026-navy" alt="NASA Space Apps 2026">
</p>

<p align="center">
  <strong>A five cycle survival trainer for a lunar south polar outpost.</strong><br>
  Built by team <strong>APOAPSIS</strong> for the
  <a href="https://www.spaceappschallenge.org/2026/">NASA Space Apps Challenge 2026</a> challenge
  <a href="https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/">Build a Junior Astronaut Mission Trainer</a>.
</p>

<p align="center">
  <a href="https://apoapsis-outpost-zero.vercel.app/"><strong>Play the live demo</strong></a> ·
  <a href="video/exports/apoapsis_outpost_zero_30s.mp4"><strong>Watch the 30 second video</strong></a> ·
  <a href="GAMEPLAY_SPEC.md"><strong>Gameplay spec</strong></a>
</p>

You command a fictional outpost near the lunar south pole. For five cycles you make one
decision each cycle, and every decision spends a reserve that keeps the crew alive. The
game shows what changed, why it changed, and which NASA reference supports the lesson.

## What the player does

1. Reads a short mission briefing and the site context.
2. Sees the six systems: power, water, oxygen, food, radiation protection, and crew condition.
3. Commits one action out of six for the cycle.
4. Watches the consequence report: costs, upkeep, event effects, and a plain language reason.
5. Reaches a secured, struggling, or failed outcome, then reads the debrief and can replay.

Two scripted events interrupt the run: a solar particle event before cycle 2 and a dust
deposit on the array before cycle 4. Both are deterministic, so a class can compare runs.

## Using it with a class

A run is five decisions and a debrief. The events are identical in every play, so two
students who choose differently can compare their final numbers directly.

1. Play one mission without explaining the systems first. Let the first consequence report
   do the teaching.
2. Ask where the spent points came from, and which system was quietly left alone.
3. Play a second mission that repeats one action every cycle, for example the greenhouse, and
   watch the run fail. Ask what the failure actually punished.
4. Compare the six final values in the debrief, then open the sources screen and read one note
   out loud.

Two questions that work with the numbers on screen:

- The particle event arrives before cycle 2 and takes 25 CCI from an unprotected crew, or 5
  with protection at 50 RPI. Start shielding is 32 RPI and one shelter action adds 20. What
  do those 12 PU buy, and what does the crew pay if the points go somewhere else?
- Servicing the array costs 8 PU once and raises generation by 5 PU in every later cycle. The
  dust event in cycle 4 removes 5 PU from an unserviced array and 2 from a serviced one. Do
  the repaired panels pay for themselves, and by which cycle?

## Run it locally

```bash
cd app
npm ci
npm run dev      # http://localhost:5173
npm test         # 32 engine and persistence tests
npm run build    # type check plus production bundle in app/dist
```

Node.js 22 or newer is recommended. No environment variables, API keys, or backend services
are needed. The built bundle is fully static and works from any static host, including a
GitHub Pages project subfolder, because Vite is configured with `base: "./"`.

## How the project is organised

```text
app/src/game/       pure simulation: types, constants, content, engine, tests
app/src/data/       NASA source registry with a claim and a limitation per source
app/src/storage/    versioned localStorage save and restore, validated on load
app/src/components/ screens: title, briefing, dashboard, report, debrief, sources
app/src/styles/     design tokens and layout
```

The simulation has no React imports, so the rules can be tested without a browser. Each
action's cost, benefit, and event effects live in one place, and every science note in the
interface points at an entry in `app/src/data/sources.ts`.

## Game rules in one table

| Cycle | Event | What the player usually faces |
| --- | --- | --- |
| 1 | none | Power and water both need attention, and only one can have it |
| 2 | solar particle event | Protection below 50 RPI costs the crew condition |
| 3 | none | Water recovery has to compete with oxygen generation |
| 4 | dust on the array | Generation drops, and a serviced array loses less |
| 5 | none | The last cycle decides whether thresholds are met |

The full model, including every number, is in `GAMEPLAY_SPEC.md`. The balanced reference
path (`solar`, `shelter`, `water recovery`, `oxygen generator`, `greenhouse`) finishes at
28 PU, 40 WU, 53 OU, 51 FU, 52 RPI, and 95 CCI, and the test suite asserts those totals.

## NASA sources used

| Source | Link | Used for |
| --- | --- | --- |
| Lunar Polar Illumination (LOLA) data products, NASA GSFC | https://pgda.gsfc.nasa.gov/products/69 | Why polar sites differ in sunlight, site context |
| Mazarico et al. 2011, Icarus 211 | https://doi.org/10.1016/j.icarus.2010.10.030 | Required citation for the LOLA illumination maps |
| LRO CRaTER calibrated energy data, NASA PDS | https://pds.nasa.gov/ds-view/pds/viewBundle.jsp?identifier=urn%3Anasa%3Apds%3Alro-crater&version=1.6 | Radiation environment behind the cycle 2 event |
| Space radiation effects, NASA SRAG | https://srag.jsc.nasa.gov/spaceradiation/how/how.cfm | Why shielding is planned before the crew needs it |
| Moon Base Systems, NASA | https://www.nasa.gov/moonbase-systems/ | Power generation, storage, and maintenance context |
| Lunar Surface Technology, NASA | https://www.nasa.gov/lunar-surface-technology/ | Dust mitigation and regolith construction context |
| Deep Space Habitation Overview, NASA | https://www.nasa.gov/humans-in-space/deep-space-habitation-overview/ | Linked life support: water recovery and oxygen generation |
| Space Crops, NASA Science | https://science.nasa.gov/biological-physical/space-crops/ | The greenhouse action and crop production note |

Every claim in the interface is labelled **NASA fact**, **Data-derived context**, or
**Game assumption**, and each label sits next to the source it comes from.

## What this is not

- Not a mission planning tool, a life support model, or a radiation dose model.
- Not affiliated with or endorsed by NASA. No NASA insignia is used.
- The outpost site is fictional. The illustration and the site schematic were drawn for
  this project and are labelled as illustrations, not NASA imagery.
- All resource values are game units on a 0 to 100 scale. Thresholds and event effects are
  teaching assumptions chosen so the trade offs stay visible in five short cycles.
- The CRaTER archive was cited, not downloaded or processed. The lunar illumination maps
  are used as context for the power lesson, not converted into game values.

## Storage and privacy

There are no accounts, no analytics, and no network calls at runtime. An unfinished mission
is saved in this browser's `localStorage` under `outpost-zero:save:v1` so a reload does not
lose progress. The save is deleted when a mission ends or the player returns to the title.

## Team and licence

Team APOAPSIS, three participants, Dhaka Local Event (fully online), 13 and 14 November 2026.
The team on GitHub: [All Asmaul Husnain](https://github.com/MugdhoAI) and
[Md. Tushar Ahmed](https://github.com/121tushar121-web).
Source is released under the MIT licence; see `LICENSE`.

Project documents: `GAMEPLAY_SPEC.md` (the full game model), `ARCHITECTURE.md`
(how the code is organised), and `AI_TOOLS_LOG.md` (which AI tools did what, and
what the team reviewed).
