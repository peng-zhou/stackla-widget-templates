import type { Sdk } from "@stackla/ugc-widgets"
import { Tile } from "@stackla/ugc-widgets"
import { getTimephrase } from "@libs/tile.lib"
import { createElement, createFragment } from "jsx-html"
import { Tags } from "@libs/templates/tags.lib"
import { ShareMenu } from "@libs/templates/share-menu.lib"
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
  const container = sdk.querySelector("expanded-tiles")
  const panelComponent = container?.shadowRoot?.querySelector(".swiper-expanded .panel")

  return (
    <div class="panel">
      <div class="panel-left">
        <div class="image-wrapper">
          <div class="image-wrapper-inner">
            {tile.image ? (
              <>
                <div class="image-filler" style={{ "background-image": `url('${tile.image}')` }}></div>
                <div class="image">
                  <ShopSpotTemplate shopspotEnabled={shopspotEnabled} parent={parent} />
                  <img class="image-element" src={tile.image} />
                  <div class="swiper-lazy-preloader"></div>
                </div>
              </>
            ) : (
              <></>
            )}
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
              <ShareMenu tile={tile} component={panelComponent} />
              <div class="user-info-wrapper">
                <UserInfoTemplate tile={tile} />
              </div>
              <div class="description">
                <div class="caption">
                  <p class="caption-paragraph">
                    {tile.message && widgetSettings.expanded_tile_show_caption ? tile.message : ""}
                  </p>
                </div>
                <div class="tile-timestamp">
                  {tile.source_created_at && widgetSettings.expanded_tile_show_timestamp
                    ? getTimephrase(tile.source_created_at)
                    : ""}
                </div>
                <Tags tile={tile} />
                {productsEnabled ? (
                  <>
                    <span class="line"></span>
                    <ugc-products parent={parent} />
                  </>
                ) : (
                  ""
                )}

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
    </div>
  )
}

function UserInfoTemplate({ tile }: { tile: Tile }) {
  const tileAvatar = tile.avatar ? (
    <span class="avatar-wrapper">
      <a class="avatar-link" href={tile.original_url} target="_blank">
        <img src={tile.avatar} />
      </a>
    </span>
  ) : (
    <></>
  )
  const tileUser = tile.user ? (
    <a class="user-link" href={tile.original_url} target="_blank">
      <div class="user-top">
        <span class="user-name">{tile.user}</span>
      </div>
      <div class="user-bottom">
        <span class="user-handle">@{tile.user}</span>
      </div>
    </a>
  ) : (
    <></>
  )
  return (
    <div class="user-info">
      {tileAvatar}
      {tileUser}
    </div>
  )
}

function ShopSpotTemplate({ shopspotEnabled, parent }: { shopspotEnabled: boolean; parent?: string }) {
  return shopspotEnabled ? (
    <>
      <shopspot-flyout parent={parent}></shopspot-flyout>
      <shopspot-icon parent={parent} />
    </>
  ) : (
    <></>
  )
}
