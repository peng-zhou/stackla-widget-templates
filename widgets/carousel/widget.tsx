import { SdkSwiper } from "types"

declare const sdk: SdkSwiper

import { loadWidget } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-swiper.loader"

loadWidget({
  type: "carousel",
  extensions: {
    swiper: true
  },
  features: {
    handleLoadMore: false
  },
  callbacks: {
    onLoad: [initializeInlineSwiperListeners]
  },
  templates: {}
})

sdk.querySelector(".track")?.style.removeProperty("display")
