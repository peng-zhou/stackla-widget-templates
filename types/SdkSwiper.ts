import type { Sdk } from "@stackla/ugc-widgets"
import Swiper from "swiper"

export type SwiperMode = "inline" | "expanded"

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
  swiperInstances?: Record<SwiperMode, SwiperData | undefined>
  activeInstances?: string[] // using array to support multiple instances of swiper (future purpose)
  getActiveInstances: () => string[]
}
