import * as esbuild from "esbuild";

import fs from "fs";
const widgets = fs.readdirSync("widgets");

await esbuild.build({
  entryPoints: [...widgets.map((widget) => `widgets/${widget}/widget.ts`)],
  bundle: true,
  outdir: "dist",
  loader: {
    ".hbs": "text",
    ".css": "text",
  },
});
