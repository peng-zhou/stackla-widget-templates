const esbuild = require("esbuild")
const { sassPlugin } = require("esbuild-sass-plugin")
const { copy } = require("esbuild-plugin-copy")
const sass = require("sass")
const { globSync } = require("glob")
const fs = require("fs")
const env = process.env.APP_ENV || "development"

const preAndPostBuild = {
  name: "preAndPost",
  setup(build) {
    // Cleanup dist before build
    build.onStart(() => {
      fs.rmSync("./dist", { recursive: true, force: true })
    })

    build.onEnd(() => {
      globSync("./widgets/**/widget.scss", { withFileTypes: true }).forEach(path => {
        const result = sass.compile(path.relative(), {
          style: env === "development" ? "expanded" : "compressed"
        })
        fs.writeFileSync(`dist/${path.parent.name}/widget.css`, result.css.toString())
      })
    })
  }
}

/** @type {esbuild.BuildOptions} */
const config = {
  entryPoints: [...globSync("./widgets/**/widget.ts")],
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
      type: "css-text",
      minify: true,
      importMapper: path => {
        path.replace(/^@styles\//, path.join(__dirname, "widgets/styles/"))
      }
    }),
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: ["./widgets/**/*.hbs"],
          to: ["./dist"]
        }
      ]
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
