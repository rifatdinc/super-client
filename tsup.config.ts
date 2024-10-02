import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./backend/main.js", "./backend/preload.js"],
  splitting: false,
  sourcemap: false,
  clean: true,
  cjsInterop: true,
  skipNodeModulesBundle: true,
  treeshake: true,
  outDir: "build",
  external: ["electron"],
  format: ["esm"],
  bundle: true,
});
