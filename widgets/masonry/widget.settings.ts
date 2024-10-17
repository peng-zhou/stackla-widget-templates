import { Sdk } from "@stackla/ugc-widgets"
import getCSSVariables from "@widgets/libs/css-variables"
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
import { refreshMasonryLayout } from "@widgets/libs/extensions/masonry.extension"
import { preloadTileBackgroundImages, resizeAllUgcTiles } from "./masonry.lib"

declare const sdk: Sdk

export async function loadWidgetSettings() {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
  addAutoAddTileFeature(widgetSettings)
  loadExpandedTileFeature(widgetSettings, onTileExpand, onTileClosed, onTileRendered)
  addTilesPerPageFeature(widgetSettings)
  addLoadMoreButtonFeature(widgetSettings)

  window.refreshMasonryLayout = refreshMasonryLayout

  await preloadTileBackgroundImages()

  resizeAllUgcTiles()

  sdk.addEventListener("moreLoad", () => {
    refreshMasonryLayout(false)
  })
  sdk.addEventListener("tilesUpdated", () => {
    refreshMasonryLayout(false);
  })
}
