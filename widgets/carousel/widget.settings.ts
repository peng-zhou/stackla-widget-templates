import { registerExpandedTileCrossSellersRendered, registerLoadListener } from "widgets/libs/tile.listeners"
import {
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  loadTitle,
  loadWidgetIsEnabled
} from "widgets/libs/widget.features"
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout"
import getCSSVariables from "widgets/libs/css-variables"
import { ISdk } from "@stackla/public-types"
import { initializeInlineSwiperListeners } from "./inline-swiper.loader"
import {
  onTileClosed,
  onTileExpand,
  onTileRendered
} from "@libs/components/expanded-tile-swiper/expanded-swiper.loader"
import { onExpandedTileCrossSellersRendered } from "@libs/components/expanded-tile-swiper/product-recs-swiper.loader"

declare const sdk: ISdk

export function loadSettings() {
  sdk.tiles.preloadImages = true

  loadWidgetIsEnabled()
  addCSSVariablesToPlacement(getCSSVariables())
  loadTitle()
  registerLoadListener(initializeInlineSwiperListeners)
  addAutoAddTileFeature()
  loadExpandedTileFeature(onTileExpand, onTileClosed, onTileRendered)
  registerExpandedTileCrossSellersRendered(onExpandedTileCrossSellersRendered)
}
