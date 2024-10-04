import { Sdk } from "@stackla/ugc-widgets"
import Masonry from "masonry-layout"

declare const sdk: Sdk

export let masonryInstance: Masonry

export function initializeMasonry() {
  const tileContainer = sdk.querySelector(".ugc-tiles")

  if (!tileContainer) {
    throw new Error("Failed to find tiles UI element")
  }

  masonryInstance = new Masonry(tileContainer, {
    gutter: 10,
    itemSelector: ".ugc-tile",
    fitWidth: true,
    initLayout: false
  })

  masonryInstance.layout()
}

export function refreshMasonryLayout() {
  clearTimeout(window.refreshMasonryLayout)

  window.refreshMasonryLayout = setTimeout(() => {
    masonryInstance.reloadItems()
    masonryInstance.layout()
  }, 200)
}

export function loadMoreMasonryTiles() {
  if (!masonryInstance) {
    initializeMasonry()
  }

  masonryInstance.reloadItems()
  masonryInstance.layout()
}
