import { Sdk } from "types"
import { Features } from "@stackla/widget-utils"
import navigator from "./navigator"
import { inlineTileSize } from "./utils"
import { initObservers } from "./observers"

declare const sdk: Sdk

export function loadSlider(settings: Features["tileSizeSettings"], observers: ReturnType<typeof initObservers>) {
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

  tilesContainer.setAttribute("variation", inlineTileSize())

  navigator(settings, observers)

  loadingElement?.classList.add("hidden")

  function generatePatterns() {
    const patternSequence = [
      "pattern-horizontal",
      "pattern-vertical",
      "pattern-vertical-reversed",
      "pattern-horizontal",
      "pattern-horizontal-reversed",
      "pattern-horizontal-reversed",
      "pattern-vertical",
      "pattern-vertical-reversed",
      "pattern-horizontal",
      "pattern-vertical",
      "pattern-vertical-reversed",
      "pattern-horizontal-reversed"
    ]
    let sequenceIndex = 0

    sdk.querySelectorAll(".ugc-tile").forEach(tile => {
      tile.classList.remove(
        "pattern-horizontal",
        "pattern-vertical",
        "pattern-vertical-reversed",
        "pattern-horizontal-reversed",
        "grid-column-indent"
      )

      // Apply the current pattern in the sequence
      const currentPattern = patternSequence[sequenceIndex]
      tile.classList.add(currentPattern)
      tile.dataset.patternId = sequenceIndex.toString()

      // Move to the next pattern in the sequence, cycling back to the start
      sequenceIndex = (sequenceIndex + 1) % patternSequence.length
    })
  }

  function tilesUpdatedEventHandler() {
    generatePatterns()
    observers.configTileIntersectionTargets()
  }

  function widgetLoadedEventHandler() {
    generatePatterns()
  }

  generatePatterns()

  return { tilesUpdatedEventHandler, widgetLoadedEventHandler }
}
