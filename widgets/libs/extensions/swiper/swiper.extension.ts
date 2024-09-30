import Swiper from "swiper"
import { SdkSwiper } from "types"
import { HashNavigation, Manipulation, Navigation } from "swiper/modules"
import { SwiperMode } from "types/SdkSwiper"

declare const sdk: SdkSwiper

export type SwiperProps = {
  widgetSelector: HTMLElement
  prevButton?: string
  nextButton?: string
  perView: number
  mode?: SwiperMode
  initialIndex?: number
}

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
    sdk.swiperInstances = {} as Record<SwiperMode, Swiper>
  }

  const swiperInstance = sdk.swiperInstances?.[mode]

  if (swiperInstance) {
    if (!swiperInstance.params.enabled) {
      enableSwiper(mode)
    } else {
      // re-initialize
      swiperInstance.destroy(true)
    }
  }

  sdk.swiperInstances[mode] = new Swiper(widgetSelector, {
    modules: [Navigation, Manipulation, HashNavigation],
    spaceBetween: 10,
    slidesPerView: perView,
    hashNavigation: true,
    loop: true,
    direction: "horizontal",
    watchSlidesProgress: true,
    navigation: {
      nextEl: next,
      prevEl: prev
    },
    on: {
      afterInit: swiper => {
        swiper.slideToLoop(initialIndex, 0, false)
      }
    },
    resizeObserver: true
  })
}

export function generateId() {
  const minCeiled = Math.ceil(10)
  const maxFloored = Math.floor(100)
  const randomPrefix = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  return randomPrefix + Date.now().toString(16)
}

export function refreshSwiper(mode: SwiperMode) {
  sdk.swiperInstances?.[mode]?.update()
}

export function disableSwiper(mode: SwiperMode) {
  sdk.swiperInstances?.[mode]?.disable()
}

export function enableSwiper(mode: SwiperMode) {
  sdk.swiperInstances?.[mode]?.enable()
}

export function destroySwiper(mode: SwiperMode) {
  sdk.swiperInstances?.[mode]?.destroy(true, true)
}

export function getClickedIndex(mode: SwiperMode) {
  if (sdk.swiperInstances?.[mode]) {
    const clickedSlide = sdk.swiperInstances[mode].clickedSlide
    const indexFromAttribute = clickedSlide.attributes.getNamedItem("data-swiper-slide-index")?.value
    return indexFromAttribute && !Number.isNaN(parseInt(indexFromAttribute))
      ? parseInt(indexFromAttribute)
      : sdk.swiperInstances[mode].clickedIndex
  }
  return 0
}
