import Swiper from "swiper"
import { SdkSwiper } from "types"
import { Manipulation, Navigation } from "swiper/modules"
import { SwiperData, SwiperMode, SwiperProps } from "types/SdkSwiper"

declare const sdk: SdkSwiper

export function initializeSwiper({
  widgetSelector,
  perView,
  mode = "inline",
  prevButton = "swiper-button-prev",
  nextButton = "swiper-button-next",
  initialIndex = 0
}: SwiperProps) {
  const prev = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${prevButton}`)
  const next = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${nextButton}`)

  if (!prev || !next) {
    throw new Error("Missing swiper Navigation elements for previous and next navigation")
  }

  if (!sdk.swiperInstances) {
    sdk.swiperInstances = {} as Record<SwiperMode, SwiperData>
  }

  const swiperInstance = sdk.swiperInstances?.[mode]?.instance

  if (swiperInstance) {
    if (!swiperInstance.params?.enabled) {
      enableSwiper(mode)
    } else {
      // re-initialize
      swiperInstance.destroy(true)
    }
  } else {
    sdk.swiperInstances[mode] = {}
  }

  sdk.swiperInstances[mode]!.instance = new Swiper(widgetSelector, {
    modules: [Navigation, Manipulation],
    spaceBetween: 10,
    slidesPerView: perView,
    observer: true,
    grabCursor: false,
    allowTouchMove: false,
    loop: true,
    lazyPreloadPrevNext: perView,
    maxBackfaceHiddenSlides: 0,
    direction: "horizontal",
    watchSlidesProgress: true,
    watchOverflow: true,
    navigation: {
      nextEl: next,
      prevEl: prev
    },
    on: {
      afterInit: swiper => {
        swiper.slideToLoop(initialIndex, 0, false)
        sdk.swiperInstances![mode]!.isLoading = true
        swiper.allowSlidePrev = false
        void loadTilesAsync(swiper, mode)
      },
      activeIndexChange: swiper => {
        if (swiper.navigation.prevEl) {
          if (swiper.realIndex === 0 && sdk.swiperInstances?.[mode]?.isLoading) {
            disblePrevNavigation(swiper)
          } else {
            enablePrevNavigation(swiper)
          }
        }
      }
    },
    resizeObserver: true
  })

  sdk.swiperInstances[mode]!.perView = perView
}

function enablePrevNavigation(swiper: Swiper) {
  swiper.allowSlidePrev = true
  swiper.navigation.prevEl.style.display = "flex"
}

function disblePrevNavigation(swiper: Swiper) {
  swiper.allowSlidePrev = false
  swiper.navigation.prevEl.style.display = "none"
}

function registerObserver(swiperWrapperElement: HTMLElement) {
  const observer = new MutationObserver(() => {
    enableSlides(swiperWrapperElement)
  })
  observer.observe(swiperWrapperElement, {
    childList: true
  })
  return observer
}

async function loadTilesAsync(swiper: Swiper, mode: SwiperMode) {
  const observer = registerObserver(swiper.wrapperEl)
  while (sdk.tiles.hasMoreTiles()) {
    sdk.tiles.page += 1
    await sdk.tiles.loadAndRenderTiles(sdk.tiles.page)
    sdk.tiles.reload()
    swiper.update()
  }

  observer.disconnect()
  updateLoadingStateInterval(swiper.el, mode)
  swiper.update()
}

function updateLoadingStateInterval(swiperElem: HTMLElement, mode: SwiperMode) {
  const intervalId = setInterval(function () {
    const elements = swiperElem.querySelectorAll<HTMLElement>(".swiper-slide:has(.tile-content.hidden)")
    if (elements.length === 0) {
      sdk.swiperInstances![mode]!.isLoading = false
      sdk.swiperInstances![mode]!.instance!.off("activeIndexChange")
      sdk.swiperInstances![mode]!.instance!.setGrabCursor()
      sdk.swiperInstances![mode]!.instance!.allowTouchMove = true
      enablePrevNavigation(sdk.swiperInstances![mode]!.instance!)
      clearInterval(intervalId)
    }
  }, 200)
}

export function generateId() {
  const minCeiled = Math.ceil(10)
  const maxFloored = Math.floor(100)
  const randomPrefix = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  return randomPrefix + Date.now().toString(16)
}

export function refreshSwiper(mode: SwiperMode) {
  if (sdk.swiperInstances?.[mode]?.instance) {
    sdk.swiperInstances[mode].instance.update()
  }
}

export function disableSwiper(mode: SwiperMode) {
  sdk.swiperInstances?.[mode]?.instance?.disable()
}

export function enableSwiper(mode: SwiperMode) {
  sdk.swiperInstances?.[mode]?.instance?.enable()
}

export function destroySwiper(mode: SwiperMode) {
  sdk.swiperInstances?.[mode]?.instance?.destroy(true, true)
}

export function getClickedIndex(mode: SwiperMode) {
  if (sdk.swiperInstances?.[mode]?.instance) {
    const clickedSlide = sdk.swiperInstances[mode].instance.clickedSlide
    const indexFromAttribute = clickedSlide.attributes.getNamedItem("data-swiper-slide-index")?.value
    return indexFromAttribute && !Number.isNaN(parseInt(indexFromAttribute))
      ? parseInt(indexFromAttribute)
      : sdk.swiperInstances[mode].instance.clickedIndex
  }
  return 0
}

function enableSlides(swiperWrapperElement: HTMLElement) {
  const elements = swiperWrapperElement.querySelectorAll<HTMLElement>(".swiper-slide:has(.tile-content.hidden)")
  elements.forEach(element => enableSlide(element))
}

function enableSlide(slide: HTMLElement) {
  const tileImage = slide.querySelector<HTMLImageElement>(".tile-image > img")
  if (tileImage) {
    if (tileImage.complete) {
      enableTileContent(slide)
    }
    tileImage.onload = () => enableTileContent(slide)
  }
}

function enableTileContent(slide: HTMLElement) {
  slide.querySelector(".tile-loading")?.classList.add("hidden")
  slide.querySelector(".tile-content.hidden")?.classList.remove("hidden")
}
