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
import {
  onTileExpand,
  onTileClosed,
  onTileRendered
} from "@libs/components/expanded-tile-swiper/expanded-swiper.loader"
import {
  handleTileImageError,
  handleAllTileImageRendered,
  renderMasonryLayout
} from "@widgets/libs/extensions/masonry.extension"

declare const sdk: Sdk

export async function loadWidgetSettings() {
  loadTitle()
  addCSSVariablesToPlacement(getCSSVariables())
  addAutoAddTileFeature()
  loadExpandedTileFeature(onTileExpand, onTileClosed, onTileRendered)
  addTilesPerPageFeature()
  addLoadMoreButtonFeature()

  window.refreshMasonryLayout = () => renderMasonryLayout(widgetSettings)

  sdk.events.listenOrFindEvent("widgetInitComplete", () => {
    setTimeout(() => renderMasonryLayout(widgetSettings), 1000)
  })

  sdk.addEventListener("tilesUpdated", () => {
    renderMasonryLayout(widgetSettings)
  })

  sdk.addEventListener("tileBgImgRenderComplete", () => {
    handleAllTileImageRendered()
    setTimeout(handleAllTileImageRendered, 1000)
  })

  sdk.addEventListener("tileBgImageError", (event: Event) => {
    const customEvent = event as CustomEvent
    const tileWithError = customEvent.detail.data.target as HTMLElement
    handleTileImageError(widgetSettings, tileWithError)
  })

  window.addEventListener("resize", () => {
    renderMasonryLayout(widgetSettings, false, true)
  })
}
