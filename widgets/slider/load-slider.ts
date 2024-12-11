import { Sdk } from "types"
import { Features } from "@stackla/widget-utils"
import { markColumnsForIndent } from "./slider-design"
import navigator from "./navigator"
import { gridAlignmentObserver } from "./observers"

declare const sdk: Sdk

export function loadSlider(settings: Features["tileSizeSettings"]) {
  const tileBlockElement = sdk.querySelector(".ugc-tile-wrapper")
  const sliderInline = sdk.querySelector(".slider-inline")
  const loadingElement = sliderInline.querySelector(".slider-loading.loading")

  const tilesContainer = sliderInline.querySelector<HTMLElement>(".ugc-tiles")

  if (!sliderInline) {
    throw new Error("Slider inline container not found")
  }

  if (!tileBlockElement) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  if (!tilesContainer) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  const style = sdk.getStyleConfig()
  const { inline_tile_size } = style

  tilesContainer.setAttribute("variation", inline_tile_size)

  navigator(settings)

  gridAlignmentObserver(settings).initObserve()

  markColumnsForIndent(settings)
  loadingElement?.classList.add("hidden")
}
