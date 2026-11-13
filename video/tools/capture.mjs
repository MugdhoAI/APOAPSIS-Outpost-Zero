// Records a real playthrough of the production build with Chrome's screencast.
// Every frame comes from the running app. The script only drives the mouse and
// records timestamps; nothing in the page is modified.

import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = path.resolve("capture");
const FRAMES_DIR = path.join(OUT, "frames");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const APP_URL = process.env.APP_URL || "http://localhost:4173/";
const VIEWPORT = { width: 1280, height: 720, deviceScaleFactor: 1.5 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
fs.mkdirSync(FRAMES_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--hide-scrollbars", "--force-color-profile=srgb", "--disable-lcd-text"],
  defaultViewport: VIEWPORT,
});

const page = await browser.newPage();
await page.goto(APP_URL, { waitUntil: "networkidle0" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle0" });
await page.bringToFront();

const client = await page.createCDPSession();
const frames = [];
const marks = [];

client.on("Page.screencastFrame", (frame) => {
  const file = path.join(FRAMES_DIR, `f${String(frames.length).padStart(5, "0")}.jpg`);
  frames.push({ file, ts: frame.metadata.timestamp });
  fs.writeFileSync(file, Buffer.from(frame.data, "base64"));
  client.send("Page.screencastFrameAck", { sessionId: frame.sessionId }).catch(() => {});
});

await client.send("Page.startScreencast", {
  format: "jpeg",
  quality: 92,
  maxWidth: 1920,
  maxHeight: 1080,
  everyNthFrame: 1,
});

function mark(label) {
  const last = frames[frames.length - 1];
  marks.push({ label, index: frames.length, ts: last ? last.ts : 0 });
  console.log(`mark ${label} @ frame ${frames.length}`);
}

async function waitFor(selector) {
  await page.waitForFunction((sel) => Boolean(document.querySelector(sel)), { timeout: 8000 }, selector);
}

async function elementPoint(text, selector) {
  return page.evaluate(
    (sel, txt) => {
      const target = [...document.querySelectorAll(sel)].find((element) =>
        element.innerText.replace(/\s+/g, " ").includes(txt),
      );
      if (!target) return null;
      target.scrollIntoView({ block: "center", behavior: "instant" });
      const rect = target.getBoundingClientRect();
      return { x: Math.round(rect.x + rect.width / 2), y: Math.round(rect.y + rect.height / 2) };
    },
    selector,
    text,
  );
}

async function click(text, { selector = "button", hoverMs = 450, settle = 600 } = {}) {
  const first = await elementPoint(text, selector);
  if (!first) throw new Error(`Could not find "${text}"`);
  await sleep(80);
  const point = await elementPoint(text, selector);
  await page.mouse.move(point.x, point.y, { steps: 12 });
  await sleep(hoverMs);
  await page.mouse.click(point.x, point.y);
  await sleep(settle);
}

async function scrollToHeading(text, waitMs = 2400) {
  await page.evaluate((txt) => {
    const heading = [...document.querySelectorAll("h1, h2, h3")].find(
      (element) => element.innerText.trim() === txt,
    );
    if (!heading) return;
    const top = heading.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }, text);
  await sleep(waitMs);
}

async function centerCard(text, waitMs = 1300) {
  await page.evaluate((txt) => {
    const card = [...document.querySelectorAll("button.decision-card")].find((element) =>
      element.innerText.replace(/\s+/g, " ").includes(txt),
    );
    if (!card) return;
    const top = card.getBoundingClientRect().top + window.scrollY - 210;
    window.scrollTo({ top, behavior: "smooth" });
  }, text);
  await sleep(waitMs);
}

// ---- Playthrough -----------------------------------------------------------

await sleep(700);
mark("title");
await sleep(3200);

await click("Start mission", { settle: 1100 });
await waitFor(".briefing");
mark("briefing");
await sleep(2600);

await click("Enter outpost", { settle: 1100 });
await waitFor(".dashboard");
mark("dashboard");
await sleep(2600);

// Cycles 1 to 4 of the documented balanced path, played quickly.
const quickActions = [
  "Service solar arrays",
  "Reinforce regolith shelter",
  "Service water recovery",
  "Service oxygen generator",
];

for (let index = 0; index < quickActions.length; index += 1) {
  await click(quickActions[index], { selector: "button.decision-card", hoverMs: 220, settle: 750 });
  await waitFor(".report");
  await sleep(600);
  await click("Continue to cycle", { settle: 800 });
  await waitFor(".dashboard");
  await sleep(350);
}

// Cycle 5: the visible trade off the video is built around.
mark("decision5");
await centerCard("Run greenhouse cycle");
await sleep(1600);
await click("Run greenhouse cycle", { selector: "button.decision-card", hoverMs: 900, settle: 500 });
await waitFor(".report");
mark("report-top");
await sleep(1600);

await scrollToHeading("What changed", 2400);
mark("changes");
await sleep(2200);

await scrollToHeading("Why this mattered", 2600);
mark("why");
await sleep(2600);

await click("View mission debrief", { settle: 700 });
await waitFor(".debrief");
mark("debrief");
await sleep(2400);

await scrollToHeading("Two things to take away", 2600);
mark("notes");
await sleep(2400);

await client.send("Page.stopScreencast").catch(() => {});
await sleep(300);

// ---- Timing ----------------------------------------------------------------

const base = frames[0]?.ts ?? 0;
const timeline = marks.map((entry) => ({
  label: entry.label,
  index: entry.index,
  time: Number((entry.ts - base).toFixed(3)),
}));

const total = frames.length ? Number((frames[frames.length - 1].ts - base).toFixed(3)) : 0;

fs.writeFileSync(
  path.join(OUT, "timeline.json"),
  JSON.stringify({ viewport: VIEWPORT, frames: frames.length, total, marks: timeline }, null, 2),
);

fs.writeFileSync(
  path.join(OUT, "frames.json"),
  JSON.stringify(
    frames.map((frame) => ({
      file: path.basename(frame.file),
      ts: Number((frame.ts - base).toFixed(3)),
    })),
    null,
    2,
  ),
);

console.log(JSON.stringify({ frames: frames.length, total, marks: timeline }, null, 2));

await browser.close();
