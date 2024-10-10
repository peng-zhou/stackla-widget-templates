import { Sdk } from "@stackla/ugc-widgets"
import getCSSVariables from "@widgets/libs/css-variables"
import {
  initializeMasonry,
  loadMoreMasonryTiles,
  refreshMasonryLayout
} from "@widgets/libs/extensions/masonry.extension"
import {
  loadTitle,
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  addTilesPerPageFeature,
  addLoadMoreButtonFeature
} from "@widgets/libs/widget.features"
import { addCSSVariablesToPlacement } from "@widgets/libs/widget.layout"
import { getConfig } from "./widget.config"
import { onTileExpand, onTileClosed, onTileRendered } from "@widgets/libs/extensions/swiper/swiper.expanded-tile"

declare const sdk: Sdk

export function loadWidgetSettings() {
  sdk.tiles.hideBrokenTiles = true
  sdk.tiles.preloadImages = true

  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
  addAutoAddTileFeature(widgetSettings)
  loadExpandedTileFeature(widgetSettings, onTileExpand, onTileClosed, onTileRendered)
  addTilesPerPageFeature(widgetSettings)
  addLoadMoreButtonFeature(widgetSettings)

  initializeMasonry()

  sdk.addEventListener("moreLoad", loadMoreMasonryTiles)
  sdk.addEventListener("tilesUpdated", refreshMasonryLayout)
}
