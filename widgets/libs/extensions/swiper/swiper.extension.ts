import Swiper from "swiper"
import { SdkSwiper } from "types"
import { Keyboard, Manipulation, Navigation } from "swiper/modules"
import { SwiperData, SwiperProps } from "types/SdkSwiper"
import { enableTileImages } from "./loader.extension"

declare const sdk: SdkSwiper

export function initializeSwiper({
  id,
  widgetSelector,
  perView = "auto",
  mode,
  prevButton = "swiper-button-prev",
  nextButton = "swiper-button-next",
  initialIndex = 0,
  initialTileId = undefined,
  paramsOverrides
}: SwiperProps) {
  const prev = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${prevButton}`)
  const next = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${nextButton}`)

  if (!prev || !next) {
    throw new Error("Missing swiper Navigation elements for previous and next navigation")
  }

  if (!sdk[id]) {
    sdk[id] = {} as SwiperData
  }

  const swiperInstance = sdk[id]?.instance

  if (swiperInstance) {
    if (!swiperInstance.params?.enabled) {
      enableSwiper(id)
    } else {
      // re-initialize
      swiperInstance.destroy(true)
    }
  } else {
    sdk[id] = { pageIndex: 1 }
  }

  sdk[id]!.instance = new Swiper(widgetSelector, {
    modules: [Navigation, Manipulation, Keyboard],
    spaceBetween: 10,
    slidesPerView: perView,
    observer: true,
    grabCursor: false,
    allowTouchMove: false,
    lazyPreloadPrevNext: typeof perView === "number" ? perView : undefined,
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
        if (mode === "inline") {
          sdk[id]!.isLoading = true
          void loadTilesAsync(swiper, mode)
        }
      },
      activeIndexChange: swiper => {
        if (swiper.navigation.prevEl && mode === "inline") {
          if (swiper.realIndex === 0 && sdk[id]?.isLoading) {
            disblePrevNavigation(swiper)
          } else {
            enablePrevNavigation(swiper)
          }
        }
      }
    },
    resizeObserver: true,
    ...paramsOverrides
  })

  sdk[id]!.perView = perView
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

async function loadTilesAsync(swiper: Swiper, id: string) {
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
  updateLoadingStateInterval(swiper.el, id)
}

function updateLoadingStateInterval(swiperElem: HTMLElement, id: string) {
  const intervalId = setInterval(function () {
    const elements = swiperElem.querySelectorAll<HTMLElement>(".swiper-slide:has(.tile-content.hidden)")
    if (elements.length === 0) {
      clearInterval(intervalId)
      sdk[id]!.isLoading = false
      sdk[id]!.instance!.off("activeIndexChange")
      sdk[id]!.instance!.setGrabCursor()
      sdk[id]!.instance!.allowTouchMove = true
      sdk[id]!.instance!.params.loop = true
      enablePrevNavigation(sdk[id]!.instance!)
      refreshSwiper(id)
    }
  }, 200)
}

export function refreshSwiper(id: string) {
  if (sdk[id]?.instance) {
    sdk[id].instance.update()
  }
}

function getSwiperIndexforTile(swiperSelector: HTMLElement, tileId: string) {
  const slideElements = swiperSelector.querySelectorAll<HTMLElement>(".swiper-slide")
  const index = Array.from(slideElements).findIndex(element => element.getAttribute("data-id") === tileId)
  return index < 0 ? 0 : index
}

export function disableSwiper(id: string) {
  sdk[id]?.instance?.disable()
}

export function enableSwiper(id: string) {
  sdk[id]?.instance?.enable()
}

export function destroySwiper(id: string) {
  sdk[id]?.instance?.destroy(true, true)
}

export function getClickedIndex(id: string) {
  if (sdk[id]?.instance) {
    const clickedSlide = sdk[id].instance.clickedSlide
    const indexFromAttribute = clickedSlide.getAttribute("data-swiper-slide-index")
    return indexFromAttribute && !Number.isNaN(parseInt(indexFromAttribute))
      ? parseInt(indexFromAttribute)
      : sdk[id].instance.clickedIndex
  }
  return 0
}
