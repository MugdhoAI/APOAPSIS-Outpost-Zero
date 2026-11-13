import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Relative base keeps the built bundle portable: it works at a domain root,
// in a GitHub Pages project subfolder, and on any static host.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { port: 5173 },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
