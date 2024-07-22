const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');
const sass = require('sass');
const fs = require('fs');
const path = require('path');
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

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

widgets.forEach((widget) => {
  const result = sass.compile(`widgets/${widget}/widget.scss`, {
    style: env === 'development' ? 'expanded' : 'compressed'
  });
  
  const widgetCSSPath = `dist/${widget}/widget.css`;
  const tileHbsPath = `widgets/${widget}/tile.hbs`;
  const widgetHbsPath = `widgets/${widget}/layout.hbs`;

  ensureDirectoryExistence(widgetCSSPath);
  fs.writeFileSync(widgetCSSPath, result.css.toString());

  ensureDirectoryExistence(tileHbsPath);
  const tileHbs = fs.readFileSync(tileHbsPath, 'utf8');
  fs.writeFileSync(`dist/${widget}/tile.hbs`, tileHbs);

  ensureDirectoryExistence(widgetHbsPath);
  const widgetHbs = fs.readFileSync(widgetHbsPath, 'utf8');
  fs.writeFileSync(`dist/${widget}/layout.hbs`, widgetHbs);
});