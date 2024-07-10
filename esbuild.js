import * as esbuild from "esbuild";
import {sassPlugin} from 'esbuild-sass-plugin'
import * as sass from 'sass';
import * as fs from 'fs';

const env = process.env.APP_ENV || 'development';


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

if (env == 'development') {
  config.minify = false;
  config.sourcemap = 'inline';
  esbuild.build(config);
} else {
  await esbuild.build(config);
}

widgets.forEach((widget) => {
  const result = sass.compile(`widgets/${widget}/widget.scss`, {
    style: env === 'development' ? 'expanded' : 'compressed'
  });
  fs.writeFileSync(`dist/${widget}/widget.css`, result.css.toString());
});