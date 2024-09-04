import Swiper from "swiper"
import { SdkSwiper } from "types"
import { Manipulation, Navigation } from "swiper/modules"

declare const sdkSwiper: SdkSwiper

export type SwiperMode = "swiperInline" | "swiperExpanded"

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

  if (sdkSwiper[mode]) {
    if (sdkSwiper[mode].params.enabled == false) {
      enableSwiper(mode)
    } else {
      sdkSwiper[mode].destroy(true)
    }
  }

  sdkSwiper[mode] = new Swiper(widgetSelector, {
    modules: [Navigation, Manipulation],
    slidesPerView: perView,
    spaceBetween: 10,
    hashNavigation: true,
    observeParents: true,
    observer: true,
    loop: true,
    direction: "horizontal",
    noSwiping: true,
    navigation: {
      nextEl: next,
      prevEl: prev
    },
    on: {
      afterInit: swiper => {
        swiper.slideToLoop(initialIndex, 0, false)
      }
    }
  })
}

export function refreshSwiper(mode: SwiperMode) {
  sdkSwiper[mode]?.update()
}

export function disableSwiper(mode: SwiperMode) {
  sdkSwiper[mode]?.disable()
}

export function enableSwiper(mode: SwiperMode) {
  sdkSwiper[mode]?.enable()
}

export function destroySwiper(mode: SwiperMode) {
  sdkSwiper[mode]?.destroy(true, true)
}

export function getClickedIndex(mode: SwiperMode) {
  if (sdkSwiper[mode]) {
    const clickedSlide = sdkSwiper[mode].clickedSlide
    const indexFromAttribute = clickedSlide.attributes.getNamedItem("data-swiper-slide-index")?.value
    return indexFromAttribute && !Number.isNaN(parseInt(indexFromAttribute))
      ? parseInt(indexFromAttribute)
      : sdkSwiper[mode].clickedIndex
  }
  return 0
}
