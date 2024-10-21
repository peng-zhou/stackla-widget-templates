import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

function enableTileContent(slide: HTMLElement) {
  slide.querySelector(".tile-loading")?.classList.add("hidden")
  slide.querySelector(".tile-content.hidden")?.classList.remove("hidden")
}

function enableTileImage(slide: HTMLElement) {
  const tileImage = slide.querySelector<HTMLImageElement>(".tile-image > img")
  if (tileImage) {
    if (tileImage.complete) {
      enableTileContent(slide)
    }
    tileImage.onload = () => enableTileContent(slide)
  }
}

export function enableTileImages(wrapper: HTMLElement) {
  const elements = wrapper.querySelectorAll<HTMLElement>(".ugc-tile:has(.tile-content.hidden)")
  elements.forEach(element => enableTileImage(element))
}

export function loadAllUnloadedTiles() {
  const tileWrapper = sdk.placement.querySelector(".ugc-tiles")
  if (tileWrapper) {
    enableTileImages(tileWrapper)
  }
}
