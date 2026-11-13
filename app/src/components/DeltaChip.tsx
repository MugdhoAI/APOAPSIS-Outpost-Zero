import { RESOURCE_META } from "../game/constants";
import type { ResourceKey } from "../game/types";

type DeltaChipProps = {
  resource: ResourceKey;
  delta: number;
};

export function DeltaChip({ resource, delta }: DeltaChipProps) {
  if (delta === 0) return null;

  const meta = RESOURCE_META[resource];
  const rising = delta > 0;
  const magnitude = Math.abs(delta);

  return (
    <span className={`delta-chip ${rising ? "delta-up" : "delta-down"}`}>
      <span aria-hidden="true">
        {rising ? "▲" : "▼"} {rising ? "+" : "−"}
        {magnitude} {meta.unit}
      </span>
      <span className="sr-only">
        {meta.shortName} {rising ? "increased" : "decreased"} by {magnitude} {meta.unit}
      </span>
    </span>
  );
}
