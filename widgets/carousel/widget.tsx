import { SdkSwiper } from "types"

declare const sdk: SdkSwiper

import { loadWidget } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-swiper.loader"
import shopspotStyle from "../styles/templates/shopspot-icon/styles.scss"
import tagsStyles from "../styles/templates/tags/tags.scss"
import timephraseStyles from "../styles/templates/time-phrase/styles.scss"

loadWidget({
  extensions: {
    swiper: true
  },
  features: {
    handleLoadMore: false
  },
  callbacks: {
    onLoad: [initializeInlineSwiperListeners]
  },
  templates: {
    "expanded-tiles": {
      styles: [
        {
          css: shopspotStyle,
          global: false
        }
      ]
    },
    "tile-tags": {
      styles: [
        {
          css: tagsStyles,
          global: false
        }
      ]
    },
    "time-phrase": {
      styles: [
        {
          css: timephraseStyles,
          global: false
        }
      ]
    }
  }
})

sdk.querySelector(".track")?.style.removeProperty("display")
