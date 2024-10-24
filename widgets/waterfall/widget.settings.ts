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
import { resizeAllUgcTiles } from "./waterfall.lib"
import { reinitialiseMasonryLayout } from "@widgets/libs/extensions/masonry.extension"
import { MasonryLayout } from "@appnest/masonry-layout"

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

  await resizeAllUgcTiles()

  const tileSizes: { [key: string]: string } = {
    small: "127.8px",
    medium: "210.4px",
    large: "265.5px"
  }

  const refreshMasonryLayout = () => {
    const masonryLayout = sdk.querySelector<MasonryLayout>("masonry-layout")
    if (masonryLayout instanceof MasonryLayout) {
      masonryLayout.layout()
      if (widgetSettings.margin) {
        masonryLayout.setAttribute("gap", `${widgetSettings.margin}`)
      }
      if (widgetSettings.tile_size) {
        masonryLayout.setAttribute("maxColWidth", tileSizes[widgetSettings.tile_size])
      }
    }
  }

  // window.refreshMasonryLayout = refreshMasonryLayout

  await resizeAllUgcTiles()

  sdk.addEventListener("load", async () => {
    await reinitialiseMasonryLayout()
  })

  sdk.addEventListener("moreLoad", async () => {
    await refreshMasonryLayout()
  })
  sdk.addEventListener("tilesUpdated", async () => {
    await refreshMasonryLayout()
  })
  window.addEventListener("resize", async () => {
    await reinitialiseMasonryLayout()
  })
}
