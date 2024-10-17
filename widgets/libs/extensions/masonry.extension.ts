import { Sdk } from "@stackla/ugc-widgets"
import { preloadTileBackgroundImages, resizeAllUgcTiles } from "@widgets/masonry/masonry.lib"
import Isotope from "isotope-layout"

declare const sdk: Sdk

export let masonryInstance: typeof Isotope

export function initializeMasonry() {
  const tileContainer = sdk.querySelector("#nosto-ugc-container")

  if (!tileContainer) {
    throw new Error("Failed to find tiles UI element")
  }

  masonryInstance = new Isotope(tileContainer, {
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
    fitWidth: true,
    horizontalOrder: true,
    percentPosition: true
  })
}

export async function refreshMasonryLayout(refresh = true) {
  await preloadTileBackgroundImages()
  if (refresh) {
    resizeAllUgcTiles()
  }

  if (masonryInstance) {
    masonryInstance.layout()
  }
}
