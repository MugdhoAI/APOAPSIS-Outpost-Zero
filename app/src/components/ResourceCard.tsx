import { RESOURCE_META, getResourceStatus } from "../game/constants";
import type { ResourceKey } from "../game/types";

const STATUS_TEXT = {
  stable: "Stable",
  low: "Low",
  critical: "Critical",
} as const;

type ResourceCardProps = {
  resource: ResourceKey;
  value: number;
};

export function ResourceCard({ resource, value }: ResourceCardProps) {
  const meta = RESOURCE_META[resource];
  const status = getResourceStatus(resource, value);
  const percentage = Math.max(0, Math.min(100, value));

  return (
    <article className={`resource-card is-${status}`}>
      <header>
        <h3>{meta.name}</h3>
        <span className="resource-unit">{meta.unit}</span>
      </header>
      <p className="resource-value">{value}</p>
      <div
        className="meter"
        role="img"
        aria-label={`${meta.name}: ${value} of 100 ${meta.unit}`}
      >
        <span className="meter-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className={`status-line is-${status}`}>
        <span className="dot" aria-hidden="true" />
        {STATUS_TEXT[status]}
        <span className="sr-only"> {meta.name}</span>
      </p>
    </article>
  );
}
