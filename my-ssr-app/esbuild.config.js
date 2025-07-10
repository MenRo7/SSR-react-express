const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/server/server.jsx"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  outfile: "build/server.js",
  external: ["express", "react", "react-dom/server"],
  sourcemap: true,
}).catch(() => process.exit(1));
