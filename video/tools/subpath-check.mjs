// Serves the built bundle from a subfolder to prove the relative base works
// on GitHub Pages style URLs. Run: node subpath-check.mjs
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve("../../app/dist");
const site = path.resolve("capture/subpath-site/outpost-zero");
fs.rmSync(path.dirname(site), { recursive: true, force: true });
fs.mkdirSync(site, { recursive: true });
fs.cpSync(root, site, { recursive: true });

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(path.dirname(site), urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }
  if (!fs.existsSync(filePath)) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, { "content-type": types[path.extname(filePath)] ?? "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(4180, () => console.log("http://localhost:4180/outpost-zero/"));
