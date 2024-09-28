import type { Sdk } from "@stackla/ugc-widgets"
import Swiper from "swiper"

export type SwiperMode = "swiperInline" | "swiperExpanded"

export type SwiperProps = {
  widgetSelector: HTMLElement
  prevButton?: string
  nextButton?: string
  perView: number
  mode?: SwiperMode
  initialIndex?: number
}

export type SwiperData = {
  instance?: Swiper
  perView?: number
  isLoading?: boolean
}
export interface SdkSwiper extends Sdk {
  swiperInline?: SwiperData
  swiperExpanded?: SwiperData
}
