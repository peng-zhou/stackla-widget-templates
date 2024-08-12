import type { Sdk } from "@stackla/ugc-widgets"
import { IWidgetSettings } from "../../types/IWidgetSettings"
import { getConfig } from "./widget.config"
import { waitForElm } from "widgets/libs/widget.features"
import Swiper from "swiper"
import { Navigation, Pagination } from "swiper/modules"

declare const sdk: Sdk

export function initializeInlineSwiperListeners() {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  const tiles = sdk.querySelector(".swiper-inline")

  if (!tiles) {
    throw new Error("Failed to find tiles or arrow UI element")
  }

  tiles.style.display = ""
  initializeInlineSwiper(widgetSettings)

  const glide = sdk.querySelector(".swiper-inline")

  if (!glide) {
    throw new Error("Failed to find inline glide element")
  }

  const arrows = glide.querySelector<HTMLElement>(".glide__arrows")
  if (!arrows) {
    throw new Error("Failed to find arrows UI element")
  }

  arrows.style.display = ""
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

function initializeSwiper(widgetSelector: HTMLElement, perView: number) {
  const ugcContainer = sdk.querySelector("#nosto-ugc-container")
  const prev = ugcContainer!.querySelector<HTMLElement>(".swiper-button-prev")
  const next = ugcContainer!.querySelector<HTMLElement>(".swiper-button-next")
  const pagination = ugcContainer!.querySelector<HTMLElement>(".swiper-pagination")

  new Swiper(widgetSelector, {
    modules: [Navigation, Pagination],
    slidesPerView: perView,
    spaceBetween: 10,
    centeredSlides: true,
    hashNavigation: true,
    loop: true,
    direction: "horizontal",
    observeParents: true,
    observer: true,
    // If we need pagination
    pagination: {
      el: pagination!
    },

    // Navigation arrows
    navigation: {
      nextEl: next!,
      prevEl: prev!
    }
  })
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
