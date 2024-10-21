import Swiper from "swiper"
import { SdkSwiper } from "types"
import { Keyboard, Manipulation, Navigation } from "swiper/modules"
import { SwiperData, SwiperProps } from "types/SdkSwiper"

declare const sdk: SdkSwiper

export function initializeSwiper({
  id,
  widgetSelector,
  perView = "auto",
  prevButton = "swiper-button-prev",
  nextButton = "swiper-button-next",
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
    direction: "horizontal",
    watchSlidesProgress: true,
    normalizeSlideIndex: true,
    watchOverflow: true,
    navigation: {
      nextEl: next,
      prevEl: prev
    },
    resizeObserver: true,
    ...paramsOverrides
  })

  sdk[id]!.perView = perView
}

export function refreshSwiper(id: string) {
  if (sdk[id]?.instance) {
    sdk[id].instance.update()
  }
}

export function getSwiperIndexforTile(swiperSelector: HTMLElement, tileId: string) {
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
