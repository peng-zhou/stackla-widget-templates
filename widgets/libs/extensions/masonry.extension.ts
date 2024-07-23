import { ISdkMasonry } from "../../../types/ISdkMasonry"
import Masonry from "masonry-layout"

declare const sdk: ISdkMasonry

export function initializeMasonry() {
  const tileContainer = sdk.querySelector(".ugc-tiles")

  if (!tileContainer) {
    throw new Error("Failed to find tiles UI element")
  }

  sdk.masonry = new Masonry(tileContainer, {
    itemSelector: ".ugc-tile",
    gutter: 20
  })

  if (!sdk.masonry.layout) {
    throw new Error("Failed to find masonry layout function. This probably means the masonry library is not loaded.")
  }

  sdk.masonry.layout()

  const tiles = sdk.querySelectorAll<HTMLDivElement>(".ugc-tile")

  if (!tiles) {
    throw new Error("Failed to find tiles UI element")
  }

  // TODO: Implement timestamp logic
}

export function refreshMasonryLayout() {
  if (!sdk.masonry.layout) {
    throw new Error("Failed to find masonry layout function. This probably means the masonry library is not loaded.")
  }

  sdk.masonry.layout()
}

export function loadMoreMasonryTiles() {
  if (!sdk.masonry.reloadItems) {
    throw new Error(
      "Failed to find masonry reloadItems function. This probably means the masonry library is not loaded."
    )
  }

  sdk.masonry.reloadItems()
}
