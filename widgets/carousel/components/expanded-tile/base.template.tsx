import type { Sdk } from "@stackla/ugc-widgets"
import { ExpandedTile } from "./tile.template"
import { createElement, createFragment } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"

export const ExpandedTiles = (sdk: Sdk) => {
  const tiles = sdk.tiles.tiles

  if (!Object.values(tiles).length) {
    throw new Error("Failed to get tile")
  }

  return (
    <>
      <div class="swiper swiper-expanded">
        <div class="swiper-wrapper">
          {Object.values(tiles).map(tile => (
            <div class="swiper-slide">
              <ExpandedTile sdk={sdk} tile={tile} />
            </div>
          ))}
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </>
  )
}
