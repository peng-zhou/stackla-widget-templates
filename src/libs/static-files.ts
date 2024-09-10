import fs, { readFileSync } from "fs"
import path from "path"

export const WIDGET_PATH = "../../../../../node_modules/@stackla/ugc-widgets/dist"

export function loadStaticFileRoutes(expressApp) {
  expressApp.get("/expanded-tile.js", (req, res) => {
    const code = readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/expanded-tile.js`), "utf8")
    res.set("Content-Type", "text/javascript")
    res.send(code)
  })

  expressApp.get("/shopspots.js", (req, res) => {
    const code = readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/shopspots.js`), "utf8")
    res.set("Content-Type", "text/javascript")
    res.send(code)
  })

  expressApp.get("/google-analytics.js", (req, res) => {
    const code = readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/google-analytics.js`), "utf8")
    res.set("Content-Type", "text/javascript")
    res.send(code)
  })

  expressApp.get("/cross-sellers.js", (req, res) => {
    const code = readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/cross-sellers.js`), "utf8")
    res.set("Content-Type", "text/javascript")
    res.send(code)
  })

  expressApp.get("/add-to-cart.js", (req, res) => {
    const code = readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/add-to-cart.js`), "utf8")
    res.set("Content-Type", "text/javascript")
    res.send(code)
  })

  expressApp.get("/products.js", (req, res) => {
    const code = readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/products.js`), "utf8")
    res.set("Content-Type", "text/javascript")
    res.send(code)
  })

  expressApp.get("/core.js", (req, res) => {
    const jsCode = fs.readFileSync(
      path.resolve(__dirname, `${WIDGET_PATH}/core.js`),
      "utf8"
    )
    const parsedCode = jsCode
      .replace(/https:\/\/widget-data.stackla.com/g, "http://localhost:4002")
      .replace(/https:\/\/widget-ui.stackla.com/g, "http://localhost:4002")
      .replace(/\/tiles\?/g, `/tiles?widgetType=${req.query.widgetType}&`)
    res.send(parsedCode)
  })
}
