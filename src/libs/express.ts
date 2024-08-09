import express from "express"
import "hbs"
import { WidgetRequest } from "@stackla/ugc-widgets"
import cors from "cors"
import path from "path"
import { readFileSync } from "fs"
import * as hbs from 'hbs'

const expressApp = express()
expressApp.use((_req, res, next) => {
  res.set("Cache-Control", "public, max-age=300")
  next()
})
expressApp.use(express.static("dist/widgets", { redirect: false }))
expressApp.engine('hbs', hbs.__express)
expressApp.set('view engine', 'hbs')
expressApp.use(cors({
  origin: "*"
}))

const stripSymbols = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "")

// Register preview route
expressApp.get("/preview", (req, res) => {
  const widgetRequest = req.query as WidgetRequest
  const widgetType = req.query.widgetType
  if (!widgetType) {
    return res.status(400).send("widgetType is required")
  }

  const rootDir = path.resolve(__dirname, `../../../../../dist/widgets/${widgetType}`)

  const layout = `${rootDir}/layout.hbs`
  const tile = `${rootDir}/tile.hbs`
  const css = `${rootDir}/widget.css`
  const js = `${rootDir}/widget.js`

  const layoutFileContents = readFileSync(layout, "utf8")
  const tileFileContents = readFileSync(tile, "utf8")
  const cssFileContents = readFileSync(css, "utf8")
  const jsFileContents = readFileSync(js, "utf8")

  res.set("Content-Type", "text/javascript")

  res.render("preview", {
    widgetRequest: JSON.stringify(widgetRequest),
    layoutCode: layoutFileContents,
    tileCode: tileFileContents,
    cssCode: cssFileContents,
    jsCode: jsFileContents
      .replace(/\\/g, "\\\\")
      .replace(/\"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
  })
})

expressApp.get("/autoload", (req, res) => {
  if (!req.query['selector']) {
    return res.status(400).send("widgetSelector is required")
  }

  if (!req.query['widget']) {
    return res.status(400).send("widgetType is required")
  }

  if (!req.query['resource']) {
    return res.status(400).send("resourceType is required")
  }

  const resource = req.query.resource as string;
  const widgetType = req.query.widget as string;
  const widgetSelector = req.query.selector as string;
  const resourceWithoutSymbols = stripSymbols(resource)
  const widgetTypeWithoutSymbols = stripSymbols(widgetType)
  const widgetSrc = `dist/widgets/${widgetTypeWithoutSymbols}/widget.${resourceWithoutSymbols}`
  const jsCode = readFileSync(widgetSrc, "utf8")

  res.render("autoload", {
    widgetSelector,
    jsCode
  })
});

export default expressApp
