import type { Sdk } from "@stackla/ugc-widgets"
import Swiper from "swiper"

export interface ISdkSwiper extends Sdk {
  swiperInline?: Swiper
  swiperExpanded?: Swiper
}
