const esbuild = require("esbuild")
const { sassPlugin } = require("esbuild-sass-plugin")
const { copy } = require("esbuild-plugin-copy")
const sass = require("sass")
const fs = require("fs")
const env = process.env.APP_ENV || "development"

const widgets = ["carousel", "nightfall", "waterfall"]

let preAndPostBuild = {
  name: "preAndPost",
  setup(build) {
    // Load paths tagged with the "env-ns" namespace and behave as if
    // they point to a JSON file containing the environment variables.
    build.onStart(() => {
      fs.rmSync("./dist", { recursive: true, force: true })
    })

    if (env === "development") {
      build.onEnd(result => {
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
