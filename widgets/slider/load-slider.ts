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

  function getDeviceType() {
    const innerWidth = window.innerWidth
    if (innerWidth < 544) {
      return "mobile"
    } else if (innerWidth >= 544 && innerWidth < 700) {
      return "small-tablet"
    } else if (innerWidth >= 700 && innerWidth < 1024) {
      return "tablet"
    } else if (innerWidth >= 1024 && innerWidth < 1080) {
      return "x-small-desktop"
    } else if (innerWidth >= 1080 && innerWidth < 1160) {
      return "small-desktop"
    } else if (innerWidth >= 1160 && innerWidth < 1400) {
      return "medium-desktop"
    } else {
      return "desktop"
    }
  }

  function getMediumDesktopIndents() {
    return [1, 3, 6, 8]
  }

  function getDesktopIndents() {
    return [1, 2, 8, 11]
  }

  function getTabletIndents() {
    return [1]
  }

  function getDesktopPattern() {
    return [
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
  }

  function getSmallDesktopPattern() {
    return [
      "pattern-horizontal",
      "pattern-vertical",
      "pattern-vertical-reversed",
      "pattern-horizontal",
      "pattern-horizontal-reversed"
    ]
  }

  function getMediumDesktopPattern() {
    return [
      "pattern-vertical",
      "pattern-horizontal",
      "pattern-horizontal-reversed",
      "pattern-horizontal-reversed",
      "pattern-horizontal",
      "pattern-vertical-reversed",
      "pattern-horizontal",
      "pattern-horizontal-reversed",
      "pattern-horizontal-reversed",
      "pattern-horizontal"
    ]
  }

  function getExtraSmallDesktopPattern() {
    return [
      "pattern-vertical",
      "pattern-horizontal",
      "pattern-vertical",
      "pattern-horizontal-reversed",
      "pattern-vertical-reversed",
      "pattern-horizontal"
    ]
  }

  function getMobilePattern() {
    return ["pattern-horizontal", "pattern-vertical", "pattern-horizontal-reversed"]
  }

  function getTabletPattern() {
    return ["pattern-horizontal", "pattern-vertical", "pattern-horizontal-reversed"]
  }

  function getSmallTabletPattern() {
    return [
      "pattern-horizontal",
      "pattern-vertical",
      "pattern-vertical-reversed",
      "pattern-horizontal-reversed",
      "pattern-vertical-reversed",
      "pattern-vertical"
    ]
  }

  function getPatternByDeviceType() {
    if (getDeviceType() === "mobile") {
      return getMobilePattern()
    }

    if (getDeviceType() === "tablet") {
      return getTabletPattern()
    }

    if (getDeviceType() === "small-tablet") {
      return getSmallTabletPattern()
    }

    if (getDeviceType() === "medium-desktop") {
      return getMediumDesktopPattern()
    }

    if (getDeviceType() === "small-desktop") {
      return getSmallDesktopPattern()
    }

    if (getDeviceType() === "x-small-desktop") {
      return getExtraSmallDesktopPattern()
    }

    return getDesktopPattern()
  }

  function generatePatterns() {
    const patternSequence = getPatternByDeviceType()

    let sequenceIndex = 0

    sdk.querySelectorAll(".ugc-tile").forEach(tile => {
      tile.classList.remove(
        "pattern-horizontal",
        "pattern-vertical",
        "pattern-vertical-reversed",
        "pattern-horizontal-reversed",
        "grid-column-indent"
      )
      // indents for 1 vertical,2 vertical reversed, 8 - horizontal, 11-horizontal reversed

      if (getDeviceType() === "desktop") {
        const indents = getDesktopIndents()
        if (indents.includes(sequenceIndex)) {
          tile.classList.add("grid-column-indent")
        }
      }

      if (getDeviceType() === "tablet") {
        const indents = getTabletIndents()
        if (indents.includes(sequenceIndex)) {
          tile.classList.add("grid-column-indent")
        }
      }

      if (getDeviceType() === "medium-desktop") {
        const indents = getMediumDesktopIndents()
        if (indents.includes(sequenceIndex)) {
          tile.classList.add("grid-column-indent")
        }
      }

      // Apply the current pattern in the sequence
      const currentPattern = patternSequence[sequenceIndex]
      tile.classList.add(currentPattern)
      tile.dataset.patternId = sequenceIndex.toString()

      // Move to the next pattern in the sequence, cycling back to the start
      sequenceIndex = (sequenceIndex + 1) % patternSequence.length
    })
  }

  function resizeHandler() {
    generatePatterns()
  }

  function tilesUpdatedEventHandler() {
    generatePatterns()
    observers.configTileIntersectionTargets()
  }

  function widgetLoadedEventHandler() {
    generatePatterns()
  }

  generatePatterns()

  return { tilesUpdatedEventHandler, widgetLoadedEventHandler, resizeHandler }
}
