import type { Express } from "express"
import nostoApiJS from "../data/nosto-api"
import * as path from "node:path"
import * as fs from "node:fs"

export const createMockRoutes = (app: Express) => {
  app.get("/development/stackla/cs/image/disable", (_req, res) => {
    res.json({ success: true })
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

    res.render("preview", {
      widgetRequest: JSON.stringify(widget),
      environment: process.env.APP_ENV
    })
  })
}
