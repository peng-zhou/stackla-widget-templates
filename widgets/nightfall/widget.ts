declare const sdk: Sdk

import {
  addAutoAddTileFeature,
  addLoadMoreButtonFeature,
  addTilesPerPageFeature,
  loadExpandedTileFeature,
  loadTitle,
  loadWidgetIsEnabled
} from "widgets/libs/widget.features"
import { loadExpandSettingComponents } from "widgets/libs/widget.components"
import customExpandedTileTemplate from "./components/expanded-tile/base.template"
import customExpandedTileCSS from "./components/expanded-tile/base.scss"
import customProductsCSS from "./components/products/base.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import getCSSVariables from "../libs/css-variables"
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout"
import { onTileClose } from "./widget.listeners"
import { Sdk } from "@stackla/ugc-widgets"

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
