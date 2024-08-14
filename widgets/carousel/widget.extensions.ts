import type { Sdk } from "@stackla/ugc-widgets"
import { IWidgetSettings } from "../../types/IWidgetSettings"
import { getConfig } from "./widget.config"
import { waitForElm } from "widgets/libs/widget.features"
import { initializeSwiper, refreshSwiper } from "@widgets/libs/extensions/swiper.extension"

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
  const widgetSelector = sdk.placement.querySelector(".swiper")

  if (!widgetSelector) {
    throw new Error("Failed to find widget UI element. Failed to initialise Swiper")
  }

  const tileWidth = 280
  const screenSize = window.innerWidth
  const perView = !widgetSettings.enable_custom_tiles_per_page
    ? Math.floor(screenSize / tileWidth)
    : widgetSettings.tiles_per_page

  initializeSwiper(widgetSelector, perView)
}

function initializeExtendedSwiper() {
  const expandedTile = sdk.querySelector("expanded-tile")
  if (!expandedTile?.shadowRoot) {
    throw new Error("The expanded tile element not found")
  }
  const widgetSelector = expandedTile.shadowRoot.querySelector<HTMLElement>(".expanded-glide")

  if (!widgetSelector) {
    throw new Error("Failed to find widget UI element. Failed to initialise Glide")
  }

  const arrows = widgetSelector.querySelectorAll<HTMLElement>(".swiper-button-prev, .swiper-button-next")
  if (!arrows.length) {
    throw new Error("Failed to find arrows UI element")
  }

  arrows.forEach(it => (it.style.display = ""))

  initializeSwiper(widgetSelector, 1)
}

export function onTileExpand() {
  const arrows = sdk.querySelector(".glide__arrows")
  if (!arrows) {
    throw new Error("Failed to find glide arrows UI element")
  }
  arrows.style.display = "none"

  const expandedTile = sdk.querySelector("expanded-tile")

  if (!expandedTile?.shadowRoot) {
    throw new Error("The expanded tile element not found")
  }

  expandedTile.closest("div.expanded-tile-container")?.classList.add("expanded-tile-overlay")

  waitForElm(expandedTile.shadowRoot, [".expanded-glide"], initializeExtendedSwiper)
}

export function onTileClosed() {
  const arrows = sdk.querySelector(".glide__arrows")
  if (!arrows) {
    throw new Error("Failed to find glide arrows UI element")
  }
  arrows.style.display = ""

  const expandedTile = sdk.querySelector("expanded-tile")

  expandedTile?.closest("div.expanded-tile-container")?.classList.remove("expanded-tile-overlay")
}

export function hideSlidesWithInvisibleTiles() {
  const ugcContainer = sdk.placement.querySelector("#nosto-ugc-container")
  const widgetSelector = sdk.placement.querySelector(".swiper")
  const slides = widgetSelector?.querySelectorAll<HTMLElement>(".swiper-slide")

  slides?.forEach(slide => {
    if (!slide.children.length || !!slide.querySelector('div.ugc-tile[style="display: none;"]')) {
      slide.remove()
    }
  })

  const totalSlides = widgetSelector?.querySelectorAll(".swiper-slide").length || 0
  const totalPaginationBullets = ugcContainer?.querySelectorAll(".swiper-pagination-bullet").length || 0

  if (totalPaginationBullets > totalSlides) {
    const additionalBullets = totalPaginationBullets - totalSlides
    const bullets = ugcContainer!.querySelectorAll<HTMLElement>(".swiper-pagination-bullet")
    Array.from(Array(additionalBullets).keys()).forEach(index => {
      if (bullets[index]) {
        bullets[index].remove()
      }
    })
  }
  initializeInlineSwiperListeners()
}

export function onPreloadTileHidden(tileId: string) {
  const ugcContainer = sdk.placement.querySelector("#nosto-ugc-container")
  const widgetSelector = sdk.placement.querySelector(".swiper")
  const slides = Array.from(widgetSelector?.querySelectorAll<HTMLElement>(".swiper-slide") || [])

  slides.find(slide => slide.querySelector(`div.ugc-tile[data-id="${tileId}"]`))?.remove()

  Array.from(ugcContainer!.querySelectorAll<HTMLElement>(".swiper-pagination-bullet")).pop()

  refreshSwiper("swiperInline")
}
