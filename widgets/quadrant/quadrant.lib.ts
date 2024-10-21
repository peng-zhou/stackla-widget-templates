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

function checkForBrokenImages(tiles: Tile[]): Promise<Tile[]> {
  return new Promise(resolve => {
    const validTiles: Tile[] = []
    let processedTiles = 0

    tiles.forEach(tile => {
      // Type narrowing: Ensure tile is an HTMLElement
      if (!(tile instanceof HTMLElement)) {
        processedTiles++
        if (processedTiles === tiles.length) resolve(validTiles)
        return
      }

      const image = tile.querySelector("img")

      if (!image) {
        processedTiles++
        if (processedTiles === tiles.length) resolve(validTiles)
        return
      }

      // Check for broken images using onerror
      image.onerror = () => {
        console.log("ERROR: Image failed to load for tile", tile)
        tile.remove()
        processedTiles++
        if (processedTiles === tiles.length) resolve(validTiles) // Resolve after all tiles are processed
      }

      // If the image loads correctly, add it to validTiles
      image.onload = () => {
        validTiles.push(tile)
        processedTiles++
        if (processedTiles === tiles.length) resolve(validTiles) // Resolve after all tiles are processed
      }

      // Handle cached images that are already loaded
      if (image.complete && image.naturalWidth !== 0) {
        validTiles.push(tile)
        processedTiles++
        if (processedTiles === tiles.length) resolve(validTiles) // Resolve after all tiles are processed
      }
    })

    // Resolve immediately if there are no tiles
    if (tiles.length === 0) {
      resolve(validTiles)
    }
  })
}

function createTileGroup(tiles: Tile[], groupStartIndex: number, tileSize: string) {
  if (tiles.length - groupStartIndex < 5) {
    return null
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

export async function getQuadrantTiles() {
  const tiles = sdk.querySelectorAll(".ugc-tile") as unknown as Tile[]

  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const tileSize = tileSizes[widgetSettings.tile_size ?? "medium"]
  const tileGap = widgetSettings.margin ?? 10
  const totalTileWidth = (parseInt(tileSize) + tileGap) * 4
  tilesContainer.style.gridTemplateColumns = `repeat(auto-fit, ${totalTileWidth}px)`

  const validTiles = await checkForBrokenImages(tiles)
  console.log("validTiles", validTiles)
  if (validTiles && validTiles.length > 0) {
    addQuadrantTiles(validTiles, tileSize)
  }

  sdk.addEventListener("moreLoad", () => {
    setTimeout(() => {
      waitForMultipleElements(tilesContainer, ".ugc-tile:not(.processed)", async newTiles => {
        try {
          const validNewTiles = await checkForBrokenImages(newTiles as unknown as Tile[])
          console.log("validNewTiles", validNewTiles)
          if (validNewTiles && validNewTiles.length >= 5) {
            addQuadrantTiles(validNewTiles, tileSize)
          }
        } catch (e) {
          console.log(e)
        }
      })
    }, 500)
  })
}
