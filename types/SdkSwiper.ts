import type { Sdk } from "@stackla/ugc-widgets"
import Swiper from "swiper"
import { SwiperOptions } from "swiper/types"

export type SwiperMode = "inline" | "expanded" | "cross-sell" | "expanded-product-recs"

export type SwiperProps = {
  id: string
  widgetSelector: HTMLElement
  prevButton?: string
  nextButton?: string
  mode: SwiperMode
  paramsOverrides?: SwiperOptions
}

export type SwiperData = {
  instance?: Swiper
  perView?: number | "auto"
  isLoading?: boolean
  pageIndex: number
}

export type SdkSwiper = Sdk & {
  [id: string]: SwiperData | undefined
}
