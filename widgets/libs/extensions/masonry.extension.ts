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
    initLayout: false,
    percentPosition: true,
    stagger: 5,
    columnWidth: ".ugc-tile"
  })

  sdk.masonry.layout()
}

export function refreshMasonryLayout() {
  clearTimeout(window.refreshMasonryLayout)

  window.refreshMasonryLayout = setTimeout(() => {
    sdk.masonry.reloadItems()
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
