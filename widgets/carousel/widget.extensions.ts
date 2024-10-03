import type { Sdk } from "@stackla/ugc-widgets"
import { IWidgetSettings } from "../../types/IWidgetSettings"
import { getConfig } from "./widget.config"
import { initializeSwiper, refreshSwiper } from "@widgets/libs/extensions/swiper/swiper.extension"

declare const sdk: Sdk

export function initializeInlineSwiperListeners() {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  const swiper = sdk.querySelector(".swiper-inline")

  if (!swiper) {
    throw new Error("Failed to find swiper element")
  }

  initializeInlineSwiper(widgetSettings)
}

function initializeInlineSwiper(widgetSettings: IWidgetSettings) {
  const widgetSelector = sdk.placement.querySelector<HTMLElement>(".swiper-inline")

  if (!widgetSelector) {
    throw new Error("Failed to find widget UI element. Failed to initialise Swiper")
  }

  const tileWidth = 210
  const screenSize = window.innerWidth
  const perView = !widgetSettings.enable_custom_tiles_per_page
    ? Math.floor(screenSize / (tileWidth + 10))
    : widgetSettings.tiles_per_page

  const width = (tileWidth + 10) * perView
  widgetSelector.style.width = `${width}px`

  initializeSwiper({
    widgetSelector,
    perView,
    prevButton: "swiper-inline-button-prev",
    nextButton: "swiper-inline-button-next"
  })
}

export function hideSlidesWithInvisibleTiles() {
  const widgetSelectorWrapper = sdk.placement.querySelector(".swiper-wrapper")
  const slides = widgetSelectorWrapper?.querySelectorAll<HTMLElement>(".swiper-slide")

  slides?.forEach(slide => {
    if (!slide.children.length || slide.style.display === "none") {
      slide.remove()
    }
  })
  refreshSwiper("inline")
}

export function onPreloadTileHidden(tileId: string) {
  const widgetSelectorWrapper = sdk.placement.querySelector(".swiper-wrapper")
  const slide = widgetSelectorWrapper?.querySelector<HTMLElement>(`.swiper-slide[data-id="${tileId}"]`)
  slide?.remove()

  refreshSwiper("inline")
}
