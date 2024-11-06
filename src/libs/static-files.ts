import fs from "fs"
import path from "path"

export const WIDGET_PATH = "../../../../../node_modules/@stackla/ugc-widgets/dist"

const TEST_HOST = "http://localhost:4003"
const DEV_HOST = "http://localhost:4002"

function getComponentFilePaths() {
  const components = [
    "core",
    "expanded-tile",
    "shopspots",
    "google-analytics",
    "cross-sellers",
    "add-to-cart",
    "products",
    "load-more",
    "user-content"
  ]

  return components.map(component => path.resolve(__dirname, `${WIDGET_PATH}/${component}.js`))
}

export function loadStaticFileRoutes(expressApp) {
  getComponentFilePaths().forEach(componentPath => {
    const jsCode = fs.readFileSync(componentPath, "utf8")
    const componentName = path.basename(componentPath, ".js")

    expressApp.get(`/${componentName}.js`, async (req, res) => {
      const host = req.headers.host || TEST_HOST
      const port = host.split(":")[1]
      if (port == 4003) {
        // This is a local engineer
        const fileRequest = await fetch(`${DEV_HOST}/${componentName}.js`)
        const fileContent = await fileRequest.text()
        res.setHeader("Content-Type", "application/javascript")
        res.send(fileContent)
        return
      }

      const parsedCode = jsCode
        .replace(/https:\/\/widget-data.stackla.com/g, `http://localhost:${port}`)
        .replace(/https:\/\/widget-ui.stackla.com/g, `http://localhost:${port}`)
        .replace(/\/tiles\?/g, `/tiles?widgetType=${req.query.widgetType}&`)
        .replace(/https:\/\/my.stackla.com\/cs\/image\/disable/g, `${DEV_HOST}/stackla/cs/image/disable`)

      res.setHeader("Content-Type", "application/javascript")
      res.send(parsedCode)
    })
  })
}
