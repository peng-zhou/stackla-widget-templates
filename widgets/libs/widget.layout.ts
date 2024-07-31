import type { Sdk } from "@stackla/types"
import { BaseConfig } from "types/IBaseConfig"

declare const sdk: Sdk

export function addCSSVariablesToPlacement(cssVariables: string) {
  const shadowRoot = sdk.placement.getShadowRoot()
  const style = document.createElement("style")
  style.innerHTML = `
      :host {
          ${cssVariables}
      }`
  shadowRoot.appendChild(style)
}

export function isEnabled<T extends BaseConfig>(widgetSettings: T) {
  return widgetSettings.enabled && hasMinimumTilesRequired(widgetSettings)
}

export function hasMinimumTilesRequired<T extends BaseConfig>(widgetSettings: T) {
  if (widgetSettings.minimal_tiles && widgetSettings.minimal_tiles > 0) {
    const tiles = sdk.querySelectorAll(".ugc-tile")
    return tiles && tiles.length >= widgetSettings.minimal_tiles
  }

  // Feature is not enabled via user config, so we default to true.
  return true
}
