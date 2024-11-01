declare const sdk: ISdk

import {
  addAutoAddTileFeature,
  addLoadMoreButtonFeature,
  addTilesPerPageFeature,
  loadExpandedTileFeature,
  loadTitle,
  loadWidgetIsEnabled
} from "@stackla/widget-utils/dist/libs/widget.features"
import { loadExpandSettingComponents } from "@stackla/widget-utils/dist/libs/widget.components"
import customExpandedTileTemplate from "./components/expanded-tile/base.template"
import customExpandedTileCSS from "./components/expanded-tile/base.scss"
import customProductsCSS from "./components/products/base.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import getCSSVariables from "@stackla/widget-utils/dist/libs/css-variables"
import { addCSSVariablesToPlacement } from "@stackla/widget-utils/dist/libs"
import { onTileClose } from "./widget.listeners"
import type { ISdk } from "@stackla/widget-utils"

sdk.tiles.hideBrokenTiles = true
sdk.tiles.preloadImages = true

loadWidgetIsEnabled()
loadTitle()
loadExpandSettingComponents()
addAutoAddTileFeature()
loadExpandedTileFeature(() => {}, onTileClose)
addTilesPerPageFeature()
addLoadMoreButtonFeature()
addCSSVariablesToPlacement(getCSSVariables())

sdk.addCSSToComponent(customExpandedTileCSS, "expanded-tile")
sdk.addCSSToComponent(customProductsCSS, "ugc-products")
sdk.addCSSToComponent(shopspotStyle, "shopspot-icon")
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile")
