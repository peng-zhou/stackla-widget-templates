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
  refreshMasonryLayout,
  reinitialiseMasonryLayout,
  resizeAllUgcTiles
} from "@widgets/libs/extensions/masonry.extension"

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

  await resizeAllUgcTiles()

  sdk.addEventListener("load", async () => {
    await reinitialiseMasonryLayout()
  })

  sdk.addEventListener("moreLoad", async () => {
    await refreshMasonryLayout(true)
  })
  sdk.addEventListener("tilesUpdated", async () => {
    await refreshMasonryLayout(true)
  })
  window.addEventListener("resize", async () => {
    await reinitialiseMasonryLayout()
  })
}
