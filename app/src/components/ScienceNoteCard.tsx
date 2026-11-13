import { getSource } from "../data/sources";
import type { ScienceLabel, ScienceNote } from "../game/types";

const TAG_CLASS: Record<ScienceLabel, string> = {
  "NASA fact": "tag-fact",
  "Data-derived context": "tag-derived",
  "Game assumption": "tag-assumption",
};

type ScienceNoteCardProps = {
  note: ScienceNote;
  heading?: string;
};

export function ScienceNoteCard({ note, heading }: ScienceNoteCardProps) {
  const source = note.sourceId ? getSource(note.sourceId) : undefined;

  return (
    <div className="science-card">
      {heading ? <h2>{heading}</h2> : null}
      <p>{note.text}</p>
      <div className="source-line">
        <span className={`tag ${TAG_CLASS[note.label]}`}>{note.label}</span>
        {source ? (
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.title}
            <span className="sr-only"> (opens in a new tab)</span> ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}
