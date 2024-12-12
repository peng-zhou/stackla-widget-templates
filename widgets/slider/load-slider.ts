import { Sdk } from "types"
import { Features } from "@stackla/widget-utils"
import { markColumnsForIndent } from "./slider-design"
import navigator from "./navigator"
import { gridAlignmentObserver, tilesIntersectionObserver } from "./observers"
import { getTileSizeUnitless } from "./utils"

declare const sdk: Sdk

type Observers = {
  tilesIntersectionObserver: ReturnType<typeof tilesIntersectionObserver>
  alignmentObserver: ReturnType<typeof gridAlignmentObserver>
}

export function loadSlider(settings: Features["tileSizeSettings"], observers: Observers) {
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

  window.CSS.registerProperty({
    name: "--tile-size-prop",
    syntax: "<length>",
    inherits: false,
    initialValue: `${getTileSizeUnitless(settings)}px`
  })

  navigator(settings)

  observers.alignmentObserver.initObserve()

  markColumnsForIndent(settings)
  loadingElement?.classList.add("hidden")
}
