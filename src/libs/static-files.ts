import fs, { readFileSync } from "fs"
import path from "path"

export const WIDGET_PATH = "../../../../../node_modules/@stackla/ugc-widgets/dist"

function getComponentFilePaths() {
  const components = ['core', 'expanded-tile', 'shopspots', 'google-analytics', 'cross-sellers', 'add-to-cart', 'products'];

  return components.map(component => path.resolve(__dirname, `${WIDGET_PATH}/${component}.js`));
}

export function loadStaticFileRoutes(expressApp) {
  getComponentFilePaths().forEach((componentPath) => {
    const jsCode = fs.readFileSync(componentPath, "utf8")
    const componentName = path.basename(componentPath, '.js')

    expressApp.get(`/${componentName}.js`, (req, res) => {
      const parsedCode = jsCode
        .replace(/https:\/\/widget-data.stackla.com/g, "http://localhost:4003")
        .replace(/https:\/\/widget-ui.stackla.com/g, "http://localhost:4003")
        .replace(/\/tiles\?/g, `/tiles?widgetType=${req.query.widgetType}&`)
      
      res.setHeader("Content-Type", "application/javascript")
      res.send(parsedCode)
    })
  });
}
