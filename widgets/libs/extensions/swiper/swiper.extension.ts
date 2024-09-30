import Swiper from "swiper"
import { SdkSwiper } from "types"
import { Manipulation, Navigation } from "swiper/modules"
import { SwiperMode, SwiperProps } from "types/SdkSwiper"

declare const sdk: SdkSwiper

export function initializeSwiper({
  widgetSelector,
  perView,
  mode = "swiperInline",
  prevButton = "swiper-button-prev",
  nextButton = "swiper-button-next",
  initialIndex = 0
}: SwiperProps) {
  const prev = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${prevButton}`)
  const next = widgetSelector!.parentNode!.querySelector<HTMLElement>(`.${nextButton}`)

  if (!prev || !next) {
    throw new Error("Missing swiper Navigation elements for previous and next navigation")
  }

  if (!sdk[mode]) {
    sdk[mode] = {}
  }

  if (sdk[mode].instance) {
    if (!sdk[mode].instance?.params?.enabled) {
      enableSwiper(mode)
    } else {
      // re-initialize
      sdk[mode].instance?.destroy(true)
    }
  }

  sdk[mode].instance = new Swiper(widgetSelector, {
    modules: [Navigation, Manipulation],
    spaceBetween: 10,
    slidesPerView: perView,
    observer: true,
    loop: true,
    grabCursor: true,
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
        sdk[mode]!.isLoading = true
        swiper.allowSlidePrev = false
        swiper.navigation.prevEl.querySelector("span.swiper-nav-icon")?.classList.add("nav-loading")
        loadTilesAsync(swiper, mode)
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

  sdk[mode].perView = perView
}

function enablePrevNavigation(swiper: Swiper) {
  swiper.allowSlidePrev = true
  swiper.navigation.prevEl.querySelector("span.swiper-nav-icon")?.classList.add("chevron-left")
  swiper.navigation.prevEl.querySelector("span.swiper-nav-icon")?.classList.remove("nav-loading")
}

function disblePrevNavigation(swiper: Swiper) {
  swiper.allowSlidePrev = false
  swiper.navigation.prevEl.querySelector("span.swiper-nav-icon")?.classList.remove("chevron-left")
  swiper.navigation.prevEl.querySelector("span.swiper-nav-icon")?.classList.add("nav-loading")
}

function registerObserver(swiperWrapperElem: HTMLElement) {
  if (swiperWrapperElem) {
    const observer = new MutationObserver(() => {
      enableSlides(swiperWrapperElem)
    })
    observer.observe(swiperWrapperElem, {
      childList: true
    })
    return observer
  }
  return undefined
}

function loadTilesAsync(swiper: Swiper, mode: SwiperMode) {
  const observer = registerObserver(swiper.wrapperEl)
  return new Promise<void>(async resolve => {
    while (sdk.tiles.hasMorePages()) {
      sdk.tiles.page += 1
      await sdk.tiles.loadAndRenderTiles()
      sdk.tiles.reload()
      swiper.update()
    }

    observer?.disconnect()
    completeLoad(mode)
    swiper.update()
    resolve()
  })
}

function completeLoad(mode: SwiperMode) {
  sdk[mode]!.isLoading = false
  sdk[mode]!.instance?.off("activeIndexChange")
  enablePrevNavigation(sdk[mode]!.instance!)
}

export function refreshSwiper(mode: SwiperMode) {
  if (sdk[mode]?.instance) {
    sdk[mode].instance.update()
  }
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
    const indexFromAttribute = clickedSlide.attributes.getNamedItem("data-swiper-slide-index")?.value
    return indexFromAttribute && !Number.isNaN(parseInt(indexFromAttribute))
      ? parseInt(indexFromAttribute)
      : sdk[mode].instance.clickedIndex
  }
  return 0
}

function enableSlides(swiperElem: HTMLElement) {
  const elements = swiperElem.querySelectorAll<HTMLElement>(".swiper-slide:has(.tile-content.hidden)")
  elements.forEach(element => {
    enableSlide(element)
  })
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
