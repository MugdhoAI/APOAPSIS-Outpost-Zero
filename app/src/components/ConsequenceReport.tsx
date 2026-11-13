import { RESOURCE_META, RESOURCE_ORDER } from "../game/constants";
import type { CycleReport, MissionStatus, ResourceKey } from "../game/types";
import { DeltaChip } from "./DeltaChip";
import { ScienceNoteCard } from "./ScienceNoteCard";

const STEP_KIND_LABEL = {
  action: "Decision",
  power: "Power",
  consumption: "Upkeep",
  event: "Event",
} as const;

type ConsequenceReportProps = {
  report: CycleReport;
  status: MissionStatus;
  maxCycles: number;
  onContinue: () => void;
};

export function ConsequenceReport({
  report,
  status,
  maxCycles,
  onContinue,
}: ConsequenceReportProps) {
  const finished = status !== "active";
  const nextCycle = report.cycle + 1;

  return (
    <main className="container report" id="main">
      <div className="report-head">
        <p className="eyebrow">
          Cycle {report.cycle} of {maxCycles} · Consequence report
        </p>
        <h1>{report.action.label}</h1>
        <p className="report-lede">{report.tradeOff}</p>
      </div>

      <div className="report-grid">
        <section className="panel" aria-labelledby="changed-heading">
          <div className="section-head">
            <h2 id="changed-heading">What changed</h2>
            <p>Before the cycle and after the cycle.</p>
          </div>
          <table className="table">
            <caption className="sr-only">
              Resource values before and after cycle {report.cycle}
            </caption>
            <thead>
              <tr>
                <th scope="col">Resource</th>
                <th scope="col" className="num">
                  Before
                </th>
                <th scope="col" className="num">
                  After
                </th>
                <th scope="col">Change</th>
              </tr>
            </thead>
            <tbody>
              {RESOURCE_ORDER.map((key) => {
                const meta = RESOURCE_META[key];
                const change = report.after[key] - report.before[key];
                return (
                  <tr key={key}>
                    <td className="resource-name">
                      {meta.name} <span className="unit-cell">{meta.unit}</span>
                    </td>
                    <td className="num">{report.before[key]}</td>
                    <td className="num">{report.after[key]}</td>
                    <td>
                      {change === 0 ? (
                        <span className="unit-cell">No change</span>
                      ) : (
                        <DeltaChip resource={key} delta={change} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="panel" aria-labelledby="order-heading">
          <div className="section-head">
            <h2 id="order-heading">How the cycle resolved</h2>
            <p>In the same order every turn.</p>
          </div>
          <ol className="steps">
            {report.steps.map((step, index) => {
              const entries = Object.entries(step.delta);
              return (
                <li className={`step ${step.kind === "event" ? "is-event" : ""}`} key={`${step.kind}-${index}`}>
                  <span className="step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="step-body">
                    <div className="step-head">
                      <span className="step-title">{step.label}</span>
                      <span className="step-kind">{STEP_KIND_LABEL[step.kind]}</span>
                    </div>
                    <p className="step-detail">{step.detail}</p>
                    {entries.length > 0 ? (
                      <div className="step-deltas">
                        {entries.map(([key, value]) => (
                          <DeltaChip key={key} resource={key as ResourceKey} delta={value ?? 0} />
                        ))}
                      </div>
                    ) : (
                      <div className="step-deltas">
                        <span className="unit-cell">No reserve change</span>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      {report.event ? (
        <section className="panel event-outcome" aria-labelledby="event-outcome-heading">
          <h2 id="event-outcome-heading">
            <span aria-hidden="true">⚠</span> {report.event.title}
          </h2>
          <p>{report.steps.find((step) => step.kind === "event")?.detail}</p>
          <p className="fineprint" style={{ marginTop: "8px" }}>
            This is a scripted teaching rule, not a measured lunar effect or a radiation model.
          </p>
        </section>
      ) : null}

      <section className="why-block" aria-labelledby="why-heading">
        <h2 id="why-heading">Why this mattered</h2>
        <p className="tradeoff-text">{report.tradeOff}</p>
        <div style={{ marginTop: "16px" }}>
          <ScienceNoteCard note={report.action.science} />
        </div>
      </section>

      {report.warnings.length > 0 ? (
        <div className="warning-list" aria-label="Reserve warnings">
          {report.warnings.map((warning) => (
            <p className="warning-item" key={warning}>
              <span aria-hidden="true">⚠</span> {warning}
            </p>
          ))}
        </div>
      ) : null}

      {report.status === "failed" ? (
        <section className="failure-block" aria-labelledby="failure-heading">
          <h2 id="failure-heading">Mission ended at cycle {report.cycle}</h2>
          <ul>
            {report.failureReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <p className="fineprint" style={{ marginTop: "12px" }}>
            Nothing recovered that system in time. The debrief shows the reserve that ran out and
            what your decisions spent.
          </p>
        </section>
      ) : null}

      <div className="report-actions">
        <button type="button" className="btn btn-primary btn-lg" onClick={onContinue}>
          {finished ? "View mission debrief" : `Continue to cycle ${nextCycle}`}
        </button>
        <p className="report-next">
          {finished
            ? "The mission is over. The debrief shows final values and your decision history."
            : "The next cycle starts with the values shown above."}
        </p>
      </div>
    </main>
  );
}
