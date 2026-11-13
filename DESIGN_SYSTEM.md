# APOAPSIS Design System

**Product:** Outpost Zero  
**Team:** APOAPSIS  
**Version:** 1.0 · Hackathon MVP  
**Last reviewed:** 13 November 2026, Asia/Dhaka

## 1. Design purpose

The interface should make a complex mission decision understandable at a glance. It should feel like a credible mission operations dashboard, but it is an educational game for students, not a real spacecraft control interface.

**Design priority:** clarity first, atmosphere second. Never let decoration obscure a resource value, a decision, or its consequence.

## 2. Visual direction

- Dark, calm, technical interface inspired by mission control displays.
- Deep navy background, layered blue surfaces, restrained cyan accents, and warm warning colors.
- High contrast typography and clear labels.
- Thin borders and restrained dividers instead of excessive glow or glass effects.
- Use stars, orbital lines, planetary imagery, and gradients sparingly. The game UI must remain the focal point.
- Do not use NASA insignia, NASA wordmarks, or design language that implies NASA endorsement.

## 3. Color tokens

Use CSS variables. These are project design tokens, not NASA brand colors.

```css
:root {
  color-scheme: dark;
  --color-bg: #07111f;
  --color-surface: #0d1b2b;
  --color-surface-raised: #14263a;
  --color-surface-hover: #1a3048;
  --color-border: #294057;

  --color-text: #f3f7fb;
  --color-text-muted: #afbdcc;
  --color-text-subtle: #8498ad;

  --color-accent: #58b7ff;
  --color-accent-strong: #258fe0;
  --color-cyan: #63ded0;

  --color-success: #83d6a5;
  --color-warning: #ffcb70;
  --color-danger: #ff7777;

  --color-focus: #a9dcff;
}
```

Rules:

- Use `--color-accent` for the main action and selected state.
- Use success, warning, and danger only for meaningful statuses.
- Never communicate status with color alone. Pair color with a label, icon, or text.
- Keep body text at a contrast level that remains readable on the dark surfaces.
- Do not introduce extra colors without a clear semantic role.

## 4. Typography

Use a local system stack to avoid external font loading and licensing delays.

```css
--font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

Suggested scale:

| Role | Size | Weight | Use |
|---|---:|---:|---|
| Display | 32–40 px | 700 | Project title or mission outcome only |
| Page heading | 24–30 px | 650–700 | Screen heading |
| Section heading | 18–22 px | 600 | Dashboard and panel titles |
| Body | 15–17 px | 400 | Main instructions and explanations |
| Small | 13–14 px | 400–500 | Supporting labels and source notes |
| Numeric value | 22–28 px | 650 | Resource values; use tabular numerals |

Avoid tiny all-caps text for essential information. Use monospace only for values, IDs, and technical readouts, not long paragraphs.

## 5. Spacing, shape, and layout

- Base spacing unit: 4 px. Prefer 8, 12, 16, 24, and 32 px increments.
- Main content width: approximately 1200 px, centered with comfortable side padding.
- Card radius: 12–16 px. Buttons and inputs: 8–10 px.
- Borders: 1 px using `--color-border`.
- Use a consistent 12-column desktop grid only if it helps. Do not add a complex grid library for this project.
- Keep the mission goal and current cycle near the top.
- Put resource state before the decision choices.
- Keep consequence feedback close to the action that caused it.

Responsive behavior:

- Wide screens: mission summary, resources, and decision area may use multiple columns.
- Tablet: reduce columns and preserve readable resource labels.
- Mobile: stack sections; decision cards and controls use full width; no horizontal scrolling.
- Test at approximately 360 px, 768 px, and 1280 px widths.

## 6. Core components

### Mission header

Contains the project name, current mission / cycle, and a short objective. Keep the main action visible without scrolling where practical.

### Resource card

Each resource card shows:

- Resource name.
- Current value.
- Unit or explicit game-unit label.
- A progress or status indicator where useful.
- A short status label such as Stable, Low, or Critical.

Do not use a gauge without a numeric value and label. Do not mix real measurement units with invented game points.

### Decision card

Each option includes:

- A plain-language action title.
- A short description.
- The meaningful cost or trade-off when known.
- A clear button label.

Do not hide the main cost behind a hover state. The player should understand the choice before selecting it.

### Consequence panel

After a decision, show:

- What changed.
- Which systems improved or worsened.
- Why the change occurred.
- A concise science note or source link when relevant.

### Event alert

Use a short title, one sentence of context, and the available response. Make urgent states visually distinct without flashing or relying on color alone.

### Mission debrief

Show the final state, key decisions, strongest outcome, weakest system, and one or two learning points. Provide a clear restart action.

## 7. Buttons and controls

- Primary action: solid accent background with high contrast text.
- Secondary action: surface background and visible border.
- Destructive / reset action: visually distinct and requires a clear label.
- Minimum target size: 44 × 44 CSS px where practical.
- Every control needs hover, focus-visible, active, and disabled states.
- Buttons must describe the action. Avoid labels such as “Continue” when a more specific label is possible.
- Prevent accidental double application of a turn while the result is resolving.

## 8. Accessibility requirements

- Use semantic headings, buttons, lists, and landmarks.
- All primary actions must work with a keyboard.
- Provide a visible focus indicator using `--color-focus`.
- Use text labels and symbols in addition to color.
- Keep normal text readable and maintain strong contrast.
- Provide accessible names for icon-only controls.
- Announce important state changes with an appropriate live region without overwhelming screen readers.
- Respect `prefers-reduced-motion`.
- Do not use autoplay audio.
- Avoid rapid flashing, excessive motion, or information conveyed only by animation.

## 9. Motion and feedback

Motion should explain a state change, not decorate the screen.

- Use short transitions for panels, progress, and focus feedback.
- Keep essential values visible while they update.
- Do not delay gameplay with long animations.
- Provide a reduced-motion alternative.
- Never animate a value in a way that makes the final result ambiguous.

## 10. Content and tone

Use direct, natural writing aimed at a student who is curious about space but may not know engineering terminology.

- Explain one concept at a time.
- Define unfamiliar terms in context.
- Prefer concrete cause and effect over slogans.
- Keep buttons and status labels short.
- Avoid exaggerated claims such as “NASA-grade simulator” or “perfect lunar survival prediction.”
- Label simplified values and assumptions clearly.
- Avoid unnecessary hyphens between words. Keep correct technical terms and official names intact.

## 11. Images and graphic assets

- Use imagery only when it supports the scenario or orientation.
- Prefer original interface graphics and licensed assets over random web images.
- Record the source and reuse terms for external assets.
- Optimize image size and provide alt text where images carry information.
- Do not use NASA logos, insignia, or mission patches in a way that suggests NASA sponsorship or endorsement.
- Avoid heavy background media that harms loading time or legibility.

## 12. Design acceptance checklist

- [ ] A first-time player can identify the mission objective.
- [ ] Resource names, values, and units are clear.
- [ ] Decision costs are visible before choosing.
- [ ] Consequences are shown immediately and explained.
- [ ] Warning and success states use text as well as color.
- [ ] Main actions work with keyboard and pointer.
- [ ] Focus states are visible.
- [ ] Layout works at phone, tablet, and desktop widths.
- [ ] Reduced motion is respected.
- [ ] No decorative element competes with the actual game.
- [ ] Copy is natural, accurate, and free of unnecessary filler.
