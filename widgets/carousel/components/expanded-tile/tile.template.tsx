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
  const modalWrapper = document.createElement("div")

  function openShareModal() {
    removeExistingModal()
    createModalWrapper()
    appendModalToPanel()
  }

  function removeExistingModal() {
    const popup = modalWrapper.querySelector(".share-socials-popup")
    if (popup) {
      popup.remove()
    }
  }

  function createModalWrapper() {
    modalWrapper.className = "share-socials-popup-wrapper"
    const modalElement = createShareModalElement()
    modalWrapper.appendChild(modalElement)
  }

  function createShareModalElement() {
    return (
      <div class="share-socials-popup">
        <a class="exit" href="#" onClick={closeShareModal}>
          <span class="widget-icon close-white"></span>
        </a>
        <div class="popup-text">Share Now</div>
        <ShareMenu tile={tile} showMenu={true} />
        <div class="url-copy">
          <input class="share-url" type="text" id="share-url" value="https://example.com/share-link" readonly />
          <button class="copy-button" data-action="copy" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      </div>
    )
  }

  function appendModalToPanel() {
    const panel = container?.shadowRoot?.querySelector(".swiper-expanded .panel")
    panel?.appendChild(modalWrapper)
    if (panel) {
      createOverlay(panel)
    }
  }

  function createOverlay(panel: Element | null) {
    const overlayContainer = document.createElement("div")
    overlayContainer.className = "panel-overlay"
    panel?.appendChild(overlayContainer)
  }

  async function copyToClipboard() {
    const copyText = modalWrapper.querySelector(".share-url")
    if (copyText instanceof HTMLInputElement) {
      try {
        await navigator.clipboard.writeText(copyText.value)
        alert("Copied!")
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to copy text: ", err)
      }
    }
  }

  function closeShareModal(event: Event) {
    event.preventDefault()
    const modal = container?.shadowRoot?.querySelector(".share-socials-popup-wrapper")
    const panel = container?.shadowRoot?.querySelector(".swiper-expanded .panel")
    const panelOverlay = panel?.querySelector(".panel-overlay")

    if (modal) {
      modal.remove()
      panelOverlay?.remove()
    }
  }

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
              <button class="share-button" onClick={openShareModal}>
                <span class="widget-icon icon-share"></span>
              </button>
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
