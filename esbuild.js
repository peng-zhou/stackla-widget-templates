const esbuild = require("esbuild")
const { sassPlugin } = require("esbuild-sass-plugin")
const { copy } = require("esbuild-plugin-copy")
const sass = require("sass")
const fs = require("fs")
const env = process.env.APP_ENV || "development"

// extracting widget styling and entrypoint
const widgetPaths = fs
  .readdirSync("./widgets", { withFileTypes: true })
  .filter(it => it.isDirectory())
  .filter(dir => fs.existsSync(`./widgets/${dir.name}/widget.scss`))
  .map(matched => ({
    scss: `./widgets/${matched.name}/widget.scss`,
    dist: `dist/${matched.name}/widget.css`,
    entryPoint: `widgets/${matched.name}/widget.ts`
  }))

const preAndPostBuild = {
  name: "preAndPost",
  setup(build) {
    // Cleanup dist before build
    build.onStart(() => {
      fs.rmSync("./dist", { recursive: true, force: true })
    })

    build.onEnd(() => {
      widgetPaths.forEach(path => {
        const result = sass.compile(path.scss, {
          style: env === "development" ? "expanded" : "compressed"
        })
        fs.writeFileSync(path.dist, result.css.toString())
      })
    })
  }
}

/** @type {esbuild.BuildOptions} */
const config = {
  entryPoints: [...widgetPaths.map(path => path.entryPoint)],
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
