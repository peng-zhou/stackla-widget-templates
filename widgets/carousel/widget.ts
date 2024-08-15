import type { Sdk } from "@stackla/ugc-widgets"
import { getConfig } from "./widget.config"
import { expandedTileTemplate } from "./components/expanded-tile/base.template"
import expandedTileStyle from "./components/expanded-tile/base.scss"
import productsStyle from "./components/products/base.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import {
  onTileExpand,
  initializeInlineSwiperListeners,
  onTileClosed,
  hideSlidesWithInvisibleTiles,
  onPreloadTileHidden
} from "./widget.extensions"
import {
  registerPreloadTileHidden,
  registerTilesUpdated,
  registerWidgetInitComplete
} from "widgets/libs/tile.listeners"
import {
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  loadHoverTile,
  loadTitle,
  loadWidgetIsEnabled
} from "widgets/libs/widget.features"
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout"
import getCSSVariables from "widgets/libs/css-variables"

declare const sdk: Sdk
sdk.tiles.preloadImages = true
sdk.tiles.setLoadMode("page")
sdk.tiles.setVisibleTilesCount(100)

const widgetContainer = sdk.placement.getWidgetContainer()
const widgetSettings = getConfig(widgetContainer)

loadWidgetIsEnabled(widgetSettings)
addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
loadTitle()
registerWidgetInitComplete(initializeInlineSwiperListeners)
addAutoAddTileFeature(widgetSettings)
loadExpandedTileFeature(widgetSettings, onTileExpand, onTileClosed)
loadHoverTile(widgetSettings)
registerTilesUpdated(hideSlidesWithInvisibleTiles)
registerPreloadTileHidden(onPreloadTileHidden)

// FIXME Find a better option?
sdk.addGlobalCSSUrl("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css")
sdk.addCSSToComponent(expandedTileStyle, "expanded-tile")
sdk.addCSSToComponent(productsStyle, "ugc-products")
sdk.addCSSToComponent(shopspotStyle, "shopspot-icon")
sdk.addTemplateToComponent(expandedTileTemplate, "expanded-tile")
