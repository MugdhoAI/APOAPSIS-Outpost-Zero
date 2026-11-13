# Outpost Zero — Gameplay Specification

**Team:** APOAPSIS  
**NASA challenge:** Build a Junior Astronaut Mission Trainer  
**Version:** 1.0 · MVP implementation target  
**Status:** Ready for implementation; all numerical gameplay values below are design assumptions, not NASA engineering values.

## 1. Product promise

Outpost Zero is a short browser game for students. The player manages a small lunar south polar outpost through five operational cycles. Every cycle requires one strategic decision. The game shows the cost, the resulting resource changes, and a short explanation of the engineering trade off.

The learning objective is not to teach a single perfect strategy. It is to show that power, water, oxygen, food production, and radiation protection are connected, and that a choice that helps one system can put pressure on another.

## 2. Player and setting

- Audience: students and curious beginners. Use plain language and define technical terms in context.
- Setting: a fictional early lunar south polar outpost.
- Crew: four fictional crew members. Crew count is narrative context, not a biomedical model.
- Mission length: five **operational cycles**. A cycle is a game turn, not a lunar day, hour, or scientifically defined mission duration.
- Objective: keep the crew and critical systems functioning until the fifth cycle ends.

## 3. Main screens

### A. Title / mission start

Show the name **OUTPOST ZERO**, the one sentence premise, a short educational simulation disclaimer, and one primary button: **Start mission**. Do not delay the player with a long cinematic intro.

### B. Mission briefing

Show:
- Mission location: fictional site near the lunar south pole.
- Crew: four.
- Mission objective: maintain essential systems for five operational cycles.
- The five resources and what each one means.
- A short note that cycles and resource points are simplified game units.
- Button: **Enter outpost**.

### C. Operations dashboard

The dashboard is the main screen. At the top show the mission name, current cycle (for example, Cycle 2 of 5), crew condition, and current event warning if one is active.

Show five resource cards:
1. Power reserve (PU)
2. Water reserve (WU)
3. Oxygen reserve (OU)
4. Food reserve (FU)
5. Radiation protection index (RPI)

Show the selected action area with five or six concise decision cards. Each card must display its immediate cost and benefit before the player selects it. Keep a short **Why this matters** science panel near the decision area.

A compact history panel should show the last action and its changes. Do not make the user infer changes from animation alone.

### D. Consequence report

After the player confirms an action, show:
- The action selected.
- Resource values before and after.
- Positive and negative changes with text labels.
- The event resolved this cycle, if any.
- One or two sentences explaining the trade off.
- Button: **Continue to next cycle**.

### E. Mission debrief

Show:
- Result: Mission secured, Mission survived with warnings, or Mission failed.
- Final values for all five resources and crew condition.
- A short action history.
- The most important trade off the player made.
- Two short learning takeaways with source links.
- Buttons: **Play again** and **Review science sources**.

## 4. Game state and units

All values below are internal game units on a 0–100 scale. They are not measured physical quantities, engineering specifications, radiation doses, crew health predictions, or NASA mission parameters.

Initial state:

| Variable | Start | Display unit / meaning |
|---|---:|---|
| Power | 74 | PU · abstract stored energy |
| Water | 62 | WU · abstract recoverable water reserve |
| Oxygen | 64 | OU · abstract breathable oxygen reserve |
| Food | 58 | FU · abstract food reserve |
| Shielding | 32 | RPI · relative protection index, not a dose or certified shielding value |
| Crew condition | 100 | CCI · fictional game condition indicator, not a medical measure |

Clamp all resource values to 0–100 after every calculation. Never allow NaN or negative values to leak into the interface.

## 5. Turn resolution order

Use this order consistently and cover it with unit tests:

1. Display the upcoming event warning, if the current cycle has one.
2. Player selects exactly one strategic action.
3. Validate that the action is available and affordable. If not, do not mutate state; explain why.
4. Apply the action's immediate cost and benefit.
5. Apply the cycle's power generation and baseline consumption.
6. Apply water, oxygen, and food consumption.
7. Resolve the deterministic event for this cycle.
8. Apply resource critical warnings and crew condition penalties, if defined.
9. Clamp values, evaluate failure, update history, and present the consequence report.
10. If Cycle 5 is complete, calculate the final result and show the debrief. Otherwise proceed to the next cycle.

The UI must preview action costs and show the same resolution order in a short rules/help panel.

## 6. Baseline cycle rules

At the start of each cycle:
- Normal solar generation: +10 PU.
- Base power demand: −13 PU.
- Water consumption: −5 WU.
- Oxygen consumption: −5 OU.
- Food consumption: −5 FU.

Therefore, without upgrades or events, power changes by −3 PU per cycle. These are intentionally simplified tuning values for gameplay. They are not physical forecasts.

### Solar array upgrade

When the player chooses **Service solar arrays**:
- Immediate cost: −8 PU.
- Benefit: increase solar generation by +5 PU in each later cycle.
- This upgrade can be taken once.
- It does not retroactively affect the current cycle's generation.

### Cycle 2 event: Solar particle event alert

