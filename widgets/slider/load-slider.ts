import { Sdk } from "types"
import { Features } from "@stackla/widget-utils"
import { getRenderMode } from "./utils"
import { markColumnsForIndent } from "./slider-design"
import navigator from "./navigator"

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

  navigator(settings, sliderInline, tilesContainer)

  const observerForGridAlignment = new ResizeObserver(() =>
    requestAnimationFrame(() => {
      if (getRenderMode(sliderInline) === "desktop") {
        markColumnsForIndent(settings)
      }
    })
  )
  observerForGridAlignment.observe(tilesContainer)

  markColumnsForIndent(settings)
  loadingElement?.classList.add("hidden")
}
