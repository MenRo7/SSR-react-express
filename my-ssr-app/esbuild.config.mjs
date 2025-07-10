import { build } from "esbuild";

build({
  entryPoints: ["src/server/server.jsx"],
  bundle: true,
  platform: "node",
  target: ["node20"],
  format: "esm",
  outfile: "build/server.js",
  external: [
    "express",
    "react",
    "react-dom/server"
  ]
}).catch(() => process.exit(1));
