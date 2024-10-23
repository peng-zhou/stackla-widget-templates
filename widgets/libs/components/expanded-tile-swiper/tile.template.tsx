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
  const tagsEnabled = widgetSettings.expanded_tile_show_tags
  const sharingToolsEnabled = widgetSettings.expanded_tile_show_sharing
  const timestampEnabled = widgetSettings.expanded_tile_show_timestamp
  const captionsEnabled = widgetSettings.expanded_tile_show_caption

  const parent = sdk.getNodeId()

  return (
    <div class="panel">
      <div class="panel-overlay"></div>
      <div class="panel-left">
        <div class="image-wrapper">
          <div class="image-wrapper-inner">
            {tile.media === "video" ? (
              <>
                <VideoTemplate tile={tile} parent={parent} />
                <RenderVideoErrorFallbackTemplate tile={tile} parent={parent} />
              </>
            ) : tile.media === "image" ? (
              <ImageTemplate
                tile={tile}
                image={tile.image}
                productsEnabled={productsEnabled}
                shopspotEnabled={shopspotEnabled}
                parent={parent}
              />
            ) : tile.media === "text" ? (
              <span>{tile.message}</span>
            ) : tile.media === "html" ? (
              <span>{tile.html}</span>
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
              {sharingToolsEnabled && <ShareMenu tile={tile} />}
              <div class="user-info-wrapper">
                <UserInfoTemplate tile={tile} />
              </div>
              <div class="description">
                {captionsEnabled && (
                  <div class="caption">
                    <p class="caption-paragraph">{tile.message}</p>
                  </div>
                )}
                {timestampEnabled && (
                  <div class="tile-timestamp">{tile.source_created_at && getTimephrase(tile.source_created_at)}</div>
                )}
                {tagsEnabled && <Tags tile={tile} />}
                {productsEnabled && (
                  <>
                    <ugc-products parent={parent} tile-id={tile.id} />
                  </>
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
        <img
          loading="lazy"
          src={tile.avatar}
          onerror={`this.src = "https://web-assets.stackla.com/app.stackla.com/media/images/default-avatars/default-avatar.png";`}
        />
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
  image,
  productsEnabled,
  shopspotEnabled,
  parent
}: {
  tile: Tile
  image: string
  productsEnabled: boolean
  shopspotEnabled: ShopspotProps["shopspotEnabled"]
  parent: ShopspotProps["parent"]
}) {
  return image ? (
    <>
      <div class="image-filler" style={{ "background-image": `url('${image}')` }}></div>
      <div class="image">
        <span class="youtube-reels-icon"></span>
        <span class="instagram-icon"></span>
        {productsEnabled ? <span class="product-bag-icon" aria-label="Product bag icon"></span> : <></>}
        <ShopSpotTemplate shopspotEnabled={shopspotEnabled} parent={parent} tileId={tile.id} />
        <img class="image-element" src={image} loading="lazy" alt={tile.description || "Image"} />
      </div>
    </>
  ) : (
    <></>
  )
}

function VideoTemplate({ tile, parent }: { tile: Tile; parent?: string }) {
  return (
    <div class="video-content-wrapper">
      <div class="image-filler" style={{ "background-image": `url('${tile.original_image_url}')` }}></div>
      <SourceVideoContent tile={tile} parent={parent} />
    </div>
  )
}

function SourceVideoContent({ tile, parent }: { tile: Tile; parent?: string }) {
  // handle unplayable tiktok source
  // TODO handle vide_source "tiktok"
  if (tile.source === "tiktok" || tile.video_source === "tiktok") {
    return <RenderTikTokTemplate tile={tile} />
  }

  if (tile.source === "youtube") {
    return <RenderYoutubeTemplate tile={tile} />
  }

  if (tile.source === "facebook") {
    const videoUrlPattern = /videos\/(\d)+?/
    if (!tile.video_files?.length || !videoUrlPattern.test(tile.video_files[0].url)) {
      return <RenderVideoErrorFallbackTemplate tile={tile} parent={parent} defaultHidden={false} />
    }
  }

  if (tile.source === "twitter") {
    return <RenderTwitterTemplate tile={tile} />
  }

  if (tile.video_files?.length) {
    return <RenderVideoTemplate tile={tile} />
  }

  return <RenderFacebookFallbackTemplate tile={tile} />
}

function RenderVideoTemplate({ tile }: { tile: Tile }) {
  const { url, width, height, mime } = tile.video_files[0]

  return (
    <video
      muted={true}
      tileid={tile.id}
      class="video-content"
      controls
      autoplay
      preload="none"
      playsinline="playsinline"
      oncanplay="this.muted=true">
      <source src={url} width={width.toString()} height={height.toString()} type={mime} />
    </video>
  )
}

function RenderTwitterTemplate({ tile }: { tile: Tile }) {
  const { standard_resolution } = tile.video

  return (
    <video
      tileid={tile.id}
      class="video-content"
      controls
      autoplay
      preload="auto"
      playsinline="playsinline"
      oncanplay="this.muted=true">
      <source src={standard_resolution.url} />
    </video>
  )
}

function RenderTikTokTemplate({ tile }: { tile: Tile }) {
  const tiktokId = tile.original_url.split("/")[5]

  return (
    <iframe
      loading="lazy"
      class="video-content"
      frameborder="0"
      allowfullscreen
      src={`https://www.tiktok.com/player/v1/${tiktokId}`}
    />
  )
}

function RenderFacebookFallbackTemplate({ tile }: { tile: Tile }) {
  const embedBlock = (
    <div class="fb-content-wrapper">
      <div id="fb-root"></div>
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v21.0"></script>

      <div class="fb-video" data-href={tile.original_link} data-width="500" data-show-text="false">
        <blockquote cite={tile.original_link} class="fb-xfbml-parse-ignore">
          <a href={tile.original_link}></a>
          <p></p>Posted by <a href={`https://www.facebook.com/$${tile.source_user_id}`}>{tile.name}</a> on
          {tile.time_ago}
        </blockquote>
      </div>
    </div>
  )
  return (
    <iframe loading="lazy" class="video-frame" frameborder="0" allowfullscreen srcdoc={embedBlock.innerHTML}></iframe>
  )
}

function RenderYoutubeTemplate({ tile }: { tile: Tile }) {
  const youtubeId = tile.youtube_id as string
  const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1`
  const title = tile.title as string

  return (
    <iframe
      loading="lazy"
      class="video-frame"
      src={src}
      title={title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>
  )
}

function RenderVideoErrorFallbackTemplate({
  tile,
  parent,
  defaultHidden = true
}: {
  tile: Tile
  parent?: string
  defaultHidden?: boolean
}) {
  const originalImageUrl = tile.original_image_url as string
  const fallbackCss = `video-fallback-content${defaultHidden ? " hidden" : ""}`

  return (
    <div class={fallbackCss}>
      <a href={tile.original_url || tile.original_link} target="_blank">
        <ImageTemplate
          parent={parent}
          image={originalImageUrl}
          tile={tile}
          productsEnabled={false}
          shopspotEnabled={false}
        />
        <div class="play-icon"></div>
      </a>
    </div>
  )
}
