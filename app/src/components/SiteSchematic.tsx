/**
 * Authored schematic of a polar site. It is drawn for this game and is not
 * NASA data, which is why the figure is labelled as illustrative everywhere it
 * appears.
 */
export function SiteSchematic() {
  return (
    <svg
      viewBox="0 0 320 300"
      role="img"
      aria-label="Schematic polar view of a fictional outpost site: a marked outpost on a lit ridge, permanently shadowed ground nearby, and a low sun direction."
    >
      <defs>
        <radialGradient id="polarLight" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#223e57" />
          <stop offset="100%" stopColor="#0a1727" />
        </radialGradient>
        <radialGradient id="shadowPatch" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#02060c" />
          <stop offset="100%" stopColor="#061020" />
        </radialGradient>
      </defs>

      <rect width="320" height="300" fill="#061020" />
      <circle cx="160" cy="150" r="132" fill="url(#polarLight)" stroke="#2a4762" strokeWidth="1" />

      <g stroke="#3a5d7c" strokeOpacity="0.45" strokeWidth="0.8" fill="none">
        <circle cx="160" cy="150" r="100" strokeDasharray="3 5" />
        <circle cx="160" cy="150" r="68" strokeDasharray="3 5" />
        <circle cx="160" cy="150" r="36" strokeDasharray="3 5" />
      </g>

      <g fill="#1b3148" stroke="#2f4d69" strokeWidth="0.7">
        <path d="M62 96c18-14 42-12 58 2s30 22 26 40c-4 16-26 24-48 20s-40-20-42-36 0-20 6-26Z" />
        <path d="M196 176c16-8 40-4 50 10s8 30-4 38-34 8-46-2-10-38 0-46Z" />
        <path d="M108 214c12-6 30-4 36 8s0 24-12 28-28 0-32-10 2-22 8-26Z" />
      </g>

      <g fill="url(#shadowPatch)" stroke="#4e7f9e" strokeOpacity="0.55" strokeWidth="0.9" strokeDasharray="4 3">
        <ellipse cx="96" cy="132" rx="26" ry="18" transform="rotate(-18 96 132)" />
        <ellipse cx="222" cy="204" rx="22" ry="14" transform="rotate(12 222 204)" />
        <ellipse cx="152" cy="62" rx="18" ry="11" />
      </g>

      <g stroke="#63ded0" strokeWidth="1.2" fill="none">
        <circle cx="176" cy="118" r="13" />
        <circle cx="176" cy="118" r="5" fill="#63ded0" fillOpacity="0.35" />
      </g>
      <path d="M176 105v-12" stroke="#63ded0" strokeWidth="1.2" />
      <path d="M176 93l-4 6h8Z" fill="#63ded0" />

      <g stroke="#ffcb70" strokeWidth="1.4" fill="none">
        <path d="M272 150h18" strokeDasharray="5 4" />
        <path d="M290 150l-6-4v8Z" fill="#ffcb70" stroke="none" />
      </g>

      <circle cx="160" cy="150" r="132" fill="none" stroke="#31506d" strokeWidth="1" />
    </svg>
  );
}
