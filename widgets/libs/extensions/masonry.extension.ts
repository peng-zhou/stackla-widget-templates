import { Sdk } from "@stackla/ugc-widgets"
import { resizeAllUgcTiles } from "@widgets/masonry/masonry.lib"
import Isotope from "isotope-layout"

declare const sdk: Sdk

export let masonryInstance: Isotope

export function initializeMasonry() {
  const tileContainer = sdk.querySelector("#nosto-ugc-container")

  if (!tileContainer) {
    throw new Error("Failed to find tiles UI element")
  }

  masonryInstance = new Isotope(tileContainer, {
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
    percentPosition: true
  })
}

export async function reinitialiseMasonryLayout() {
  resizeAllUgcTiles(true)
  if (masonryInstance) {
    masonryInstance.layout()
  }
}

export async function refreshMasonryLayout(refresh = true) {
  if (refresh) {
    resizeAllUgcTiles()
  }

  if (masonryInstance) {
    masonryInstance.layout()
  }
}
