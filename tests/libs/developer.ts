import type { Express } from "express"
import tilesJSON from "../data/tiles"
import nostoApiJS from "../data/nosto-api"
import widgetOptions from "../data/widget-options"
import * as path from "node:path"
import * as fs from "node:fs"
import { Tile } from "@stackla/widget-utils"

export function prepareTilesAsHTML(tiles: Tile[], page: string, limit: number) {
  return tiles
    .slice(0, limit)
    .map(
      tile =>
        `<div class="ugc-tile" data-test-page="${page}" data-id="${tile.id}"><img loading="lazy" src="https://content-cdn.stackla.com/2392/65e16a0b5d7e676caec68f03/image/s" width="120"/>\r\n            <p>Cuddles and kisses, the language of pet love. 🐾💕 #petlovers #petlover #pets #doglover #dog #trending #viral #instagood #instadaily #modellife #modelportfolio #model kathmandugear</p></div>`
    )
}

const getMutatedTiles = (tiles: Tile[], page: string = "1", limit: number = 100) => {
  let counter = 1
  return tiles.slice(0, limit).map(tile => {
    tile.image = `https://picsum.photos/600?v=${counter * Number.parseInt(page)}`
    counter++
    return tile
  })
}

const getFile = (filePath: string) => {
  const filePathResolved = path.resolve(filePath)
  return fs.readFileSync(filePathResolved, "utf-8")
}

const getResource = (fileName: string) => getFile(`tests/data/${fileName}`)

const getJSON = (fileName: string, limit: string) => JSON.parse(getFile(`tests/mock/${fileName}`)).slice(0, limit)

export const createMockRoutes = (app: Express) => {
  app.get("/development/widgets/:wid", (req, res) => {
    const widget = getWidget()
    res.json(widget)
  })

  app.get("/development/stackla/cs/image/disable", (_req, res) => {
    res.json({ success: true })
  })

  app.get("/development/widgets/:wid/tiles", (req, res) => {
    const limit: string = req.query.limit as string
    const page = req.query.page as string
    if (req.query.after_id) {
      const json = getJSON(`tiles-1.json`, "1")
      res.json({
        tiles: json.slice(0, 1)
      })
      return
    }

    try {
      const json = getJSON(`tiles.json`, limit)
      const mutatedJSON = getMutatedTiles(json, page, Number.parseInt(limit))

      res.json({
        tiles: mutatedJSON.slice(0, Number.parseInt(limit))
      })
    } catch (error) {
      return res.json({ tiles: [] })
    }

    return
  })

  app.get("/development/widgets/:wid/tiles/:tid", (_req, res) => {
    res.json(getMutatedTiles(tilesJSON as unknown as Tile[]).find(tile => tile.id === _req.params.tid))
  })

  app.get("/development/widgets/:wid/rendered/tiles", (req, res) => {
    if (req.query.after_id) {
      const html = getResource("new-tile.html")

      res.json([html])
      return
    }

    const limit = req.query.limit as string
    try {
      const json = getJSON(`rendered-tiles.json`, limit)
      const jsonWithMutatedImages = json.map(tile => {
        const regex = /https:\/\/picsum.photos\/200/g
        tile = tile.replace(regex, `https://picsum.photos/200?${Math.random() * 100}`)

        return tile
      })
      res.json(jsonWithMutatedImages)
    } catch (error) {
      console.log(error)
      return res.json([])
    }
    return
  })

  app.post("/development/widgets/:wid/draft", (_req, res) => {
    res.json({
      html: getWidget().html,
      customCSS: getResource("custom.css"),
      customJS: getResource("custom.js"),
      widgetOptions,
      tilesCount: 100,
      stackId: 1234,
      enabled: 1
    })
  })

  app.get("/development/nosto/shopify-64671154416", (_req, res) => {
    res.send(nostoApiJS)
  })

  app.get("/development/products/asus-tuf-f15-15-6-fhd-144hz-gaming-laptop-1tbgeforce-rtx-3050.js", (_req, res) => {
    const fileData = fs.readFileSync(path.resolve("src/tests/mock/atc-laptop.json"), "utf-8")
    res.json(JSON.parse(fileData))
  })

  app.get("/development/products/samsung-98-qn90d-neo-qled-4k-smart-tv-2024.js", (_req, res) => {
    const fileData = fs.readFileSync(path.resolve("src/tests/mock/atc-tv.json"), "utf-8")
    res.json(JSON.parse(fileData))
  })

  app.get("/development/products/contrast-felted-sweater-black.js", (_req, res) => {
    const fileData = fs.readFileSync(path.resolve("src/tests/mock/contrast-felted-sweater-black.json"), "utf-8")
    res.json(JSON.parse(fileData))
  })

  app.get("/development/products/desna-dress.js", (_req, res) => {
    const fileData = fs.readFileSync(path.resolve("src/tests/mock/desna-dress.json"), "utf-8")
    res.json(JSON.parse(fileData))
  })

  app.get("/development/products/pure-city-vintage-leather-saddle.js", (_req, res) => {
    const fileData = fs.readFileSync(path.resolve("src/tests/mock/pure-city-vintage-leather-saddle.json"), "utf-8")
    res.json(JSON.parse(fileData))
  })

  app.get("/test-preview", (_req, res) => {
    const widget = {
      wid: "668ca52ada8fb",
      dev: true
    }
    res.render("preview", { widgetRequest: JSON.stringify(widget) })
  })

  app.get("/test-preview/draft", (_req, res) => {
    const widget = {
      wid: "668ca52ada8fb",
      filter_id: 1,
      draft: {
        custom_templates: {
          layout: {
            display_name: "layout",
            html_id: "1",
            mandatory: 1,
            use_default_template: 1,
            template: "Mock HTML",
            created: "2021-01-01",
            modified: "2021-01-01"
          },
          tile: {
            display_name: "tile",
            html_id: "1",
            mandatory: 1,
            use_default_template: 1,
            template: "Mock HTML",
            created: "2021-01-01",
            modified: "2021-01-01"
          }
        },
        custom_js: getResource("custom.js"),
        custom_css: getResource("custom.css"),
        filter_id: 1000
      }
    }

    res.render("preview", { widgetRequest: JSON.stringify(widget) })
  })
}

export const getWidget = () => {
  return {
    html: getResource("custom.html"),
    customCSS: getResource("custom.css"),
    customJS: getResource("custom.js"),
    widgetOptions: widgetOptions,
    merchantId: "shopify-64671154416",
    stackId: 1451,
    tileCount: 1000
  }
}
