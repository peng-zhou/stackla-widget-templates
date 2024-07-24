import type { Sdk } from "@stackla/types"
import { getTimephrase } from "widgets/libs/tile.lib"
import { getConfig } from "widgets/nightfall/widget.config"

export default (sdk: Sdk) => {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const tile = sdk.tiles.getTile()

  if (!tile) {
    throw new Error("Failed to find expanded tile")
  }

  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && widgetSettings.expanded_tile_show_shopspots
  const productsEnabled = sdk.isComponentLoaded("products") && widgetSettings.expanded_tile_show_products
  const parent = sdk.getNodeId()
  return `<div class="panel">
          <a class="exit" href="#">
              <span class="widget-icon close"></span>
          </a>
          <div class="tile-arrows">
              <button class="tile-arrows-btn tile-arrows-left"><span class="widget-icon chevron-left"></span></button>
              <button class="tile-arrows-btn tile-arrows-right" ><span class="widget-icon chevron-right"></span></button>
          </div>
          <div class="panel-left">
              <div class="image-wrapper">
                  <div class="image-wrapper-inner">
                      <div class="image">
                          ${shopspotEnabled ? `<shopspot-flyout parent="${parent}"></shopspot-flyout>` : ""}
                          ${shopspotEnabled ? `<shopspot-icon parent="${parent}"/></shopspot-icon>` : ""}
                          ${tile.image ? `<img class="image-element" src="${tile.image}" />` : ""}
                      </div>
                  </div>
              </div>
              <div>
                  <span class="source">
                      <i class="fs fs-${tile.source}"></i>
                  </span>
              </div>
          </div>
          <div class="panel-right">
              <div class="panel-right-wrapper">
                  <div class="content-wrapper">
                      <div class="content-inner-wrapper">
                          <div class="user-info-wrapper">
                              <div class="user-info">
                                  ${
                                    tile.avatar
                                      ? `<span class="avatar-wrapper">
                                      <a class="avatar-link" href="${tile.original_url}" target="_blank">
                                         <img src="${tile.avatar}">
                                      </a>
                                  </span>`
                                      : ""
                                  }
                                  ${
                                    tile.user
                                      ? `<a class="user-link" href="${tile.original_url}" target="_blank">
                                      <div class="user-top">
                                          <span class="user-name">${tile.user}</span>
                                      </div>
                                      <div class="user-bottom">
                                          <span class="user-handle">@${tile.user}</span>
                                      </div>
                                  </a>`
                                      : ""
                                  }
                              </div>
                          </div>
                          <div class="tile-timestamp">${tile.source_created_at && widgetSettings.expanded_tile_show_timestamp ? getTimephrase(tile.source_created_at) : ""}</div>
                          <div class="caption">
                              <p class="caption-paragraph">${
                                tile.message && widgetSettings.expanded_tile_show_caption ? tile.message : ""
                              }</p>
                              ${productsEnabled ? `<ugc-products parent="${parent}">` : ""}
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
        </div>`
}
