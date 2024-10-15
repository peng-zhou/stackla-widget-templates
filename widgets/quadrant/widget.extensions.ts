import type { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function initializeQuadrant() {
  const container = sdk.querySelector(".ugc-tiles")

  if (!container) {
    throw new Error("Container not found")
  }

  const tileElements = container.querySelectorAll(".ugc-tile")
  tileElements.forEach((tile, index) => {
    // Reset the classes first, if necessary
    tile.classList.remove("large", "small")

    // First tile is large, then every fifth tile after that is large
    if (index % 5 === 0) {
      tile.classList.add("large")
    } else {
      tile.classList.add("small")
    }
  })
}
