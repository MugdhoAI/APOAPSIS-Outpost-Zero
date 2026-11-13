import { RESOURCE_META, RESOURCE_ORDER, getResourceStatus } from "../game/constants";
import { LEARNING_TAKEAWAYS, getEventForCycle } from "../game/content";
import { diffResources, evaluateMission, findKeyTradeOff, getObjectiveChecks } from "../game/engine";
import type { GameState, ResourceKey } from "../game/types";
import { DeltaChip } from "./DeltaChip";
import { ScienceNoteCard } from "./ScienceNoteCard";

type DebriefProps = {
  state: GameState;
  onPlayAgain: () => void;
  onOpenSources: () => void;
  onBackToTitle: () => void;
};

export function Debrief({ state, onPlayAgain, onOpenSources, onBackToTitle }: DebriefProps) {
  const result = evaluateMission(state);
  const keyTradeOff = findKeyTradeOff(state.history);
  const checks = getObjectiveChecks(state.resources);
  const weakestMeta = result.weakest ? RESOURCE_META[result.weakest.key] : null;

  return (
    <main className="container debrief" id="main">
      <header className={`debrief-head ${state.status === "secured" ? "" : `is-${state.status}`}`}>
        <p className="eyebrow">Mission debrief · {state.history.length} cycles flown</p>
        <h1>{result.headline}</h1>
        <p className="summary">{result.summary}</p>

        {state.status === "failed" && state.failureReasons.length > 0 ? (
          <ul className="checks" style={{ marginTop: "16px" }}>
            {state.failureReasons.map((reason) => (
              <li className="check check-missed" key={reason}>
                <span className="check-mark" aria-hidden="true">
                  ×
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="score-row">
          <p className="score-value">
            {result.score}
            <span> / 100 · Outpost stability</span>
          </p>
          <p className="score-explain">
            Game score: crew condition is worth 40 points, the average of the four consumable
            reserves 40, and the protection index 20. It is a teaching metric, not a measure of real
            mission performance.
          </p>
        </div>
      </header>

      <div className="debrief-grid">
        <section className="panel" aria-labelledby="final-heading">
          <div className="section-head">
            <h2 id="final-heading">Final outpost state</h2>
          </div>
          <table className="table">
            <caption className="sr-only">Final values for every system at the end of the mission</caption>
            <thead>
              <tr>
                <th scope="col">System</th>
                <th scope="col" className="num">
                  Final
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {RESOURCE_ORDER.map((key) => {
                const meta = RESOURCE_META[key];
                const status = getResourceStatus(key, state.resources[key]);
                return (
                  <tr key={key}>
                    <td className="resource-name">
                      {meta.name} <span className="unit-cell">{meta.unit}</span>
                    </td>
                    <td className="num">{state.resources[key]}</td>
                    <td>
                      <span className="status-line" style={{ marginTop: 0 }}>
                        <span className={`dot is-${status}`} aria-hidden="true" />
                        <span className={`is-${status}`}>
                          {status === "stable" ? "Stable" : status === "low" ? "Low" : "Critical"}
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {weakestMeta && result.weakest ? (
            <p className="fineprint" style={{ marginTop: "16px" }}>
              Weakest system at the end: {weakestMeta.name.toLowerCase()} at {result.weakest.value}{" "}
              {weakestMeta.unit}.
            </p>
          ) : null}
        </section>

        <section className="panel" aria-labelledby="objectives-heading">
          <div className="section-head">
            <h2 id="objectives-heading">Mission objectives</h2>
            <p>Game targets, not engineering safety limits.</p>
          </div>
          <ul className="checks">
            {checks.map((check) => (
              <li className={`check ${check.met ? "check-met" : "check-missed"}`} key={check.label}>
                <span className="check-mark" aria-hidden="true">
                  {check.met ? "✓" : "×"}
                </span>
                <span>
                  {check.label}
                  <span className="sr-only"> {check.met ? "met" : "not met"}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel" style={{ marginTop: "24px" }} aria-labelledby="decisions-heading">
        <div className="section-head">
          <h2 id="decisions-heading">Your decisions</h2>
          <p>Every cycle, in order.</p>
        </div>
        <ul className="history-list">
          {state.history.map((record) => {
            const delta = diffResources(record.before, record.after);
            const event = getEventForCycle(record.cycle);
            return (
              <li className="history-item" key={record.cycle}>
                <div className="history-head">
                  <span>
                    Cycle {record.cycle}
                    {event ? ` · ${event.title}` : ""}
                  </span>
                  <span>
                    ended {record.after.power} PU · {record.after.water} WU · {record.after.oxygen} OU ·{" "}
                    {record.after.food} FU
                  </span>
                </div>
                <p className="history-title">{record.actionLabel}</p>
                <div className="history-deltas">
                  {Object.entries(delta).map(([key, value]) => (
                    <DeltaChip key={key} resource={key as ResourceKey} delta={value ?? 0} />
                  ))}
                </div>
                {record.eventOutcome ? (
                  <p className="fineprint" style={{ marginTop: "8px" }}>
                    {record.eventOutcome}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      {keyTradeOff ? (
        <section className="panel why-block" style={{ marginTop: "24px" }} aria-labelledby="tradeoff-heading">
          <h2 id="tradeoff-heading">The costliest choice you made</h2>
          <p className="panel-lede">
            Cycle {keyTradeOff.cycle} · {keyTradeOff.actionLabel} · {keyTradeOff.cost} points spent
          </p>
          <p className="tradeoff-text" style={{ marginTop: "12px" }}>
            {keyTradeOff.text}
          </p>
        </section>
      ) : null}

      <section style={{ marginTop: "24px" }} aria-labelledby="takeaways-heading">
        <div className="section-head">
          <h2 id="takeaways-heading">Two things to take away</h2>
        </div>
        {LEARNING_TAKEAWAYS.map((note) => (
          <div key={note.text} style={{ marginBottom: "12px" }}>
            <ScienceNoteCard note={note} />
          </div>
        ))}
      </section>

      <div className="report-actions">
        <button type="button" className="btn btn-primary" onClick={onPlayAgain}>
          Play again
        </button>
        <button type="button" className="btn btn-secondary" onClick={onOpenSources}>
          Review science sources
        </button>
        <button type="button" className="btn btn-quiet" onClick={onBackToTitle}>
          Back to title
        </button>
      </div>
    </main>
  );
}
