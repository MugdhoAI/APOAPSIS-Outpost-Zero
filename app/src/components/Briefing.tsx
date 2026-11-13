import { CARD_ORDER, RESOURCE_META, SECURED_THRESHOLDS } from "../game/constants";
import { getSource } from "../data/sources";
import { SiteSchematic } from "./SiteSchematic";

type BriefingProps = {
  onEnter: () => void;
  onOpenSources: () => void;
};

const CYCLE_RULES = [
  "The cycle's event warning is shown before you choose.",
  "You commit exactly one action and pay its cost.",
  "Solar generation and the base power demand are settled.",
  "Water, oxygen, and food are used for crew upkeep.",
  "The cycle's event resolves, if the cycle has one.",
  "Reserves are checked. If any critical system is empty, the mission ends.",
];

export function Briefing({ onEnter, onOpenSources }: BriefingProps) {
  const illumination = getSource("lola-illumination");

  return (
    <main className="container briefing" id="main">
      <div className="page-head">
        <p className="eyebrow">Mission briefing</p>
        <h1>Keep a small south polar outpost running for five cycles.</h1>
        <p>
          You command a fictional outpost near the lunar south pole with four crew members. Each
          cycle asks for one decision. Every decision spends something, and the reserves you spend
          are the same ones keeping the crew alive.
        </p>
      </div>

      <div className="briefing-grid">
        <div className="stack">
          <section className="panel" aria-labelledby="systems-heading">
            <div className="section-head">
              <h2 id="systems-heading">What you are managing</h2>
              <p>All values are game units on a 0 to 100 scale.</p>
            </div>
            <ul className="system-list">
              {CARD_ORDER.map((key) => {
                const meta = RESOURCE_META[key];
                return (
                  <li className="system-item" key={key}>
                    <span className="system-unit">{meta.unit}</span>
                    <div>
                      <h3>{meta.name}</h3>
                      <p>{meta.meaning}</p>
                    </div>
                  </li>
                );
              })}
              <li className="system-item">
                <span className="system-unit">{RESOURCE_META.crew.unit}</span>
                <div>
                  <h3>{RESOURCE_META.crew.name}</h3>
                  <p>{RESOURCE_META.crew.meaning}</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="panel" aria-labelledby="goal-heading">
            <div className="section-head">
              <h2 id="goal-heading">What counts as a good mission</h2>
            </div>
            <p className="panel-lede">
              After cycle five the outpost is scored against these objectives. They are game design
              targets, not real engineering safety limits.
            </p>
            <ul className="checks" style={{ marginTop: "16px" }}>
              <li className="check">
                <span className="check-mark" aria-hidden="true">
                  •
                </span>
                <span>
                  Power, water, oxygen, and food each finish at {SECURED_THRESHOLDS.reserve} or higher
                </span>
              </li>
              <li className="check">
                <span className="check-mark" aria-hidden="true">
                  •
                </span>
                <span>Protection index finishes at {SECURED_THRESHOLDS.shielding} RPI or higher</span>
              </li>
              <li className="check">
                <span className="check-mark" aria-hidden="true">
                  •
                </span>
                <span>Crew condition finishes at {SECURED_THRESHOLDS.crew} CCI or higher</span>
              </li>
            </ul>
            <p className="fineprint" style={{ marginTop: "16px" }}>
              Emptying power, water, oxygen, or food, or losing all crew condition, ends the mission
              immediately.
            </p>
          </section>
        </div>

        <div className="stack">
          <section className="panel" aria-labelledby="cycle-heading">
            <div className="section-head">
              <h2 id="cycle-heading">How one cycle resolves</h2>
            </div>
            <ol className="cycle-steps">
              {CYCLE_RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </section>

          <section className="panel" aria-labelledby="data-heading">
            <div className="section-head">
              <h2 id="data-heading">Why the site matters</h2>
            </div>
            <figure className="map-figure">
              <SiteSchematic />
              <figcaption>
                <strong>Illustrative schematic, drawn for this game</strong>
                Dark patches mark permanently shadowed ground, the ring marks the outpost, and the
                dashed arrow shows the general direction of the Sun. This is not a NASA data
                product and it is not to scale.
              </figcaption>
            </figure>
            <p className="panel-lede" style={{ marginTop: "16px" }}>
              NASA's LRO LOLA instrument mapped how much sunlight reaches the polar surface over an
              18.6 year lunar cycle. Some ground sits in permanent shadow while a few ridges stay
              lit almost continuously, which is why a site is chosen carefully before the first
              solar array is bolted down.
            </p>
            <div className="data-note">
              <span className="tag tag-derived">Data-derived context</span>
              {illumination ? (
                <a href={illumination.url} target="_blank" rel="noopener noreferrer">
                  NASA LOLA polar illumination product
                  <span className="sr-only"> (opens in a new tab)</span> ↗
                </a>
              ) : null}
            </div>
            <button type="button" className="btn btn-quiet" style={{ marginTop: "16px" }} onClick={onOpenSources}>
              Read all science sources
            </button>
          </section>
        </div>
      </div>

      <div className="report-actions">
        <button type="button" className="btn btn-primary btn-lg" onClick={onEnter}>
          Enter outpost
        </button>
        <p className="report-next">
          Nothing here is a real mission plan. The simulation is simplified so the trade offs stay
          visible.
        </p>
      </div>
    </main>
  );
}
