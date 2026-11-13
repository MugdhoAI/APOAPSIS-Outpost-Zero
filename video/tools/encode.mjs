// Builds the 30 second demo: real screencast frames -> timed base -> cuts ->
// captions -> end card. All footage comes from capture/frames.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const FFMPEG = require("@ffmpeg-installer/ffmpeg").path;
const FFPROBE = require("@ffprobe-installer/ffprobe").path;

const CAPTURE = path.resolve("capture");
const EXPORTS = path.resolve("../../video/exports");
fs.mkdirSync(EXPORTS, { recursive: true });

const FONT = "C\\:/Windows/Fonts/segoeuib.ttf";

const SEGMENTS = [
  { mark: "title", offset: 0.4, dur: 2.6, caption: "One outpost. Five cycles. One decision at a time." },
  { mark: "briefing", offset: 0.35, dur: 2.5, caption: "Four crew, six systems, one shared budget." },
  { mark: "dashboard", offset: 0.3, dur: 2.4, caption: "Every action spends a reserve the crew needs." },
  { mark: "decision5", offset: 0.2, dur: 3.9, caption: "Cycle 5: the last decision of the mission." },
  { mark: "report-top", offset: 0.25, dur: 2.0, caption: "Food rises. Power and water fall." },
  { mark: "changes", offset: 0.15, dur: 2.0, caption: "The report itemises each change and its cause." },
  { mark: "why", offset: 0.3, dur: 2.4, caption: "Then it explains why, with a NASA source." },
  { mark: "debrief", offset: 0.25, dur: 2.4, caption: "Five cycles end in a clear debrief." },
  { mark: "notes", offset: 0.12, dur: 2.0, caption: "Two takeaways, each with its source." },
];

const END_CARD_DURATION = 3.0;
const TAIL_HOLD = 4.0;

const timeline = JSON.parse(fs.readFileSync(path.join(CAPTURE, "timeline.json"), "utf8"));
const frames = JSON.parse(fs.readFileSync(path.join(CAPTURE, "frames.json"), "utf8"));
const marks = Object.fromEntries(timeline.marks.map((entry) => [entry.label, entry.time]));

// ---- 1. Timed base video ---------------------------------------------------

const listLines = [];
frames.forEach((frame, index) => {
  const duration = index + 1 < frames.length ? frames[index + 1].ts - frame.ts : TAIL_HOLD;
  const file = path.join(CAPTURE, "frames", frame.file).replace(/\\/g, "/");
  listLines.push(`file '${file}'`, `duration ${Math.max(duration, 0.01).toFixed(3)}`);
});
const lastFile = path.join(CAPTURE, "frames", frames[frames.length - 1].file).replace(/\\/g, "/");
listLines.push(`file '${lastFile}'`, `duration ${TAIL_HOLD.toFixed(3)}`);
fs.writeFileSync(path.join(CAPTURE, "list.txt"), `${listLines.join("\n")}\n`);

const basePath = path.join(CAPTURE, "base.mp4");
execFileSync(
  FFMPEG,
  [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    path.join(CAPTURE, "list.txt"),
    "-vf",
    "fps=30,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "16",
    "-an",
    basePath,
  ],
  { stdio: "inherit" },
);

// ---- 2. Cut, caption, and join --------------------------------------------

const baseDuration = frames[frames.length - 1].ts + TAIL_HOLD;
let cursor = 0;
const filters = [];
const concatInputs = [];
const captions = [];

SEGMENTS.forEach((segment, index) => {
  const start = marks[segment.mark] + segment.offset;
  if (start + segment.dur > baseDuration + 0.05) {
    throw new Error(
      `Segment ${segment.mark} runs past the captured footage: ${start + segment.dur} > ${baseDuration}`,
    );
  }
  const nextMark = timeline.marks.find((entry) => entry.time > marks[segment.mark]);
  if (nextMark && start + segment.dur > nextMark.time + 0.05) {
    console.warn(
      `Segment ${segment.mark} overlaps the next screen: ends ${(start + segment.dur).toFixed(2)}, next mark ${nextMark.time}`,
    );
  }

  filters.push(
    `[0:v]trim=start=${start.toFixed(3)}:end=${(start + segment.dur).toFixed(3)},setpts=PTS-STARTPTS,format=yuv420p,setsar=1[v${index}]`,
  );
  concatInputs.push(`[v${index}]`);

  const from = cursor;
  const to = cursor + segment.dur;
  const text = segment.caption.replace(/:/g, "\\:").replace(/'/g, "’");

  captions.push(
    `drawtext=fontfile='${FONT}':text='${text}':fontcolor=white:fontsize=30:box=1:boxcolor=black@0.72:boxborderw=14:x=(w-text_w)/2:y=h-74:shadowcolor=black@0.55:shadowx=0:shadowy=2:enable='between(t,${from.toFixed(2)},${to.toFixed(2)})'`,
  );

  console.log(
    `${segment.mark.padEnd(12)} ${start.toFixed(2)}s +${segment.dur}s  ->  ${from.toFixed(2)}–${to.toFixed(2)}s`,
  );
  cursor = to;
});

const totalDuration = cursor + END_CARD_DURATION;

filters.push(
  `[1:v]fps=30,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,trim=duration=${END_CARD_DURATION},setpts=PTS-STARTPTS[end]`,
);
concatInputs.push("[end]");
filters.push(`${concatInputs.join("")}concat=n=${concatInputs.length}:v=1:a=0[joined]`);
filters.push(
  `[joined]${captions.join(",")},fade=t=in:st=0:d=0.4,fade=t=out:st=${(totalDuration - 0.5).toFixed(2)}:d=0.5[vout]`,
);

const outPath = path.join(EXPORTS, "apoapsis_outpost_zero_30s.mp4");

execFileSync(
  FFMPEG,
  [
    "-y",
    "-i",
    basePath,
    "-loop",
    "1",
    "-i",
    path.join(CAPTURE, "endcard.png"),
    "-f",
    "lavfi",
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=48000",
    "-filter_complex",
    filters.join(";"),
    "-map",
    "[vout]",
    "-map",
    "2:a",
    "-t",
    totalDuration.toFixed(2),
    "-r",
    "30",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "19",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    "-movflags",
    "+faststart",
    outPath,
  ],
  { stdio: "inherit" },
);

const probe = execFileSync(FFPROBE, [
  "-v",
  "error",
  "-show_entries",
  "format=duration,size,format_name:stream=codec_name,codec_type,width,height,r_frame_rate,channels",
  "-of",
  "json",
  outPath,
]).toString();

console.log(probe);
console.log(`wrote ${outPath} (timeline ${totalDuration.toFixed(2)}s)`);
