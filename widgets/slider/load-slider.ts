import { Sdk } from "types"
import { EVENT_TILES_UPDATED, Features } from "@stackla/widget-utils"
import { markColumnsForIndent } from "./slider-design"
import navigator from "./navigator"
import { calculateContainerWidth, getTileSizeUnitless, inlineTileSize } from "./utils"
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

  sliderInline.parentElement?.style.setProperty("--container-width", calculateContainerWidth(settings))

  window.CSS.registerProperty({
    name: "--tile-size-prop",
    syntax: "<length>",
    inherits: false,
    initialValue: `${getTileSizeUnitless(settings)}px`
  })

  const nav = navigator(settings, observers)

  sdk.addEventListener(EVENT_TILES_UPDATED, () => {
    setTimeout(() => {
      nav.controlNavigationButtonVisibility()
    }, 500)
  })

  markColumnsForIndent(settings)
  loadingElement?.classList.add("hidden")

  function tilesUpdatedEventHandler() {
    markColumnsForIndent(settings)
    observers.configTileIntersectionTargets()
  }

  return { tilesUpdatedEventHandler }
}
