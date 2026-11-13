import { SOURCES } from "../data/sources";
import type { ScienceSource } from "../data/sources";

const GROUPS: { category: ScienceSource["category"]; heading: string; lede: string }[] = [
  {
    category: "dataset",
    heading: "Data products",
    lede: "The NASA data products this project points to, with what was and was not taken from them.",
  },
  {
    category: "science-reference",
    heading: "Science references",
    lede: "Published work and NASA explanations behind the physics and biology notes.",
  },
  {
    category: "mission-context",
    heading: "Mission context",
    lede: "NASA overview pages used to frame the engineering problems in the game.",
  },
];

type SourcesScreenProps = {
  onBack: () => void;
  backLabel: string;
};

export function SourcesScreen({ onBack, backLabel }: SourcesScreenProps) {
  return (
    <main className="container sources" id="main">
      <div className="page-head">
        <p className="eyebrow">Science sources and model notes</p>
        <h1>What is NASA material and what is game design.</h1>
        <p>
          Every science note in the game carries one label: NASA fact, data-derived context, or game
          assumption. The lists below repeat the claim, the limitation, and where the source is used.
        </p>
      </div>

      <section className="panel" aria-labelledby="labels-heading" style={{ marginBottom: "24px" }}>
        <div className="section-head">
          <h2 id="labels-heading">How to read the labels</h2>
        </div>
        <ul className="stack" style={{ gap: "12px" }}>
          <li className="note">
            <span className="tag tag-fact">NASA fact</span> A statement that follows NASA's published
            explanation of a system or environment.
          </li>
          <li className="note">
            <span className="tag tag-derived">Data-derived context</span> A statement about what a
            NASA data product shows, without claiming the game reproduces its values.
          </li>
          <li className="note">
            <span className="tag tag-assumption">Game assumption</span> A number or rule invented for
            play balance. It is not a NASA measurement, a radiation dose, or an engineering limit.
          </li>
        </ul>
        <p className="fineprint" style={{ marginTop: "16px" }}>
          The outpost site diagram in the briefing was drawn for this game. It is labelled as
          illustrative and is not a NASA image or a georeferenced map.
        </p>
      </section>

      {GROUPS.map((group) => {
        const entries = SOURCES.filter((source) => source.category === group.category);
        if (entries.length === 0) return null;

        return (
          <section key={group.category} aria-labelledby={`${group.category}-heading`} style={{ marginBottom: "24px" }}>
            <div className="section-head">
              <h2 id={`${group.category}-heading`}>{group.heading}</h2>
              <p>{group.lede}</p>
            </div>
            <div className="source-grid">
              {entries.map((source) => (
                <article className="source-card" key={source.id}>
                  <span className="tag">{group.heading}</span>
                  <h2>{source.title}</h2>
                  <p className="source-org">{source.organization}</p>
                  <p>{source.claim}</p>
                  <p className="limitation">Limitation: {source.limitation}</p>
                  <p className="used-for">Used for: {source.usedFor}</p>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.url}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <p className="fineprint" style={{ marginTop: "8px" }}>
                    Accessed {source.accessedOn}.
                  </p>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <div className="report-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          {backLabel}
        </button>
      </div>
    </main>
  );
}
