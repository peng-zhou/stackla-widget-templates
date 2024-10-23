import { Sdk } from "@stackla/ugc-widgets"
import getCSSVariables from "@widgets/libs/css-variables"
import { MasonryLayout } from "@appnest/masonry-layout"
import {
  loadTitle,
  addAutoAddTileFeature,
  loadExpandedTileFeature,
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

  sdk.tiles.preloadImages = false
  sdk.tiles.hideBrokenTiles = false

  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
  addAutoAddTileFeature(widgetSettings)
  loadExpandedTileFeature(widgetSettings, onTileExpand, onTileClosed, onTileRendered)
  addLoadMoreButtonFeature(widgetSettings)

  const refreshMasonryLayout = () => {
    const masonryLayout = sdk.querySelector<MasonryLayout>("masonry-layout")
    if (masonryLayout instanceof MasonryLayout) {
      masonryLayout.layout()
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
