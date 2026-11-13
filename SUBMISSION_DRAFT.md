# NASA Project Submission — Working Draft

**Project title:** Outpost Zero
**Team:** APOAPSIS (three participants, Dhaka Local Event, online)
**Selected challenge:** Build a Junior Astronaut Mission Trainer
**Status:** Draft written against the finished build. Replace the bracketed links with verified
URLs, and do not submit while any placeholder remains.

## One sentence summary

Outpost Zero is a short browser game that helps students feel how power, water, oxygen, food, and
radiation protection compete for the same limited reserves in a lunar outpost.

## Project description

Outpost Zero puts the player in charge of a fictional lunar south polar outpost for five cycles.
Each cycle the player commits one action out of six: service the solar arrays, thicken the regolith
shelter, service the water processor, overhaul the oxygen generator, run a greenhouse cycle, or
ration the crew's food. Every action spends stored reserves, and then the cycle settles power
generation, upkeep, and any scripted event.

The consequence report is the heart of the game. It shows the value of each system before and after
the cycle, then breaks the change into ordered steps: the action's own effect, the power balance,
crew upkeep, and the event. A short explanation says why the trade off happened, and a labelled
source note ties it to NASA material. A solar particle event before cycle 2 and a dust deposit on
the array before cycle 4 make the same lesson concrete: protection and maintenance are cheaper
before the problem arrives.

After five cycles the mission ends as secured, at risk, or failed, and the debrief shows final
values, the objectives met or missed, the costliest choice, and two takeaways with their sources.
Students can replay immediately and compare runs, because events are deterministic.

## Challenge response

The challenge asks for a trainer that lets students run a lunar or Martian outpost and balance the
systems that keep a crew alive. Outpost Zero does that in a form a first time player can finish in a
few minutes:

- **All five systems in the challenge are playable:** power, water, oxygen, food, and radiation
  protection, with crew condition as the outcome that the others protect.
- **The decisions genuinely compete.** The greenhouse lifts food by 18 FU while spending 11 PU and
  7 WU, so feeding the crew costs the systems that keep them breathing. Servicing the array costs 8
  PU now for 5 PU more generation in every later cycle, which only pays back if enough cycles remain.
- **The learning is visible, not implied.** Each result is explained in the same order every turn, so
  a teacher can pause on any line and ask why.
- **The science is traceable.** Every science note carries a NASA fact, data derived, or game
  assumption label and links to the source entry, including its limitation.
- **Failure is a lesson, not a dead end.** Emptying a reserve ends the mission early with an
  explanation of what ran out and which actions spent it.

## NASA data and resources used

- Lunar Polar Illumination (LOLA) data products, NASA GSFC:
  https://pgda.gsfc.nasa.gov/products/69 — site context and the power planning note. The game does
  not convert the maps into game values; the maps inform why site and array upkeep matter.
- Mazarico et al. 2011, Icarus 211, 1066-1081: https://doi.org/10.1016/j.icarus.2010.10.030 — the
  citation NASA asks users of the illumination maps to include.
- LRO CRaTER calibrated energy data, NASA PDS:
  https://pds.nasa.gov/ds-view/pds/viewBundle.jsp?identifier=urn%3Anasa%3Apds%3Alro-crater&version=1.6
  — radiation environment context for the cycle 2 event. Cited, not downloaded or processed.
- Space radiation effects, NASA SRAG: https://srag.jsc.nasa.gov/spaceradiation/how/how.cfm — why
  shielding is planned before the crew needs it.
- Moon Base Systems, NASA: https://www.nasa.gov/moonbase-systems/ — power generation, storage, and
  maintenance context.
- Lunar Surface Technology, NASA: https://www.nasa.gov/lunar-surface-technology/ — dust mitigation
  and regolith construction context.
- Deep Space Habitation Overview, NASA:
  https://www.nasa.gov/humans-in-space/deep-space-habitation-overview/ — linked life support.
- Space Crops, NASA Science: https://science.nasa.gov/biological-physical/space-crops/ — the
  greenhouse action.

All resource values, thresholds, event effects, and probabilities are game units and teaching
assumptions. They are not NASA engineering measurements, and the project is not affiliated with or
endorsed by NASA.

## What's innovative or useful

Most resource games show bars that go up and down. Outpost Zero explains the mechanism: the same
reserve that buys an improvement is the reserve that keeps the crew alive, and the report decomposes
every number into an ordered cause. That makes the trade off discussable in a classroom instead of
merely felt, and it gives a teacher a concrete follow up question after each cycle: what would you
protect first if you played again?

## AI tools used

See `AI_TOOLS_LOG.md`. Short version: ChatGPT and Codex CLI helped plan and specify; an OpenCode
agent running DeepSeek V4.1 Flash Free implemented and tested the application and prepared the video
from real gameplay. The team owns the rules, the review, the source checks, and the submission.

## Public links

- Live demo: [ADD VERIFIED PUBLIC URL]
- Source repository: [ADD VERIFIED PUBLIC REPOSITORY]
- 30-second video: [ADD PUBLIC VIDEO URL]
- Additional documentation: [ADD IF REQUIRED]

## Final claim check

- [x] The game is playable from a clean start to a clear ending; verified in Chrome.
- [x] The balanced path totals in the spec are asserted by tests.
- [x] The production build succeeds (`cd app && npm run build`).
- [x] The video is 25.2 s, MP4/H.264 1280x720, and comes from the real build.
- [ ] The live URL opens in a private window without sign-in.
- [ ] The repository URL opens without an access request, if public submission is intended.
- [ ] The video link plays without login restrictions.
- [ ] The description matches the deployed build after the final commit.
- [ ] Every source link above opens.
- [ ] All three teammates appear on the submitted project page.
- [ ] No placeholders remain.
- [ ] Submission confirmation is saved and recorded in `CHECKPOINT.md`.
