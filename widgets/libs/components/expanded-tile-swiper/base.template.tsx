import type { Sdk, Tile } from "@stackla/ugc-widgets"
import { ExpandedTile } from "./tile.template"
import { createElement, createFragment } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { getConfig } from "@widgets/carousel/widget.config"

export async function shouldShowAvatar(tile: Tile) {
  if (tile.avatar) {
    const response = await fetch(tile.avatar)
    return response.ok
  }

  return false
}

export async function getAllTiles(sdk: Sdk) {
  const tiles = Promise.all(
    Object.values(sdk.tiles.tiles).map(async tile => {
      const avatar = tile.avatar
      const showAvatar = avatar ? await shouldShowAvatar(tile) : false
      return (
        <div class="swiper-slide" data-id={tile.id}>
          <ExpandedTile sdk={sdk} tile={tile} showAvatar={showAvatar} />
        </div>
      )
    })
  )

  return tiles
}

export async function ExpandedTiles(sdk: Sdk) {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const navigationArrowsEnabled = widgetSettings.expanded_tile_show_navigation_arrows
  const isDesktopScreen = window.innerWidth > 992

  return (
    <div class="expanded-tile-wrapper">
      <a class="exit" href="#">
        <span class="widget-icon close-white"></span>
      </a>
      <BackArrowIcon />
      <div class="swiper swiper-expanded">
        <div class="swiper-wrapper">{await getAllTiles(sdk)}</div>
      </div>
      <div
        class="swiper-expanded-button-prev swiper-button-prev"
        style={{ display: isDesktopScreen && navigationArrowsEnabled ? "flex" : "none" }}>
        <span class="chevron-left" alt="Previous arrow" />
      </div>
      <div
        class="swiper-expanded-button-next swiper-button-next"
        style={{ display: isDesktopScreen && navigationArrowsEnabled ? "flex" : "none" }}>
        <span class="chevron-right" alt="Next arrow" />
      </div>
    </div>
  )
}

function BackArrowIcon() {
  const isDesktopScreen = window.innerWidth >= 1024
  return !isDesktopScreen ? (
    <a class="back" href="#">
      <span class="widget-icon back-arrow"></span>
    </a>
  ) : (
    <></>
  )
}
