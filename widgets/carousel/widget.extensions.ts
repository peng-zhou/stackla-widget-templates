import type { Sdk } from "@stackla/ugc-widgets"
import { IWidgetSettings } from "../../types/IWidgetSettings"
import { getConfig } from "./widget.config"
import { waitForElm } from "widgets/libs/widget.features"
import {
  disableSwiper,
  enableSwiper,
  getClickedIndex,
  initializeSwiper,
  refreshSwiper
} from "@widgets/libs/extensions/swiper/swiper.extension"

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
  const widgetSelector = sdk.placement.querySelector(".swiper-inline")

  if (!widgetSelector) {
    throw new Error("Failed to find widget UI element. Failed to initialise Swiper")
  }

  const tileWidth = 220
  const screenSize = window.innerWidth
  const perView = !widgetSettings.enable_custom_tiles_per_page
    ? Math.floor(screenSize / (tileWidth + 10))
    : widgetSettings.tiles_per_page

  initializeSwiper({
    widgetSelector,
    perView,
    prevButton: "swiper-inline-button-prev",
    nextButton: "swiper-inline-button-next"
  })
}

function initializeExtendedSwiper() {
  const expandedTile = sdk.querySelector("expanded-tiles")
  if (!expandedTile?.shadowRoot) {
    throw new Error("The expanded tile element not found")
  }
  const widgetSelector = expandedTile.shadowRoot.querySelector<HTMLElement>(".swiper-expanded")

  if (!widgetSelector) {
    throw new Error("Failed to find widget UI element. Failed to initialise Glide")
  }

  initializeSwiper({
    widgetSelector,
    perView: 1,
    mode: "swiperExpanded",
    initialIndex: getClickedIndex("swiperInline"),
    prevButton: "swiper-expanded-button-prev",
    nextButton: "swiper-expanded-button-next"
  })
}

export function onTileExpand() {
  const expandedTile = sdk.querySelector("expanded-tiles")

  if (!expandedTile?.shadowRoot) {
    throw new Error("The expanded tile element not found")
  }

  expandedTile.parentElement!.classList.add("expanded-tile-overlay")

  disableSwiper("swiperInline")

  waitForElm(expandedTile.shadowRoot, [".swiper-expanded"], initializeExtendedSwiper)
}

export function onTileRendered() {
  const expandedTilesElement = sdk.querySelector("expanded-tiles")

  if (!expandedTilesElement) {
    throw new Error("Expanded tiles element not found")
  }

  const tiles = expandedTilesElement.shadowRoot?.querySelectorAll(".swiper-slide")

  tiles?.forEach(tile => {
    const shareButton = tile.querySelector<HTMLElement>(".panel-right .share-button")
    if (shareButton) {
      shareButton.addEventListener("click", (shareButtonEvent: MouseEvent) => {
        shareButtonEvent.preventDefault()
        shareButtonEvent.stopPropagation()
        const wrapper = tile.querySelector<HTMLElement>(".share-socials-popup-wrapper")
        if (wrapper) {
          wrapper.style.display = "block"
          const exitButton = wrapper.querySelector<HTMLElement>(".exit")
          if (exitButton) {
            exitButton.addEventListener("click", (exitButtonEvent: MouseEvent) => {
              exitButtonEvent.preventDefault()
              exitButtonEvent.stopPropagation()
              wrapper.style.display = "none"
            })
          }
          const clipboardElement = wrapper.querySelector<HTMLElement>(".url-copy .copy-button")
          const shareUrlElement = wrapper.querySelector<HTMLInputElement>(".url-copy .share-url")

          if (shareUrlElement && clipboardElement) {
            clipboardElement.addEventListener("click", () => copyToClipboard(shareUrlElement.value))
          }
        }
      })
    }
  })
}

async function copyToClipboard(copyText: unknown) {
  if (copyText instanceof HTMLInputElement) {
    try {
      await navigator.clipboard.writeText(copyText.value)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy text: ", err)
    }
  }
}

export function onTileClosed() {
  const expandedTile = sdk.querySelector("expanded-tiles")

  if (!expandedTile?.shadowRoot) {
    throw new Error("The expanded tile element not found")
  }

  expandedTile.parentElement!.classList.remove("expanded-tile-overlay")

  disableSwiper("swiperExpanded")
  enableSwiper("swiperInline")
}

export function hideSlidesWithInvisibleTiles() {
  const widgetSelectorWrapper = sdk.placement.querySelector(".swiper-wrapper")
  const slides = widgetSelectorWrapper?.querySelectorAll<HTMLElement>(".swiper-slide")

  slides?.forEach(slide => {
    if (!slide.children.length || slide.style.display === "none") {
      slide.remove()
    }
  })
  refreshSwiper("swiperInline")
}

export function onPreloadTileHidden(tileId: string) {
  const widgetSelectorWrapper = sdk.placement.querySelector(".swiper-wrapper")
  const slide = widgetSelectorWrapper?.querySelector<HTMLElement>(`.swiper-slide[data-id="${tileId}"]`)
  slide?.remove()

  refreshSwiper("swiperInline")
}
