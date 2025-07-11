const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/main.jsx"],
  outfile: "dist/bundle.js",
  bundle: true,
  format: "cjs",
  loader: { ".js": "jsx", ".jsx": "jsx" },
  sourcemap: true,
  minify: false,
  target: ["esnext"]
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["server/server.jsx"],
  outfile: "build/server.js",
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  loader: { ".js": "jsx", ".jsx": "jsx" },
  external: ["express", "react", "react-dom/server"],
  sourcemap: true
}).catch(() => process.exit(1));
