import type { Sdk } from "@stackla/ugc-widgets"
import { getConfig } from "widgets/carousel/widget.config"
import { tileTemplate } from "./tile.template"

export const expandedTileTemplate = (sdk: Sdk) => {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const tiles = sdk.tiles.tiles

  if (!Object.values(tiles).length) {
    throw new Error("Failed to get tile")
  }

  return `<div class="glide expanded-glide">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    ${Object.values(tiles)
                      .map(tile => '<li class="glide__slide">' + tileTemplate(sdk, widgetSettings, tile) + "</li>")
                      .join("")}
                </ul>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><span class="widget-icon chevron-left"></span></button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">"><span class="widget-icon chevron-right"></span></button>
            </div>
        </div>`
}
