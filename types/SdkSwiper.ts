import type { Sdk } from "@stackla/ugc-widgets"
import Swiper from "swiper"

export type SwiperMode = "inline" | "expanded"

export interface SdkSwiper extends Sdk {
  swiperInstances?: Record<SwiperMode, Swiper | undefined>
  activeInstances?: string[] // using array to support multiple instances of swiper (future purpose)
  getActiveInstances: () => string[]
}
