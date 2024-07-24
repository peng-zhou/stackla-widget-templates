const esbuild = require("esbuild")
const { sassPlugin } = require("esbuild-sass-plugin")
const { copy } = require("esbuild-plugin-copy")
const sass = require("sass")
const fs = require("fs")
const env = process.env.APP_ENV || "development"

const widgets = ["carousel", "nightfall", "waterfall"]

const preAndPostBuild = {
  name: "preAndPost",
  setup(build) {
    // Cleanup dist before build
    build.onStart(() => {
      fs.rmSync("./dist", { recursive: true, force: true })
    })

    // widget.scss compiled only in development mode
    if (env === "development") {
      build.onEnd(() => {
        widgets.forEach(widget => {
          const result = sass.compile(`widgets/${widget}/widget.scss`, {
            style: env === "development" ? "expanded" : "compressed"
          })
          fs.writeFileSync(`dist/${widget}/widget.css`, result.css.toString())
        })
      })
    }
  }
}

/** @type {esbuild.BuildOptions} */
const config = {
  entryPoints: [...widgets.map(widget => `widgets/${widget}/widget.ts`)],
  bundle: true,
  outdir: "dist",
  loader: {
    ".hbs": "text",
    ".css": "text"
  },
  minify: true,
  plugins: [
    preAndPostBuild,
    sassPlugin({
      filter: /\.scss$/,
      type: "css-text",
      minify: true,
      importMapper: path => {
        path.replace(/^@styles\//, path.join(__dirname, "widgets/styles/"))
      }
    })
  ]
}

if (env == "development") {
  config.minify = false
  config.sourcemap = "inline"
  // manully copy handlebar files for development server
  config.plugins.push(
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: ["./widgets/**/*.hbs"],
          to: ["./dist"]
        }
      ]
    })
  )
  esbuild.build(config)
} else {
  esbuild.build(config)
}
