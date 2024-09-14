import tiles from "../../tests/fixtures/tiles.fixtures"
import type { IDraftRequest } from "./express"
import { renderHTMLWithTemplates, renderTilesWithTemplate } from "@stackla/handlebars"

export async function getAndRenderTiles(widgetContainer: IDraftRequest) {
  const tileTemplate = widgetContainer.custom_templates.tile.template

  return renderTilesWithTemplate(tileTemplate, tiles)
}

export async function renderTemplates(widgetContainer: IDraftRequest) {
  const tileTemplate = widgetContainer.custom_templates.tile.template
  const layoutTemplate = widgetContainer.custom_templates.layout.template

  return renderHTMLWithTemplates(tileTemplate, layoutTemplate, tiles)
}
