import {
  registerExpandedTileCrossSellersRendered,
  registerLoadListener
} from "@stackla/widget-utils/dist/libs/tile.listeners"
import {
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  loadTitle,
  loadWidgetIsEnabled
} from "@stackla/widget-utils/dist/libs/widget.features"
import { addCSSVariablesToPlacement } from "@stackla/widget-utils/dist/libs/widget.layout"
import getCSSVariables from "@stackla/widget-utils/dist/libs/css-variables"
import { ISdk } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-swiper.loader"
import {
  onTileClosed,
  onTileExpand,
  onTileRendered
} from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper/expanded-swiper.loader"
import { onExpandedTileCrossSellersRendered } from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper/product-recs-swiper.loader"

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
