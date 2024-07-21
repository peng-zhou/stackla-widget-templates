const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');
const sass = require('sass');
const fs = require('fs');

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
  esbuild.build(config);
}

widgets.forEach((widget) => {
  const result = sass.compile(`widgets/${widget}/widget.scss`, {
    style: env === 'development' ? 'expanded' : 'compressed'
  });
  fs.writeFileSync(`dist/${widget}/widget.css`, result.css.toString());

  const tileHbs = fs.readFileSync(`widgets/${widget}/tile.hbs`, 'utf8');
  fs.writeFileSync(`dist/${widget}/tile.hbs`, tileHbs);

  const widgetHbs = fs.readFileSync(`widgets/${widget}/layout.hbs`, 'utf8');
  fs.writeFileSync(`dist/${widget}/layout.hbs`, widgetHbs);
});