import { loadWidget, type MyWidgetSettings } from "@stackla/widget-utils"

export function loadSettings() {
  const widgetSettings: MyWidgetSettings = {
    extensions: {},
    features: {
      preloadImages: false,
      hideBrokenImages: true
    },
    callbacks: {}
  }

  loadWidget(widgetSettings)
}
