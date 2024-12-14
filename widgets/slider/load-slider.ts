import { Sdk } from "types"
import { Features } from "@stackla/widget-utils"
import { markColumnsForIndent } from "./slider-design"
import navigator from "./navigator"
import { getTileSizeUnitless } from "./utils"
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

  const style = sdk.getStyleConfig()
  const { inline_tile_size } = style

  tilesContainer.setAttribute("variation", inline_tile_size)

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
    const renderedTileSize = getTileSizeUnitless(settings) * 2 + 20
    const availableWidth = (window.screen.width * 95) / 100
    const widthAdjusted = availableWidth - (availableWidth % renderedTileSize)
    const possibleColumns = Math.round(availableWidth / renderedTileSize)
    const veriticalColumnsAdjustment = 10 * Math.round(possibleColumns / 3)

    return `${widthAdjusted - veriticalColumnsAdjustment}px`
  }

  function tilesUpdatedEventHandler() {
    markColumnsForIndent(settings)
    observers.configTileIntersectionTargets()
  }

  return { tilesUpdatedEventHandler }
}
