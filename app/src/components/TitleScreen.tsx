type TitleScreenProps = {
  onStart: () => void;
};

function HeroArt() {
  return (
    <figure className="hero-art">
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Illustration of a small dome outpost on a lunar ridge with Earth above the horizon."
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050e1b" />
            <stop offset="58%" stopColor="#0b1d31" />
            <stop offset="100%" stopColor="#16395a" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bfeaff" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#3f8dbf" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3f8dbf" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="earthLight" cx="32%" cy="30%" r="76%">
            <stop offset="0%" stopColor="#9adcf0" />
            <stop offset="48%" stopColor="#2f7fa4" />
            <stop offset="100%" stopColor="#0d3a52" />
          </radialGradient>
          <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d3549" />
            <stop offset="100%" stopColor="#122334" />
          </linearGradient>
          <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27415a" />
            <stop offset="100%" stopColor="#080f1a" />
          </linearGradient>
          <linearGradient id="domeGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cfe9f8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5d7f97" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <rect width="640" height="400" fill="url(#sky)" />

        <g fill="#d8efff">
          <circle cx="72" cy="58" r="1.4" opacity="0.7" />
          <circle cx="148" cy="34" r="1" opacity="0.45" />
          <circle cx="232" cy="72" r="1.1" opacity="0.55" />
          <circle cx="318" cy="40" r="1" opacity="0.4" />
          <circle cx="392" cy="104" r="1.2" opacity="0.45" />
          <circle cx="548" cy="40" r="1.1" opacity="0.6" />
          <circle cx="600" cy="132" r="1" opacity="0.4" />
          <circle cx="44" cy="138" r="1.1" opacity="0.35" />
          <circle cx="268" cy="124" r="1" opacity="0.3" />
          <circle cx="586" cy="196" r="1.1" opacity="0.35" />
        </g>

        <circle cx="118" cy="318" r="132" fill="url(#sunGlow)" />

        <circle cx="470" cy="86" r="40" fill="#123a52" />
        <circle cx="470" cy="86" r="40" fill="url(#earthLight)" opacity="0.95" />
        <path d="M470 46a40 40 0 0 1 0 80 40 40 0 0 1 0-80Z" fill="#050f1c" opacity="0.5" />
        <circle cx="470" cy="86" r="40" fill="none" stroke="#8fd0ff" strokeOpacity="0.28" />

        <path
          d="M0 318l52-12 46 9 54-16 50 12 58-15 50 13 54-14 52 11 56-13 60 12 56-11 52 10v84H0Z"
          fill="url(#ridgeFar)"
        />

        <path
          d="M0 356l62-14 58 11 72-19 60 14 64-12 58 11 62-14 56 10 58-12 52 9 38-3v43H0Z"
          fill="url(#ridgeNear)"
        />

        <ellipse cx="252" cy="352" rx="74" ry="7" fill="#040a12" opacity="0.55" />
        <ellipse cx="430" cy="352" rx="42" ry="5" fill="#040a12" opacity="0.5" />

        <g>
          <path
            d="M196 352c0-38 24-58 56-58s56 20 56 58"
            fill="url(#domeGlass)"
            stroke="#a8d4ec"
            strokeOpacity="0.55"
            strokeWidth="1.6"
          />
          <path d="M196 352h112" stroke="#a8d4ec" strokeOpacity="0.45" strokeWidth="1.6" />
          <rect x="300" y="326" width="34" height="26" rx="5" fill="#1c3145" stroke="#8fb4cc" strokeOpacity="0.55" />
          <path d="M310 326v26M322 326v26" stroke="#8fb4cc" strokeOpacity="0.3" strokeWidth="1.2" />
          <path d="M232 352v-54" stroke="#a8d4ec" strokeOpacity="0.45" strokeWidth="1.4" />
          <path d="M232 298v-22" stroke="#a8d4ec" strokeOpacity="0.35" strokeWidth="1.2" />
          <circle cx="232" cy="272" r="2.2" fill="#63ded0" />
          <path d="M286 340h12v12h-12Z" fill="#63ded0" opacity="0.55" />
        </g>

        <g>
          <path d="M430 352v-46" stroke="#9ec4dc" strokeOpacity="0.5" strokeWidth="1.6" />
          <rect x="398" y="292" width="64" height="18" rx="2" fill="#16304a" stroke="#9ec4dc" strokeOpacity="0.6" />
          <path d="M414 292v18M430 292v18M446 292v18" stroke="#9ec4dc" strokeOpacity="0.35" strokeWidth="1.1" />
          <path d="M430 326l-14 10M430 326l14 10" stroke="#9ec4dc" strokeOpacity="0.3" strokeWidth="1.1" />
        </g>

        <g fill="#63ded0" opacity="0.9">
          <circle cx="252" cy="338" r="1.6" />
          <circle cx="330" cy="338" r="1.6" />
        </g>
      </svg>
      <figcaption className="hero-caption">
        <span>Fictional south polar site</span>
        <span>Illustration, not NASA imagery</span>
      </figcaption>
    </figure>
  );
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <main className="container title-screen" id="main">
      <div className="title-copy">
        <p className="eyebrow">NASA Space Apps Challenge 2026 · Team APOAPSIS</p>
        <h1 className="display-title">
          Outpost Zero
          <span>A five cycle survival trainer for a lunar south polar outpost.</span>
        </h1>
        <p className="lede">
          Power, water, oxygen, food, and radiation protection are connected. Spend too much
          fixing one system and another one slips. Keep four crew members alive until the fifth
          cycle ends.
        </p>

        <ul className="fact-list">
          <li>
            <strong>5 cycles</strong>
            One decision per cycle
          </li>
          <li>
            <strong>6 systems</strong>
            Reserves, protection, crew
          </li>
          <li>
            <strong>Clear ending</strong>
            Secured, warnings, or failed
          </li>
        </ul>

        <div className="title-actions">
          <button type="button" className="btn btn-primary btn-lg" onClick={onStart}>
            Start mission
          </button>
          <p className="fineprint">
            Educational simulation for students. Resource values are game units on a 0 to 100
            scale, not NASA engineering measurements or a mission planning tool.
          </p>
        </div>
      </div>

      <HeroArt />
    </main>
  );
}
