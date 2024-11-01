import {
  loadTitle,
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  addTilesPerPageFeature,
  addLoadMoreButtonFeature
} from "@stackla/widget-utils/dist/libs/widget.features"
import { addCSSVariablesToPlacement } from "@stackla/widget-utils/dist/libs"
import {
  onTileExpand,
  onTileClosed,
  onTileRendered
} from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper/expanded-swiper.loader"
import getCSSVariables from "@stackla/widget-utils/dist/libs/css-variables"

export function loadWidgetSettings() {
  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables())
  addAutoAddTileFeature()
  loadExpandedTileFeature(onTileExpand, onTileClosed, onTileRendered)
  addTilesPerPageFeature()
  addLoadMoreButtonFeature()
}
