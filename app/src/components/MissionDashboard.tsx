import { CARD_ORDER, RESOURCE_META, SECURED_THRESHOLDS, getResourceStatus } from "../game/constants";
import { getCycleFocus, getEventForCycle } from "../game/content";
import { diffResources, getActionAvailability } from "../game/engine";
import type { ActionId, GameState, ResourceKey } from "../game/types";
import { DeltaChip } from "./DeltaChip";
import { ResourceCard } from "./ResourceCard";
import { ScienceNoteCard } from "./ScienceNoteCard";

const STATUS_TEXT = {
  stable: "Stable",
  low: "Low",
  critical: "Critical",
} as const;

const MAX_HISTORY = 3;

type MissionDashboardProps = {
  state: GameState;
  onChoose: (actionId: ActionId) => void;
  onRestart: () => void;
  onOpenSources: () => void;
};

export function MissionDashboard({ state, onChoose, onRestart, onOpenSources }: MissionDashboardProps) {
  const { cycle, maxCycles, resources } = state;
  const event = getEventForCycle(cycle);
  const focus = getCycleFocus(cycle);
  const availability = getActionAvailability(state);
  const crewStatus = getResourceStatus("crew", resources.crew);
  const recent = state.history.slice(-MAX_HISTORY).reverse();

  return (
    <main className="container dashboard" id="main">
      <section className="mission-summary" aria-labelledby="mission-heading">
        <div className="summary-block">
          <p className="summary-label">Mission</p>
          <h1 className="cycle-title" id="mission-heading">
            Outpost Zero <span>· Cycle {cycle} of {maxCycles}</span>
          </h1>
          <ol className="cycle-track" aria-label={`Cycle ${cycle} of ${maxCycles}`}>
            {Array.from({ length: maxCycles }, (_, index) => index + 1).map((step) => {
              const className =
                step < cycle ? "cycle-pip is-done" : step === cycle ? "cycle-pip is-current" : "cycle-pip";
              return (
                <li
                  key={step}
                  className={className}
                  aria-current={step === cycle ? "step" : undefined}
                >
                  <span className="sr-only">
                    Cycle {step}
                    {step < cycle ? " complete" : step === cycle ? " current" : " not started"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="summary-block">
          <p className="summary-label">Crew condition</p>
          <p className="crew-value">
            <strong>{resources.crew}</strong>
            <span>{RESOURCE_META.crew.unit}</span>
          </p>
          <p className={`status-line is-${crewStatus}`}>
            <span className="dot" aria-hidden="true" />
            {STATUS_TEXT[crewStatus]}
          </p>
        </div>

        <div className="summary-block">
          <p className="summary-label">Mission objective</p>
          <p className="objective-text">
            End cycle five with every reserve at <strong>{SECURED_THRESHOLDS.reserve}</strong> or
            higher, protection at <strong>{SECURED_THRESHOLDS.shielding} RPI</strong>, and crew
            condition at <strong>{SECURED_THRESHOLDS.crew} CCI</strong>. Emptying a reserve ends the
            mission early.
          </p>
        </div>
      </section>

      {event ? (
        <aside className="event-alert" aria-labelledby="event-heading">
          <div>
            <h2 id="event-heading">
              <span aria-hidden="true">⚠</span> Cycle {event.cycle}: {event.title}
            </h2>
            <p>{event.warning}</p>
          </div>
          <span className="tag">Event this cycle</span>
        </aside>
      ) : null}

      <section className="resources" aria-labelledby="resources-heading">
        <div className="section-head">
          <h2 id="resources-heading">Outpost status</h2>
          <p>Values are simplified game units, not measurements.</p>
        </div>
        <div className="card-grid">
          {CARD_ORDER.map((key) => (
            <ResourceCard key={key} resource={key} value={resources[key]} />
          ))}
        </div>
      </section>

      <div className="dashboard-columns">
        <section className="decisions" aria-labelledby="decisions-heading">
          <div className="section-head">
            <h2 id="decisions-heading">Choose one action for cycle {cycle}</h2>
            <p>Costs are paid before the cycle's upkeep.</p>
          </div>
          <div className="decision-grid">
            {availability.map(({ action, available, reason }) => (
              <button
                key={action.id}
                type="button"
                className="decision-card"
                aria-disabled={!available}
                onClick={() => {
                  if (available) onChoose(action.id);
                }}
              >
                <span className="decision-top">
                  <span className="decision-title">{action.label}</span>
                  <span className="tag">{action.once ? "One time" : "Repeatable"}</span>
                </span>
                <span className="decision-summary">{action.summary}</span>
                <span className="decision-econ">
                  <span className="econ">
                    <span className="econ-label">Cost</span>
                    <span className="econ-cost">{action.costText}</span>
                  </span>
                  <span className="econ">
                    <span className="econ-label">Gain</span>
                    <span className="econ-gain">{action.benefitText}</span>
                  </span>
                </span>
                <span className="decision-cta">
                  {available ? "Commit action" : reason}
                  {available ? (
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </section>

        <aside className="side" aria-label="Context and history">
          <ScienceNoteCard note={focus.note} heading={focus.heading} />

          <details className="panel rules">
            <summary>How a cycle resolves</summary>
            <div className="rules-body">
              <ol className="cycle-steps">
                <li>Pay the action's cost, then apply its benefit.</li>
                <li>Add solar generation and subtract the base power demand.</li>
                <li>Subtract water, oxygen, and food for crew upkeep.</li>
                <li>Resolve this cycle's scripted event.</li>
                <li>Check for empty reserves, then start the next cycle.</li>
              </ol>
              <p className="fineprint" style={{ marginTop: "12px" }}>
                Generation is {state.solarServiced ? "15 PU with the serviced array" : "10 PU with the standard array"}.
                Base demand is 13 PU.
              </p>
            </div>
          </details>

          <section className="panel" aria-labelledby="history-heading">
            <div className="section-head" style={{ marginBottom: "12px" }}>
              <h2 id="history-heading">Recent decisions</h2>
            </div>
            {recent.length === 0 ? (
              <p className="fineprint">No cycles resolved yet. Your changes will appear here.</p>
            ) : (
              <ul className="history-list">
                {recent.map((record) => {
                  const delta = diffResources(record.before, record.after);
                  return (
                    <li className="history-item" key={record.cycle}>
                      <div className="history-head">
                        <span>Cycle {record.cycle}</span>
                        {record.eventTitle ? <span>{record.eventTitle}</span> : null}
                      </div>
                      <p className="history-title">{record.actionLabel}</p>
                      <div className="history-deltas">
                        {Object.entries(delta).map(([key, value]) => (
                          <DeltaChip
                            key={key}
                            resource={key as ResourceKey}
                            delta={value ?? 0}
                          />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <button type="button" className="btn btn-quiet" style={{ marginTop: "16px" }} onClick={onOpenSources}>
              Science sources
            </button>
          </section>
        </aside>
      </div>

      <div className="report-actions">
        <button type="button" className="btn btn-quiet" onClick={onRestart}>
          Restart mission
        </button>
        <p className="report-next">
          Restarting returns to the title screen and clears this run from this browser.
        </p>
      </div>
    </main>
  );
}
