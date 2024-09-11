import tiles from "../../tests/fixtures/tiles.fixtures"
import * as Handlebars from "hbs"
import { IDraftRequest } from "./express"
import { decorateTile } from "./tile.decorators"
import { decorateLayout } from "./layout-decorator"

export async function getAndRenderTiles(widgetContainer: IDraftRequest) {
  const tileTemplate = widgetContainer.custom_templates.tile.template

  const decoratedTileTemplate = decorateTile(tileTemplate)
  registerHelpers(Handlebars)

  const hbs = await renderTemplateWithPartials(Handlebars.create(), {
    name: "tpl-tile",
    template: decoratedTileTemplate
  })

  const handlebarsTemplate = hbs.compile(decoratedTileTemplate)

  return tiles.map(tile => handlebarsTemplate(tile))
}

interface HandlebarsParital {
  name: string
  template: string
}

function registerHelpers(hbs) {
  hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this)
  })
}

function renderTemplateWithPartials(hbs, partial: HandlebarsParital) {
  registerHelpers(hbs)
  hbs.registerPartial(partial.name, partial.template)

  return hbs
}

export async function renderHTMLWithTemplates(widgetContainer: IDraftRequest) {
  const tileTemplate = widgetContainer.custom_templates.tile.template
  const layoutTemplate = widgetContainer.custom_templates.layout.template

  registerHelpers(Handlebars)

  const decoratedLayoutTemplate = decorateLayout(layoutTemplate)
  const decoratedTileTemplate = decorateTile(tileTemplate)

  const hbs = await renderTemplateWithPartials(Handlebars.create(), {
    name: "tpl-tile",
    template: decoratedTileTemplate
  })

  const handlebarsTemplate = hbs.compile(decoratedLayoutTemplate)
  return handlebarsTemplate({
    tiles
  })
}
