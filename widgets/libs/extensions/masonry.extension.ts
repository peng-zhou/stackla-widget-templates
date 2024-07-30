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
    gutter: 20,
    fitWidth: true,
    initLayout: false
  })

  sdk.masonry.layout()
}

export function refreshMasonryLayout() {
  // Minor delay required to pickup the tiles available in the view
  // FIXME: Update tilesUpdated to execute after DOM update
  setTimeout(() => {
    sdk.masonry.layout()
  }, 200)
}

export function loadMoreMasonryTiles() {
  if (!sdk.masonry) {
    initializeMasonry()
  }

  sdk.masonry.reloadItems()
  sdk.masonry.layout()
}
