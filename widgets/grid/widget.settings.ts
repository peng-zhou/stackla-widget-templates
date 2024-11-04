import { loadWidget } from "@stackla/widget-utils"

export function getSettings() {
  return {
    extensions: {},
    features: {},
    callbacks: {}
  }
}

export function loadSettings() {
  const settings = getSettings()
  loadWidget(settings)
}
