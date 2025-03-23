import { Sdk } from "types"

declare const sdk: Sdk

import { loadWidget } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-carousel-swiper.loader"

loadWidget({
  extensions: {
    swiper: true
  },
  features: {
    handleLoadMore: false,
    cssVariables: {
      "--navigation-arrow-display": sdk.getStyleConfig().load_more_type === "button" ? "flex" : "none"
    }
  }
})

sdk.querySelector(".track")?.style.removeProperty("display")

initializeInlineSwiperListeners()
