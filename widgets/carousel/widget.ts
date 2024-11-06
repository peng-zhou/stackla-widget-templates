import { SdkSwiper } from "types"

declare const sdk: SdkSwiper

import { loadWidget, MyWidgetSettings } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-swiper.loader"
import shopspotStyle from "./components/shopspot-icon/base.scss"

const settings: MyWidgetSettings = {
  extensions: {},
  features: {
    handleLoadMore: false
  },
  callbacks: {
    onLoad: [initializeInlineSwiperListeners]
  },
  templates: {
    "expanded-tiles": {
      style: {
        css: shopspotStyle,
        global: true
      }
    }
  }
}

loadWidget(settings)

sdk.querySelector(".track")?.style.removeProperty("display")
