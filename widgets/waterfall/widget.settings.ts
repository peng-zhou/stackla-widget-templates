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
import {
  onTileExpand,
  onTileClosed,
  onTileRendered
} from "@libs/components/expanded-tile-swiper/expanded-swiper.loader"
import {
  refreshWaterfallLayout,
  reinitialiseWaterfallLayout,
  resizeAllUgcTilesHeight
} from "@widgets/libs/extensions/waterfall.extension"
import { onTagsRendered } from "@widgets/libs/components/expanded-tile-swiper/tags-swiper.loader"
import { registerTagsRendered } from "@widgets/libs/tile.listeners"

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
  registerTagsRendered(onTagsRendered)

  window.refreshMasonryLayout = refreshWaterfallLayout

  const minmax: [number, number] = [260, 450]

  await resizeAllUgcTilesHeight(minmax)

  sdk.addEventListener("moreLoad", async () => {
    await refreshWaterfallLayout(minmax, true)
  })
  sdk.addEventListener("tilesUpdated", async () => {
    await refreshWaterfallLayout(minmax, true)
  })
  window.addEventListener("resize", async () => {
    await reinitialiseWaterfallLayout(minmax)
  })
}
