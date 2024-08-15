import type { Sdk } from "@stackla/ugc-widgets"
import { getConfig } from "@widgets/carousel/widget.config"
import { tileTemplate } from "./tile.template"
import { createElement, createFragment } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"

export default (sdk: Sdk) => {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const tiles = sdk.tiles.tiles

  if (!Object.values(tiles).length) {
    throw new Error("Failed to get tile")
  }

  return (
    <>
      <div class="swiper swiper-expanded">
        <div class="swiper-wrapper">
          {Object.values(tiles).map(tile => (
            <div class="swiper-slide">{tileTemplate(sdk, widgetSettings, tile)}</div>
          ))}
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </>
  )
}
