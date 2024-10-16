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
import { onTileExpand, onTileClosed, onTileRendered } from "@widgets/libs/extensions/swiper/swiper.expanded-tile"

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

  const tilesContainer = sdk.querySelector(".ugc-tiles")
  const tiles = sdk.querySelectorAll(".ugc-tile")

  const tileSizes: { [key: string]: string } = {
    small: "88.5",
    medium: "133.5",
    large: "269.2"
  }

  if (tilesContainer) {
    const tileSize = parseInt(tileSizes[widgetSettings.tile_size ?? "medium"])
    const tileGap = widgetSettings.margin ?? 10
    const totalTileWidth = (tileSize + tileGap) * 4
    tilesContainer.style.gridTemplateColumns = `repeat(auto-fit, ${totalTileWidth}px)`
  }

  if (tiles) {
    for (let i = 0; i < tiles.length; i += 5) {
      const tileGroup = document.createElement("div")
      tileGroup.classList.add("tile-group")
      tileGroup.style.gridTemplateColumns = `repeat(4, ${tileSizes[widgetSettings.tile_size ?? "medium"]}px)`
      tileGroup.style.gridTemplateRows = tileSizes[widgetSettings.tile_size ?? "medium"]

      const largeTile = tiles[i]
      if (largeTile) {
        largeTile.classList.add("large")
        tileGroup.appendChild(largeTile)
      }

      for (let j = 1; j <= 4; j++) {
        const smallTile = tiles[i + j]
        if (smallTile) {
          smallTile.classList.add("small")
          tileGroup.appendChild(smallTile)
        }
      }
      tilesContainer?.appendChild(tileGroup)
    }
  }

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
