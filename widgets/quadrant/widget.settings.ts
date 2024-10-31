import { ISdk } from "@stackla/public-types"
import getCSSVariables from "@widgets/libs/css-variables"
import {
  loadTitle,
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  addLoadMoreButtonFeature
} from "@widgets/libs/widget.features"
import { addCSSVariablesToPlacement } from "@widgets/libs/widget.layout"
import {
  onTileExpand,
  onTileClosed,
  onTileRendered
} from "@libs/components/expanded-tile-swiper/expanded-swiper.loader"

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
