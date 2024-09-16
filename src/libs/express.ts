import express from "express"
import "hbs"
import { WidgetRequest } from "@stackla/ugc-widgets"
import cors from "cors"
import path from "path"
import { readFileSync } from "fs"
import * as Handlebars from "hbs"
import tiles from "../../tests/fixtures/tiles.fixtures"
import fs from "fs"
import { getAndRenderTiles, renderTemplates } from "./tile.handlers"
import { loadStaticFileRoutes } from "./static-files"
import widgetOptions from "../../tests/fixtures/widget.options"

export interface IDraftRequest {
  custom_templates: {
    layout: {
      template: string
    }
    tile: {
      template: string
    }
  }
  custom_css: string
  custom_js: string
}

const expressApp = express()
expressApp.use((_req, res, next) => {
  res.set("Cache-Control", "public, max-age=300")
  next()
})
expressApp.use(express.static("dist/widgets", { redirect: false }))
expressApp.engine("hbs", Handlebars.__express)
expressApp.set("view engine", "hbs")
expressApp.use(cors())

const stripSymbols = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "")
const stripSymbolsThatAreNotDash = (str: string) => str.replace(/[^a-zA-Z0-9-]/g, "")

loadStaticFileRoutes(expressApp)

let layoutCode: string, tileCode: string, cssCode: string, jsCode: string

function loadGlobals(widgetType: string) {
  console.log("widgetType: ", widgetType)

  const rootDir = path.resolve(__dirname, `../../../../../dist/widgets/${widgetType}`)

  const layout = `${rootDir}/layout.hbs`
  const tile = `${rootDir}/tile.hbs`
  const css = `${rootDir}/widget.css`
  const js = `${rootDir}/widget.js`

  layoutCode = readFileSync(layout, "utf8")
  tileCode = readFileSync(tile, "utf8")
  cssCode = readFileSync(css, "utf8")
  jsCode = readFileSync(js, "utf8")
    .replace(/\\/g, "\\\\")
    .replace(/\"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
}

expressApp.post("/widgets/668ca52ada8fb/draft", async (req, res) => {
  const body = JSON.parse(req.body)
  const draft = body.draft as IDraftRequest
  const html = await renderTemplates(draft)
  const customCss = draft.custom_css
  const customJs = draft.custom_js

  res.send({
    html,
    customCSS: customCss,
    customJS: customJs,
    widgetOptions: widgetOptions,
    stackId: 1451,
    merchantId: "shopify-64671154416",
    tileCount: 2177,
    enabled: 1
  })
})

expressApp.get("/widgets/668ca52ada8fb/tiles", async (req, res) => {
  res.send({
    tiles: tiles
  })
})

expressApp.get("/widgets/668ca52ada8fb/rendered/tiles", async (req, res) => {
  const tileHtml = await getAndRenderTiles({
    custom_templates: {
      layout: {
        template: layoutCode || ""
      },
      tile: {
        template: tileCode || ""
      }
    },
    custom_css: cssCode || "",
    custom_js: jsCode || ""
  })

  res.json(tileHtml)
})

// Register preview route
expressApp.get("/preview", (req, res) => {
  const widgetRequest = req.query as WidgetRequest
  const widgetType = req.query.widgetType as string
  if (!widgetType) {
    return res.status(400).send("widgetType is required")
  }

  loadGlobals(widgetType)

  res.render("preview", {
    widgetRequest: JSON.stringify(widgetRequest),
    widgetType,
    layoutCode,
    tileCode,
    cssCode,
    jsCode
  })
})

expressApp.get("/autoload", (req, res) => {
  const { selector, widget, resource } = req.query as { selector: string; widget: string; resource: string }

  if (!selector) {
    return res.status(400).send("selector is required")
  }

  if (!widget) {
    return res.status(400).send("widget is required")
  }

  if (!resource) {
    return res.status(400).send("resource is required")
  }

  const resourceWithoutSymbols = stripSymbols(resource)
  const widgetTypeWithoutSymbols = stripSymbols(widget)
  const widgetSrc = `dist/widgets/${widgetTypeWithoutSymbols}/widget.${resourceWithoutSymbols}`
  const code = readFileSync(widgetSrc, "utf8")

  if (resourceWithoutSymbols === "css") {
    res.set("Content-Type", "text/css")
  }

  if (resourceWithoutSymbols === "js") {
    res.set("Content-Type", "text/javascript")
  }

  res.set("Cache-Control", "public, max-age=300")

  res.render("autoload", {
    selector: stripSymbolsThatAreNotDash(selector),
    code,
    isJsCode: resourceWithoutSymbols === "js"
  })
})

export default expressApp
