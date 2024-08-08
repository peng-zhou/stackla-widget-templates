const esbuild = require("esbuild")
const { sassPlugin } = require("esbuild-sass-plugin")
const sass = require("sass")
const fs = require("fs")
const path = require("path")
const env = process.env.APP_ENV || "development"

const widgets = ["carousel", "nightfall", "waterfall"]

const config = {
  entryPoints: [...widgets.map(widget => `widgets/${widget}/widget.ts`)],
  bundle: true,
  outdir: "dist/widgets",
  loader: {
    ".hbs": "text",
    ".css": "text"
  },
  minify: true,
  plugins: [
    sassPlugin({
      type: "css-text",
      minify: true
    })
  ]
}

if (env == "development") {
  config.minify = false
  config.sourcemap = "inline"
  esbuild.build(config)
} else {
  esbuild.build(config)
}

const ensureDirectoryExistence = filePath => {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

widgets.forEach(widget => {
  const result = sass.compile(`widgets/${widget}/widget.scss`, {
    style: env === "development" ? "expanded" : "compressed"
  })

  const widgetCSSPath = `dist/widgets/${widget}/widget.css`
  const tileHbsSourcePath = `widgets/${widget}/tile.hbs`
  const widgetHbsSourcePath = `widgets/${widget}/layout.hbs`

  ensureDirectoryExistence(widgetCSSPath)
  fs.writeFileSync(widgetCSSPath, result.css.toString())

  ensureDirectoryExistence(tileHbsSourcePath)
  const tileHbs = fs.readFileSync(tileHbsSourcePath, "utf8")
  fs.writeFileSync(`dist/widgets/${widget}/tile.hbs`, tileHbs)

  ensureDirectoryExistence(widgetHbsSourcePath)
  const widgetHbs = fs.readFileSync(widgetHbsSourcePath, "utf8")
  fs.writeFileSync(`dist/widgets/${widget}/layout.hbs`, widgetHbs)
})
