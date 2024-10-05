import Swiper from "swiper"
import { SdkSwiper } from "types"
import { Keyboard, Manipulation, Navigation } from "swiper/modules"
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
      afterInit: swiper => {
        swiper.slideToLoop(initialIndex, 0, false)
        sdk.swiperInstances![mode]!.isLoading = true
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
  swiper.navigation.prevEl.classList.remove("swiper-button-hidden")
}

function disblePrevNavigation(swiper: Swiper) {
  swiper.allowSlidePrev = false
  swiper.navigation.prevEl.classList.add("swiper-button-hidden")
}

function registerObserver(swiper: Swiper) {
  const observer = new MutationObserver(() => {
    enableSlides(swiper)
  })
  observer.observe(swiper.wrapperEl, {
    childList: true
  })
  return observer
}

async function loadTilesAsync(swiper: Swiper, mode: SwiperMode) {
  const observer = registerObserver(swiper)
  while (sdk.tiles.hasMoreTiles()) {
    sdk.tiles.page += 1
    await sdk.tiles.fetchTiles(sdk.tiles.page, true)
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
      sdk.swiperInstances![mode]!.isLoading = false
      sdk.swiperInstances![mode]!.instance!.off("activeIndexChange")
      sdk.swiperInstances![mode]!.instance!.setGrabCursor()
      sdk.swiperInstances![mode]!.instance!.allowTouchMove = true
      sdk.swiperInstances![mode]!.instance!.params.loop = true
      enablePrevNavigation(sdk.swiperInstances![mode]!.instance!)
      refreshSwiper(mode)
    }
  }, 200)
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

function enableSlides(swiper: Swiper) {
  const elements = swiper.wrapperEl.querySelectorAll<HTMLElement>(".swiper-slide:has(.tile-content.hidden)")
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
