import * as esbuild from "esbuild";
const options = {
  entryPoints: {
    index: "src/extension.js",
    formatter: "src/formatter/worker.js",
  },
  outdir: "extension",
  bundle: true,
  platform: "node",
  mainFields: ["module", "main"],
  format: "cjs",
  target: "node18",
  // src/emmet.js only registers for the "twig" language ID; this extension uses "html".
  external: ["vscode", "@vscode/emmet-helper"],
  legalComments: "linked",
  logLevel: "info",
};
if (process.argv.includes("--watch")) {
  const context = await esbuild.context(options);
  await context.watch();
} else await esbuild.build(options);
