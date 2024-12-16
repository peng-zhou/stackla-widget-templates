import { Sdk } from "types"
import { Features } from "@stackla/widget-utils"
import { markColumnsForIndent } from "./slider-design"
import navigator from "./navigator"
import { getTileSizeUnitless, inlineTileGap, inlineTileSize } from "./utils"
import { initObservers } from "./observers"

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

  tilesContainer.setAttribute("variation", inlineTileSize())

  sliderInline.parentElement?.style.setProperty("--container-width", calculateContainerWidth())

  window.CSS.registerProperty({
    name: "--tile-size-prop",
    syntax: "<length>",
    inherits: false,
    initialValue: `${getTileSizeUnitless(settings)}px`
  })

  const observers = initObservers({ settings, resizeCb: () => calculateContainerWidth() })

  navigator(settings)

  markColumnsForIndent(settings)
  loadingElement?.classList.add("hidden")

  function calculateContainerWidth() {
    const tileGap = inlineTileGap()
    const renderedTileSize = getTileSizeUnitless(settings) * 2 + tileGap * 2
    const availableWidth = (window.screen.width * 95) / 100
    const widthAdjusted = availableWidth - (availableWidth % renderedTileSize)
    const possibleColumns = Math.round(availableWidth / renderedTileSize)
    const veriticalColumnsAdjustment = tileGap * Math.round(possibleColumns / 3)

    // adjusting the grid gap of 10 for the last grid element in the row
    return `${widthAdjusted + tileGap - veriticalColumnsAdjustment}px`
  }

  function tilesUpdatedEventHandler() {
    markColumnsForIndent(settings)
    observers.configTileIntersectionTargets()
  }

  return { tilesUpdatedEventHandler }
}
