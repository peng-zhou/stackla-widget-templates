import { Features, getTileSizeByWidget } from "@stackla/widget-utils"

/**
 * gets the configured tile size
 * @param settings the tile size configuration of the widget
 * @returns the tile size value without CSS unit
 */
export function getTileSizeUnitless(settings: Features["tileSizeSettings"]) {
  const tileSizeConfig = getTileSizeByWidget(settings)
  return Number(tileSizeConfig["--tile-size-unitless"])
}

export function gridGap(containerElement: HTMLElement) {
  const parsed = parseInt(getComputedStyle(containerElement).gap)
  return isNaN(parsed) ? 0 : parsed
}

export function getTopElementHeight(containerElement: HTMLElement, defaultValue: number) {
  const elements = Array.from(containerElement.querySelectorAll<HTMLElement>(".ugc-tile"))
  const topElement = elements.find(element => {
    const top = element.getBoundingClientRect().top
    return top > 0 && top < 50
  })
  return topElement?.getBoundingClientRect().height || defaultValue
}

export function getRenderMode(element: HTMLElement) {
  return getComputedStyle(element).getPropertyValue("--render-mode")
}
