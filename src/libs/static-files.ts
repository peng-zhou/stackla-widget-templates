import fs, { readFileSync } from "fs"
import path from "path"

export const WIDGET_PATH = "../../../../../node_modules/@stackla/ugc-widgets/dist"

export function loadStaticFileRoutes(expressApp) {
  const serveStaticFile = (route, fileName, contentType = "text/javascript") => {
    expressApp.get(route, (req, res) => {
      const code = readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/${fileName}`), "utf8")
      res.set("Content-Type", contentType)
      res.send(code)
    })
  }

  serveStaticFile("/expanded-tile.js", "expanded-tile.js")
  serveStaticFile("/shopspots.js", "shopspots.js")
  serveStaticFile("/google-analytics.js", "google-analytics.js")
  serveStaticFile("/cross-sellers.js", "cross-sellers.js")
  serveStaticFile("/add-to-cart.js", "add-to-cart.js")
  serveStaticFile("/products.js", "products.js")

  expressApp.get("/core.js", (req, res) => {
    const jsCode = fs.readFileSync(path.resolve(__dirname, `${WIDGET_PATH}/core.js`), "utf8")
    const parsedCode = jsCode
      .replace(/https:\/\/widget-data.stackla.com/g, "http://localhost:4003")
      .replace(/https:\/\/widget-ui.stackla.com/g, "http://localhost:4003")
      .replace(/\/tiles\?/g, `/tiles?widgetType=${req.query.widgetType}&`)
    res.send(parsedCode)
  })
}
