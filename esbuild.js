import * as esbuild from "esbuild";

const widgets = [
  'carousel',
  'nightfall'
]

await esbuild.build({
  entryPoints: [...widgets.map((widget) => `widgets/${widget}/widget.ts`)],
  bundle: true,
  outdir: "dist",
  loader: {
    ".hbs": "text",
    ".css": "text",
  },
});
