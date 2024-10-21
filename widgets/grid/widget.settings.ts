import { Sdk } from "@stackla/ugc-widgets"
import getCSSVariables from "@widgets/libs/css-variables"
import { MasonryLayout } from "@appnest/masonry-layout"
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

declare const sdk: Sdk

export function loadWidgetSettings() {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
  addAutoAddTileFeature(widgetSettings)
  loadExpandedTileFeature(widgetSettings, onTileExpand, onTileClosed, onTileRendered)
  addTilesPerPageFeature(widgetSettings)
  addLoadMoreButtonFeature(widgetSettings)

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

  sdk.addEventListener("moreLoad", () => {
    refreshMasonryLayout()
  })
  window.addEventListener("scroll", () => {
    refreshMasonryLayout()
  })
  sdk.addEventListener("tilesUpdated", refreshMasonryLayout)
}
