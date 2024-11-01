import type { ISdk } from "@stackla/widget-utils"
import { addCSSVariablesToPlacement } from "@stackla/widget-utils/dist/libs"
import {
  loadTitle,
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  addTilesPerPageFeature,
  addLoadMoreButtonFeature
} from "@stackla/widget-utils/dist/libs/widget.features"
import {
  handleTileImageError,
  handleAllTileImageRendered,
  renderMasonryLayout
} from "@stackla/widget-utils/dist/libs/extensions/masonry.extension"
import {
  onTileExpand,
  onTileClosed,
  onTileRendered
} from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper/expanded-swiper.loader"
import getCSSVariables from "@stackla/widget-utils/dist/libs/css-variables"

declare const sdk: ISdk

export async function loadWidgetSettings() {
  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables())
  addAutoAddTileFeature()
  loadExpandedTileFeature(onTileExpand, onTileClosed, onTileRendered)
  addTilesPerPageFeature()
  addLoadMoreButtonFeature()

  window.refreshMasonryLayout = () => renderMasonryLayout()

  sdk.events.listenOrFindEvent("widgetInitComplete", () => {
    setTimeout(() => renderMasonryLayout(), 1000)
  })

  sdk.addEventListener("tilesUpdated", () => {
    renderMasonryLayout()
  })

  sdk.addEventListener("tileBgImgRenderComplete", () => {
    handleAllTileImageRendered()
    setTimeout(handleAllTileImageRendered, 1000)
  })

  sdk.addEventListener("tileBgImageError", (event: Event) => {
    const customEvent = event as CustomEvent
    const tileWithError = customEvent.detail.data.target as HTMLElement
    handleTileImageError(tileWithError)
  })

  window.addEventListener("resize", () => {
    renderMasonryLayout(false, true)
  })
}
