import { Sdk } from "@stackla/ugc-widgets"
import { refreshMasonryLayout } from "../libs/extensions/masonry.extension"
declare const sdk: Sdk

export function onTileClose() {
  // TODO: Add waitforelm here
  setTimeout(() => {
    const tilesContainer = sdk.querySelector("#tiles")
    const ugcTiles = sdk.querySelector(".ugc-tiles")

    if (!ugcTiles) {
      throw new Error("Failed to find tiles wrapper")
    }

    if (!tilesContainer) {
      throw new Error("Failed to find tiles container")
    }

    tilesContainer.style.display = "flex"

    // TODO - A bit buggy, need to find a better way to refresh masonry
    refreshMasonryLayout()
  }, 200)
}
