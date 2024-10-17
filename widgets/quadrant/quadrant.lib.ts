import { Sdk, Tile } from "@stackla/ugc-widgets"
import { getConfig } from "./widget.config"
import { waitForMultipleElements } from "@widgets/libs/widget.features"

declare const sdk: Sdk

const tileSizes: { [key: string]: string } = {
  small: "88.5",
  medium: "133.5",
  large: "269.2"
}

const tilesContainer = sdk.querySelector(".ugc-tiles")!

function createTileGroup(tiles: Tile[], groupStartIndex: number, tileSize: string) {
  if (tiles.length - groupStartIndex < 5) {
    return
  }
  const tileGroup = document.createElement("div")
  tileGroup.classList.add("tile-group")
  tileGroup.style.gridTemplateColumns = `repeat(4, ${tileSize}px)`
  tileGroup.style.gridTemplateRows = tileSize

  const largeTile = tiles[groupStartIndex]
  if (largeTile instanceof HTMLElement) {
    largeTile.classList.add("large", "processed")
    tileGroup.appendChild(largeTile)
  }

  for (let tileOffset = 1; tileOffset <= 4; tileOffset++) {
    const smallTile = tiles[groupStartIndex + tileOffset]
    if (smallTile instanceof HTMLElement) {
      smallTile.classList.add("small", "processed")
      tileGroup.appendChild(smallTile)
    }
  }
  return tileGroup
}

export function addQuadrantTiles(tiles: Tile[], tileSize: string, startIndex: number = 0) {
  if (tilesContainer) {
    for (let groupStartIndex = startIndex; groupStartIndex < tiles.length; groupStartIndex += 5) {
      const tileGroup = createTileGroup(tiles, groupStartIndex, tileSize)
      if (tileGroup) {
        tilesContainer?.appendChild(tileGroup)
      }
    }
  }
}

export function getQuadrantTiles() {
  const tiles = sdk.querySelectorAll(".ugc-tile") as unknown as Tile[]

  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const tileSize = tileSizes[widgetSettings.tile_size ?? "medium"]
  const tileGap = widgetSettings.margin ?? 10
  const totalTileWidth = (parseInt(tileSize) + tileGap) * 4
  tilesContainer.style.gridTemplateColumns = `repeat(auto-fit, ${totalTileWidth}px)`

  if (tiles && tiles.length > 0) {
    addQuadrantTiles(tiles, tileSize)
  }
  sdk.addEventListener("moreLoad", () => {
    waitForMultipleElements(tilesContainer, ".ugc-tile:not(.processed)", newTiles => {
      if (newTiles && newTiles.length >= 5) {
        addQuadrantTiles(newTiles as unknown as Tile[], tileSize)
      }
    })
  })
}
