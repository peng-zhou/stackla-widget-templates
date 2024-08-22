import type { Sdk } from "@stackla/ugc-widgets"
import { Tile } from "@stackla/ugc-widgets"
import { getTimephrase } from "@libs/tile.lib"
import { createElement, createFragment } from "jsx-html"
import { Tags } from "@libs/templates/tags.lib"
import { getConfig } from "@widgets/carousel/widget.config"

export type ExpandedTileProps = {
  sdk: Sdk
  tile: Tile
}

export function ExpandedTile({ sdk, tile }: ExpandedTileProps) {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && widgetSettings.expanded_tile_show_shopspots
  const productsEnabled = sdk.isComponentLoaded("products") && widgetSettings.expanded_tile_show_products
  const parent = sdk.getNodeId()

  return (
    <div class="panel">
      <a class="exit" href="#">
        <span class="widget-icon close"></span>
      </a>
      <div class="panel-left">
        <div class="image-wrapper">
          <div class="image-wrapper-inner">
            <div class="image-filler" style="background-image: url(${tile.image})"></div>
            <div class="image">
              <ShopSpotTemplate shopspotEnabled={shopspotEnabled} parent={parent} />
              {tile.image ? <img class="image-element" src={tile.image} /> : ""}
            </div>
          </div>
        </div>
        <div>
          <span class="source">
            <i class={"fs fs-" + tile.source}></i>
          </span>
        </div>
      </div>
      <div class="panel-right">
        <div class="panel-right-wrapper">
          <div class="content-wrapper">
            <div class="content-inner-wrapper">
              <div class="user-info-wrapper">
                <div class="user-info">
                  <UserInfoTemplate tile={tile} />
                </div>
              </div>
              <div class="tile-timestamp">
                {tile.source_created_at && widgetSettings.expanded_tile_show_timestamp
                  ? getTimephrase(tile.source_created_at)
                  : ""}
              </div>
              <div class="caption">
                <p class="caption-paragraph">
                  {tile.message && widgetSettings.expanded_tile_show_caption ? tile.message : ""}
                </p>
                <Tags tile={tile} />
                {productsEnabled ? <ugc-products parent={parent} /> : ""}
              </div>
              <div class="footer">
                <span class="base-v2 source source-instagram">
                  <i class="fs fs-instagram"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UserInfoTemplate({ tile }: { tile: Tile }) {
  if (tile.avatar) {
    return (
      <span class="avatar-wrapper">
        <a class="avatar-link" href={tile.original_url} target="_blank">
          <img src={tile.avatar} />
        </a>
      </span>
    )
  }
  if (tile.user) {
    return (
      <a class="user-link" href={tile.original_url} target="_blank">
        <div class="user-top">
          <span class="user-name">{tile.user}</span>
        </div>
        <div class="user-bottom">
          <span class="user-handle">@{tile.user}</span>
        </div>
      </a>
    )
  }
  return <></>
}

function ShopSpotTemplate({ shopspotEnabled, parent }: { shopspotEnabled: boolean; parent?: string }) {
  if (shopspotEnabled) {
    return (
      <>
        <shopspot-flyout parent={parent}></shopspot-flyout>
        <shopspot-icon parent={parent} />
      </>
    )
  }
  return <></>
}
