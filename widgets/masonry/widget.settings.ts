import { loadWidget, type MyWidgetSettings } from "@stackla/widget-utils"

export function loadSettings() {
  const widgetSettings: MyWidgetSettings = {
    extensions: {
      masonry: true
    },
    features: {},
    callbacks: {}
  }

  loadWidget(widgetSettings)
}
