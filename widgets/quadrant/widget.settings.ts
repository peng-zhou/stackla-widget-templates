import type { ISdk } from "@stackla/widget-utils"
import { addCSSVariablesToPlacement } from "@stackla/widget-utils/dist/libs"
import {
  loadTitle,
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  addLoadMoreButtonFeature
} from "@stackla/widget-utils/dist/libs/widget.features"
import {
  onTileExpand,
  onTileClosed,
  onTileRendered
} from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper/expanded-swiper.loader"
import getCSSVariables from "@stackla/widget-utils/dist/libs/css-variables"

declare const sdk: ISdk

export function loadWidgetSettings() {
  sdk.tiles.preloadImages = false
  sdk.tiles.hideBrokenTiles = false

  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables())
  addAutoAddTileFeature()
  loadExpandedTileFeature(onTileExpand, onTileClosed, onTileRendered)
  addLoadMoreButtonFeature()
}
