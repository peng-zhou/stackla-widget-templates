import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export async function reinitialiseWaterfallLayout(minmax: [number, number]) {
  resizeAllUgcTilesHeight(minmax, true)
}

export async function refreshWaterfallLayout(minmax: [number, number], refresh = true) {
  if (refresh) {
    resizeAllUgcTilesHeight(minmax)
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

export function resizeAllUgcTilesHeight([minHeight, maxHeight]: [number, number], reset = false) {
  const allTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".grid-item") ?? [])
  const ugcTiles = reset ? allTiles : allTiles.filter(tile => tile.getAttribute("height-set") !== "true")

  if (!ugcTiles || ugcTiles.length === 0) {
    return
  }

  const rowHeight = 10

  ugcTiles.forEach(async (tile: HTMLElement) => {
    const randomHeight = generateRandomHeights(minHeight, maxHeight)

    const rowSpan = Math.ceil(randomHeight / rowHeight)

    tile.style.gridRowEnd = `span ${rowSpan}`

    tile.setAttribute("height-set", "true")
    tile.classList.add("processed")
  })
}
