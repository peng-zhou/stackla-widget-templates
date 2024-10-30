import {
  addAutoAddTileFeature,
  addLoadMoreButtonFeature,
  addTilesPerPageFeature,
  loadExpandedTileFeature,
  loadTitle,
  loadWidgetIsEnabled
} from "widgets/libs/widget.features"
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout"
import expandedTileCSS from "./components/expanded-tile/base.scss"
import productsCSS from "./components/products/base.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import customExpandedTileTemplate from "./components/expanded-tile/base.template"
import getCSSVariables from "widgets/libs/css-variables"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

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
