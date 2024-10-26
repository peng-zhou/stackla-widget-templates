import { IWidgetSettings, SdkSwiper } from "types"
import { getConfig } from "./widget.config"
import { initializeSwiper, refreshSwiper } from "@libs/extensions/swiper/swiper.extension"
import { enableTileImages } from "@libs/extensions/swiper/loader.extension"
import Swiper from "swiper"

declare const sdk: SdkSwiper

export function initializeInlineSwiperListeners() {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  const swiper = sdk.querySelector(".swiper-inline")

  if (!swiper) {
    throw new Error("Failed to find swiper element")
  }

  initializeSwiperForInlineTiles(widgetSettings)
}

function initializeSwiperForInlineTiles(widgetSettings: IWidgetSettings) {
  const widgetSelector = sdk.placement.querySelector<HTMLElement>(".swiper-inline")

  if (!widgetSelector) {
    throw new Error("Failed to find widget UI element. Failed to initialise Swiper")
  }

  const tileWidth = 210
  const screenSize = window.innerWidth
  const perView = !widgetSettings.enable_custom_tiles_per_page
    ? Math.floor(screenSize / (tileWidth + 10))
    : widgetSettings.tiles_per_page

  sdk.tiles.setVisibleTilesCount(perView * 2)

  initializeSwiper({
    id: "inline",
    mode: "inline",
    widgetSelector,
    prevButton: "swiper-inline-button-prev",
    nextButton: "swiper-inline-button-next",
    paramsOverrides: {
      slidesPerView: "auto",
      grabCursor: false,
      allowTouchMove: false,
      slidesOffsetBefore: 20,
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      on: {
        beforeInit: swiper => {
          enableLoadedTiles()
          swiper.slideToLoop(0, 0, false)
        },
        afterInit: swiper => {
          sdk["inline"]!.isLoading = true
          void loadTilesAsync(swiper)
        },
        activeIndexChange: swiper => {
          if (swiper.navigation.prevEl) {
            if (swiper.realIndex === 0 && sdk["inline"]?.isLoading) {
              disblePrevNavigation(swiper)
            } else {
              enablePrevNavigation(swiper)
            }
          }
        }
      }
    }
  })
}

export function enableLoadedTiles() {
  sdk.placement
    .querySelectorAll(".ugc-tiles > .ugc-tile[style*='display: none']")
    ?.forEach(tileElement => (tileElement.style.display = ""))
}

async function loadTilesAsync(swiper: Swiper) {
  const observer = registerObserver(swiper)
  let pageIndex = 1
  while (sdk.tiles.hasMoreTiles()) {
    pageIndex++
    if (sdk.tiles.page < pageIndex) {
      sdk.tiles.page = pageIndex
    }
    await sdk.tiles.fetchTiles(pageIndex)
    enableLoadedTiles()
    swiper.update()
  }

  observer.disconnect()
  swiper.navigation.nextEl.classList.remove("swiper-button-hidden")
  updateLoadingStateInterval(swiper.el)
}

function updateLoadingStateInterval(swiperElem: HTMLElement) {
  const intervalId = setInterval(function () {
    const elements = swiperElem.querySelectorAll<HTMLElement>(".swiper-slide:has(.icon-section.hidden)")
    if (elements.length === 0) {
      clearInterval(intervalId)
      sdk["inline"]!.isLoading = false
      sdk["inline"]!.instance!.off("activeIndexChange")
      sdk["inline"]!.instance!.setGrabCursor()
      sdk["inline"]!.instance!.allowTouchMove = true
      sdk["inline"]!.instance!.params.loop = true
      enablePrevNavigation(sdk["inline"]!.instance!)
      refreshSwiper("inline")
    }
  }, 200)
}

function enablePrevNavigation(swiper: Swiper) {
  swiper.allowSlidePrev = true
  swiper.navigation.prevEl.classList.remove("swiper-button-hidden")
}

function disblePrevNavigation(swiper: Swiper) {
  swiper.allowSlidePrev = false
  swiper.navigation.prevEl.classList.add("swiper-button-hidden")
}

function registerObserver(swiper: Swiper) {
  const observer = new MutationObserver(() => {
    enableTileImages(swiper.wrapperEl)
  })
  observer.observe(swiper.wrapperEl, {
    childList: true
  })
  return observer
}
