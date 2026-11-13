// Renders the end card HTML to a 1280x720 PNG.

import path from "node:path";
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1280, height: 720, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
await page.goto(`file://${path.resolve("endcard.html").replace(/\\/g, "/")}`, {
  waitUntil: "load",
});
await page.screenshot({ path: path.resolve("capture/endcard.png") });
await browser.close();
console.log("wrote capture/endcard.png");
