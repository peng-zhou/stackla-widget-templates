import type { Sdk } from "@stackla/ugc-widgets"
import Swiper from "swiper"

export type SwiperMode = "inline" | "expanded" | "cross-sell"

export type SwiperProps = {
  widgetSelector: HTMLElement
  prevButton?: string
  nextButton?: string
  perView: number
  mode?: SwiperMode
  initialIndex?: number
  initialTileId?: string
}

export type SwiperData = {
  instance?: Swiper
  perView?: number
  isLoading?: boolean
  pageIndex: number
}

export type SdkSwiper = Sdk & {
  [mode in SwiperMode]: SwiperData | undefined
}
