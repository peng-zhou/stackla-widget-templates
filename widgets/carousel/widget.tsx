import { Sdk } from "types"

declare const sdk: Sdk

import { loadWidget } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-carousel-swiper.loader"

loadWidget({
  extensions: {
    swiper: true
  },
  features: {
    handleLoadMore: false
  }
})

sdk.querySelector(".track")?.style.removeProperty("display")

initializeInlineSwiperListeners()
