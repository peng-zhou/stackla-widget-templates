import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export async function reinitialiseWaterfallLayout() {
  resizeAllUgcTilesHeight(true)
}

export async function refreshWaterfallLayout(refresh = true) {
  if (refresh) {
    resizeAllUgcTilesHeight()
  }
}

/**
 * Generate random heights for the tiles in the waterfall layout
 * @param minHeight Minimum height for each tile
 * @param maxHeight Maximum height for each tile
 * @returns
 */
export function generateRandomHeights(minHeight: number, maxHeight: number) {
  return Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight
}

export const resizeAllUgcTilesHeight = (() => {
  let executionCount = 0

  return function (reset = false) {
    if (reset) {
      executionCount = 0
    }

    executionCount += 1
    const allTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".grid-item") ?? [])
    const ugcTiles = reset ? allTiles : allTiles.filter(tile => tile.getAttribute("height-set") !== "true")

    if (!ugcTiles || ugcTiles.length === 0) {
      return
    }

    const rowHeight = 10 // This should match the grid-auto-rows value from CSS

    ugcTiles.forEach(async (tile: HTMLElement) => {
      const randomHeight = generateRandomHeights(260, 450)

      // Calculate how many rows this tile should span
      const rowSpan = Math.ceil(randomHeight / rowHeight)

      // Apply the row span to make the tile fill the right amount of space
      tile.style.gridRowEnd = `span ${rowSpan}`

      // Mark the tile as processed
      tile.setAttribute("height-set", "true")
      tile.setAttribute("execution-count", executionCount.toString())
      tile.classList.add("processed")
    })
  }
})()
