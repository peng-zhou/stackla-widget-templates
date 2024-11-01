import {
  addAutoAddTileFeature,
  addLoadMoreButtonFeature,
  addTilesPerPageFeature,
  loadExpandedTileFeature,
  loadTitle,
  loadWidgetIsEnabled
} from "@stackla/widget-utils/dist/libs/widget.features"
import { addCSSVariablesToPlacement } from "@stackla/widget-utils/dist/libs/widget.layout"
import expandedTileCSS from "./components/expanded-tile/base.scss"
import productsCSS from "./components/products/base.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import customExpandedTileTemplate from "./components/expanded-tile/base.template"
import getCSSVariables from "@stackla/widget-utils/dist/libs/css-variables"
import { ISdk } from "@stackla/widget-utils/dist/types"

declare const sdk: ISdk

sdk.tiles.hideBrokenTiles = true
sdk.tiles.preloadImages = true

loadWidgetIsEnabled()
loadTitle()
addAutoAddTileFeature()
loadExpandedTileFeature()
addTilesPerPageFeature()
addLoadMoreButtonFeature()
addCSSVariablesToPlacement(getCSSVariables())

sdk.addCSSToComponent(expandedTileCSS, "expanded-tile")
sdk.addCSSToComponent(productsCSS, "ugc-products")
sdk.addCSSToComponent(shopspotStyle, "shopspot-icon")
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile")
