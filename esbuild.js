import * as esbuild from "esbuild";
import {sassPlugin} from 'esbuild-sass-plugin'

const widgets = [
  'carousel',
  'nightfall',
  'waterfall'
]

const config = {
  entryPoints: [...widgets.map((widget) => `widgets/${widget}/widget.ts`)],
  bundle: true,
  outdir: "dist",
  loader: {
    ".hbs": "text",
    ".css": "text"
  },
  minify: true,
  plugins: [sassPlugin({
    type: "css-text",
    minify: true
  })],
}

if (process.env.APP_ENV == 'development') {
  config.minify = false;
  config.sourcemap = 'inline';
  const context = await esbuild.context(config);
  await context.watch();
} else {
  await esbuild.build(config);
}