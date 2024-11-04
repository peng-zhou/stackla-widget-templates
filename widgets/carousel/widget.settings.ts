import { loadWidget, MyWidgetSettings } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-swiper.loader"

export function getSettings() {
  const settings: MyWidgetSettings = {
    extensions: {},
    features: {
      handleLoadMore: false
    },
    callbacks: {
      onLoad: [initializeInlineSwiperListeners]
    }
  }

  return settings
}

export function loadSettings() {
  const settings = getSettings()
  loadWidget(settings)
}
