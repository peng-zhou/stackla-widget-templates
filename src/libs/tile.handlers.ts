import tiles from "../../tests/fixtures/tiles"
import type { IDraftRequest } from "./express"
import { renderHTMLWithTemplates, renderTilesWithTemplate } from "@stackla/handlebars"

function getActualTilesLimit(limit: number) {
  return limit > tiles.length ? limit - tiles.length : limit
}

export function getTilesToRender(page: number, limit: number) {
  const actualLimit = getActualTilesLimit(limit)
  const startIndex = actualLimit * (page - 1)
  return tiles.slice(startIndex, actualLimit)
}

export async function getAndRenderTiles(widgetContainer: IDraftRequest, page: number = 1, limit: number = 25) {
  const tileTemplate = widgetContainer.custom_templates.tile.template
  return renderTilesWithTemplate(tileTemplate, getTilesToRender(page, limit))
}

export async function renderTemplates(widgetContainer: IDraftRequest, page: number = 1, limit: number = 25) {
  const tileTemplate = widgetContainer.custom_templates.tile.template
  const layoutTemplate = widgetContainer.custom_templates.layout.template

  return renderHTMLWithTemplates(tileTemplate, layoutTemplate, getTilesToRender(page, limit))
}
