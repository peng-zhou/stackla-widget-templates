import Swiper from "swiper"
import { SdkSwiper } from "types"
import { Keyboard, Manipulation, Navigation } from "swiper/modules"
import { SwiperData, SwiperMode, SwiperProps } from "types/SdkSwiper"
import { enableTileImages } from "./loader.extension"

declare const sdk: SdkSwiper

export function initializeSwiper({
  widgetSelector,
  perView,
  mode = "inline",
  prevButton = "swiper-button-prev",
  nextButton = "swiper-button-next",
  initialIndex = 0,
  initialTileId = undefined
}: SwiperProps) {
  const prev = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${prevButton}`)
  const next = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${nextButton}`)

  if (!prev || !next) {
    throw new Error("Missing swiper Navigation elements for previous and next navigation")
  }

  if (!sdk[mode]) {
    sdk[mode] = {} as SwiperData
  }

  const swiperInstance = sdk[mode]?.instance

  if (swiperInstance) {
    if (!swiperInstance.params?.enabled) {
      enableSwiper(mode)
    } else {
      // re-initialize
      swiperInstance.destroy(true)
    }
  } else {
    sdk[mode] = { pageIndex: 1 }
  }

  sdk[mode]!.instance = new Swiper(widgetSelector, {
    modules: [Navigation, Manipulation, Keyboard],
    spaceBetween: 10,
    slidesPerView: perView,
    observer: true,
    grabCursor: false,
    allowTouchMove: false,
    lazyPreloadPrevNext: perView,
    keyboard: {
      enabled: true,
      onlyInViewport: false
    },
    direction: "horizontal",
    watchSlidesProgress: true,
    normalizeSlideIndex: true,
    watchOverflow: true,
    navigation: {
      nextEl: next,
      prevEl: prev
    },
    on: {
      beforeInit: swiper => {
        enableLoadedTiles()
        const tileIndex = initialTileId ? getSwiperIndexforTile(widgetSelector, initialTileId) : initialIndex
        swiper.slideToLoop(tileIndex, 0, false)
      },
      afterInit: swiper => {
        sdk[mode]!.isLoading = true
        if (mode === "inline") {
          void loadTilesAsync(swiper, mode)
        }
      },
      activeIndexChange: swiper => {
        if (swiper.navigation.prevEl) {
          if (swiper.realIndex === 0 && sdk[mode]?.isLoading) {
            disblePrevNavigation(swiper)
          } else {
            enablePrevNavigation(swiper)
          }
        }
      }
    },
    resizeObserver: true
  })

  sdk[mode]!.perView = perView
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

function enableLoadedTiles() {
  sdk.placement
    .querySelectorAll(".ugc-tiles > .ugc-tile[style*='display: none']")
    ?.forEach(tileElement => (tileElement.style.display = ""))
}

async function loadTilesAsync(swiper: Swiper, mode: SwiperMode) {
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
  updateLoadingStateInterval(swiper.el, mode)
}

function updateLoadingStateInterval(swiperElem: HTMLElement, mode: SwiperMode) {
  const intervalId = setInterval(function () {
    const elements = swiperElem.querySelectorAll<HTMLElement>(".swiper-slide:has(.tile-content.hidden)")
    if (elements.length === 0) {
      clearInterval(intervalId)
      sdk[mode]!.isLoading = false
      sdk[mode]!.instance!.off("activeIndexChange")
      sdk[mode]!.instance!.setGrabCursor()
      sdk[mode]!.instance!.allowTouchMove = true
      sdk[mode]!.instance!.params.loop = true
      enablePrevNavigation(sdk[mode]!.instance!)
      refreshSwiper(mode)
    }
  }, 200)
}

export function refreshSwiper(mode: SwiperMode) {
  if (sdk[mode]?.instance) {
    sdk[mode].instance.update()
  }
}

function getSwiperIndexforTile(swiperSelector: HTMLElement, tileId: string) {
  const slideElements = swiperSelector.querySelectorAll<HTMLElement>(".swiper-slide")
  const index = Array.from(slideElements).findIndex(element => element.getAttribute("data-id") === tileId)
  return index < 0 ? 0 : index
}

export function disableSwiper(mode: SwiperMode) {
  sdk[mode]?.instance?.disable()
}

export function enableSwiper(mode: SwiperMode) {
  sdk[mode]?.instance?.enable()
}

export function destroySwiper(mode: SwiperMode) {
  sdk[mode]?.instance?.destroy(true, true)
}

export function getClickedIndex(mode: SwiperMode) {
  if (sdk[mode]?.instance) {
    const clickedSlide = sdk[mode].instance.clickedSlide
    const indexFromAttribute = clickedSlide.getAttribute("data-swiper-slide-index")
    return indexFromAttribute && !Number.isNaN(parseInt(indexFromAttribute))
      ? parseInt(indexFromAttribute)
      : sdk[mode].instance.clickedIndex
  }
  return 0
}
