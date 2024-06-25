import * as esbuild from "esbuild";

const widgets = ["example"];

await esbuild.build({
  entryPoints: [...widgets.map((widget) => `widgets/${widget}/widget.ts`)],
  bundle: true,
  outdir: "dist",
  loader: {
    ".hbs": "text",
    ".css": "text",
  },
});
