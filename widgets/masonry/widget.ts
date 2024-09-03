import { getConfig } from "./widget.config"
import {
  addAutoAddTileFeature,
  addLoadMoreButtonFeature,
  addTilesPerPageFeature,
  loadExpandedTileFeature,
  loadTitle
} from "widgets/libs/widget.features"
import {
  initializeMasonry,
  loadMoreMasonryTiles,
  refreshMasonryLayout
} from "widgets/libs/extensions/masonry.extension"
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout"
import getCSSVariables from "./css.variables"
import expandedTileCSS from "./components/expanded-tile/base.scss"
import productsCSS from "./components/products/base.scss"
import customExpandedTileTemplate from "./components/expanded-tile/base.template"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk;

sdk.tiles.setLoadMode("all")
sdk.tiles.hideBrokenTiles = true
sdk.tiles.preloadImages = true

const widgetContainer = sdk.placement.getWidgetContainer()
const widgetSettings = getConfig(widgetContainer)

const showWidget = widgetContainer.enabled

if (!showWidget) {
  throw new Error("Widget is not enabled")
}

loadTitle()
const cssVariablesToString = Object.entries(getCSSVariables())
  .map(([key, value]) => `${key}: ${value};`)
  .join("\n")
addCSSVariablesToPlacement(cssVariablesToString)
addAutoAddTileFeature(widgetSettings)
loadExpandedTileFeature(widgetSettings)
addTilesPerPageFeature(widgetSettings)
addLoadMoreButtonFeature(widgetSettings)

sdk.addEventListener("load", initializeMasonry)
sdk.addEventListener("moreLoad", loadMoreMasonryTiles)
sdk.addEventListener("tilesUpdated", refreshMasonryLayout)
sdk.addCSSToComponent(expandedTileCSS, "expanded-tile")
sdk.addCSSToComponent(productsCSS, "ugc-products")
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile")
