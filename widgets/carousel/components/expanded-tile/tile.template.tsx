import type { Sdk } from "@stackla/ugc-widgets"
import { Tile } from "@stackla/ugc-widgets"
import { getTimephrase } from "@libs/tile.lib"
import { createElement, createFragment } from "jsx-html"
import { Tags } from "@libs/templates/tags/tags.lib"
import { getConfig } from "@widgets/carousel/widget.config"
import { ShareMenu } from "@libs/templates/share-menu/share-menu.lib"

export type ExpandedTileProps = {
  sdk: Sdk
  tile: Tile
}

type ShopspotProps = {
  shopspotEnabled: boolean
  parent?: string
  tileId: string
}

export function ExpandedTile({ sdk, tile }: ExpandedTileProps) {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && widgetSettings.expanded_tile_show_shopspots
  const productsEnabled = sdk.isComponentLoaded("products") && widgetSettings.expanded_tile_show_products

  const parent = sdk.getNodeId()

  const isDesktopScreen = window.innerWidth >= 1024

  return (
    <div class="panel">
      <div class="panel-overlay"></div>
      <div class={`${!isDesktopScreen && (!tile.image || tile.media) !== "video" ? "no-image-panel" : "panel-left"}`}>
        <div class="image-wrapper">
          <div class="image-wrapper-inner">
            {tile.media === "video" ? (
              <VideoTemplate />
            ) : tile.media === "image" ? (
              <ImageTemplate
                tile={tile}
                productsEnabled={productsEnabled}
                shopspotEnabled={shopspotEnabled}
                parent={parent}
              />
            ) : (
              <></>
            )}
            <div>
              <span class="source">
                <i class={"fs fs-" + tile.source}></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-right">
        <div class="panel-right-wrapper">
          <div class="content-wrapper">
            <div class="content-inner-wrapper">
              <button class="share-button">
                <span class="widget-icon icon-share" alt="Share button"></span>
              </button>
              <ShareMenu tile={tile} />
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
      <span class="user-name">{tile.user}</span>
      <span class="user-handle">@{tile.user}</span>
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

function ShopSpotTemplate({ shopspotEnabled, parent, tileId }: ShopspotProps) {
  return shopspotEnabled ? (
    <>
      <shopspot-icon parent={parent} mode="expanded" tile-id={tileId} />
    </>
  ) : (
    <></>
  )
}

function ImageTemplate({
  tile,
  productsEnabled,
  shopspotEnabled,
  parent
}: {
  tile: Tile
  productsEnabled: boolean
  shopspotEnabled: ShopspotProps["shopspotEnabled"]
  parent: ShopspotProps["parent"]
}) {
  return tile.image ? (
    <>
      <div class="image-filler" style={{ "background-image": `url('${tile.image}')` }}></div>
      <div class="image">
        <span class="youtube-reels-icon"></span>
        <span class="instagram-icon"></span>
        {productsEnabled ? <span class="product-bag-icon" aria-label="Product bag icon"></span> : <></>}
        <ShopSpotTemplate shopspotEnabled={shopspotEnabled} parent={parent} tileId={tile.id} />
        <img class="image-element" src={tile.image} loading="lazy" alt={tile.description || "Image"} />
        <div class="swiper-lazy-preloader"></div>
      </div>
    </>
  ) : (
    <></>
  )
}

function VideoTemplate() {
  return (
    <div class="video-wrapper">
      <video autoplay oncanplay="this.muted=true" controls>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )
}
