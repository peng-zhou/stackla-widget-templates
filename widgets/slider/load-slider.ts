import { SdkSwiper } from "types"

declare const sdk: SdkSwiper

export default function () {
  const sliderScrollUpButton = sdk.querySelector("#scroll-up")
  const sliderScrollDownButton = sdk.querySelector("#scroll-down")
  const tileBlockElement = sdk.querySelector(".ugc-tile-wrapper")
  const tilesContainer = sdk.querySelector(".ugc-tiles")

  if (!tileBlockElement) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  if (!tilesContainer) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  if (!sliderScrollUpButton) {
    throw new Error("Slider Tiles Scroll Up Button not found")
  }

  if (!sliderScrollDownButton) {
    throw new Error("Slider Tiles Scroll Down Button not found")
  }

  const blockHeight = tileBlockElement.offsetHeight || 220

  sliderScrollUpButton.addEventListener("click", () => {
    tilesContainer.scrollBy({
      top: -blockHeight,
      behavior: "smooth"
    })
  })

  sliderScrollDownButton.addEventListener("click", () => {
    tilesContainer.scrollBy({
      top: blockHeight,
      behavior: "smooth"
    })
  })
}