The player sees the warning before choosing the Cycle 2 action. After the action and normal upkeep:
- If shielding is 50 or higher, crew condition decreases by 5 CCI.
- If shielding is below 50, crew condition decreases by 25 CCI.

This is a deliberately simple teaching rule to show why radiation protection and operational readiness matter. It is not a radiation transport model, a prediction, or a dose estimate.

### Cycle 4 event: Lunar dust on the array

The player sees the warning before choosing the Cycle 4 action. During Cycle 4, reduce solar generation by:
- 2 PU if the solar array was serviced before Cycle 4.
- 5 PU otherwise.

This is a scripted gameplay consequence. Do not describe the numeric penalty as a measured lunar dust effect.

## 7. Available strategic actions

Use these initial action definitions. Codex may adjust values only if playtesting shows the baseline cannot be won or is trivial. Any changes must be recorded in `DECISIONS.md` and explained in `WORK_LOG.md`.

| Action | Immediate costs | Immediate benefit | Limit |
|---|---|---|---|
| Service solar arrays | −8 PU | +5 PU solar generation on each later cycle | Once per mission |
| Reinforce regolith shelter | −12 PU | +20 RPI | Can be repeated; clamp RPI to 100 |
| Service water recovery | −10 PU | +14 WU | Can be repeated; clamp Water to 100 |
| Service oxygen generator | −8 PU, −4 WU | +14 OU | Can be repeated; clamp Oxygen to 100 |
| Run greenhouse cycle | −11 PU, −7 WU | +18 FU | Can be repeated; clamp Food to 100 |
| Crew ration protocol | No PU cost | Reduce this cycle's food consumption from 5 FU to 2 FU; −4 CCI from the restrictive ration plan | Cannot reduce CCI below 0 |

The greenhouse action represents a simplified production cycle for teaching. It does not imply that a real crop grows to harvest in one lunar operating cycle. Explain that NASA research studies controlled-environment crop production for food and other life-support contributions.

## 8. Failure and outcome logic

### Immediate failure

The mission fails if, after a cycle resolves:
- Power, Water, Oxygen, or Food reaches 0; or
- Crew condition reaches 0.

Show the exact failed system and a short explanation. Do not abruptly end without explaining the cause.

### Mission result after Cycle 5

- **Mission secured:** all four consumable reserves are at least 10, shielding is at least 45, and crew condition is at least 60.
- **Mission survived with warnings:** the crew and all critical systems remain above 0, but one or more Mission secured thresholds were not met.
- **Mission failed:** an immediate failure condition occurred.

These thresholds are game design choices, not official safety limits. Display them as mission objectives, not real engineering boundaries.

### Known balanced example path for automated tests

This path should complete successfully with the initial values and rules above:

1. Cycle 1: Service solar arrays.
2. Cycle 2: Reinforce regolith shelter.
3. Cycle 3: Service water recovery.
4. Cycle 4: Service oxygen generator.
5. Cycle 5: Run greenhouse cycle.

Expected approximate final values, depending on the exact order of event resolution: Power 28 PU, Water 40 WU, Oxygen 53 OU, Food 51 FU, Shielding 52 RPI, Crew condition 95 CCI. Use a test to calculate the exact values from the implemented engine rather than hardcoding this approximate summary in the interface.

## 9. Scoring and replay

A score is optional. If time allows, calculate a simple **Outpost Stability** score from the final crew condition and normalized resource reserves. Explain the score formula on the debrief. Do not create a leaderboard or server-side scoring system.

Replay must create a fresh initial state and clear prior mission history. If localStorage is implemented, make reset behavior explicit and test that a new mission really starts from the initial state.

## 10. Science content requirements

Every science note must contain:
- A short statement written for students.
- A direct source link.
- A label: **NASA fact**, **Data-derived context**, or **Game assumption**.
- A sentence explaining how the fact informs a game mechanic.

The main data integration should use NASA's Lunar Reconnaissance Orbiter (LRO) Lunar Orbiter Laser Altimeter (LOLA) south polar illumination product. Use the NASA PGDA product page and, if feasible in the time remaining, a lightweight preview or a small data extract. The product represents average illumination over an approximately 18.6-year lunar nutation cycle. Do not present it as a real-time solar forecast or a prediction for a specific five-turn game scenario.

Add radiation context from NASA's LRO CRaTER data archive and NASA Space Radiation Analysis Group explanation. Add supporting context for lunar power systems and space crops. See `NASA_DATA_PLAN.md`.

## 11. Acceptance checklist

- [ ] A first-time player understands the goal within 20 seconds.
- [ ] The player can complete a full five-cycle run.
- [ ] At least four systems are visible and have meaningful trade offs; all five challenge themes are covered.
- [ ] Every action shows its cost before confirmation.
- [ ] The same action produces the same result from the same state.
- [ ] Cycle 2 and Cycle 4 events are visible and explainable.
- [ ] The balanced example path produces Mission secured.
- [ ] A deliberate poor strategy can fail with an understandable explanation.
- [ ] The debrief shows final values and the player's decision history.
- [ ] Source notes distinguish measured facts from game assumptions.
- [ ] Restart produces a clean initial state.
- [ ] The app is usable on mobile and desktop and with a keyboard.
- [ ] The deployed demo can be opened without login.
