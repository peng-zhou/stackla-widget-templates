import type { Sdk } from "@stackla/ugc-widgets"
import { getTimephrase } from "../../../libs/tile.lib"
import { getConfig } from "../../widget.config"
import { getTagsFromTile } from "widgets/libs/templates/expanded-tile.lib"
import { createElement } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"

export default function ExpandedTile(sdk: Sdk) {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const tile = sdk.tiles.getTile()

  if (!tile) {
    throw new Error("Failed to find expanded tile")
  }

  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && widgetSettings.expanded_tile_show_shopspots
  const productsEnabled = sdk.isComponentLoaded("products") && widgetSettings.expanded_tile_show_products
  const parent = sdk.getNodeId()

  return (
    <div className="panel">
      <a className="exit" href="#">
        <span className="widget-icon close"></span>
      </a>
      <div className="tile-arrows">
        <button className="tile-arrows-btn tile-arrows-left">
          <span className="widget-icon chevron-left"></span>
        </button>
        <button className="tile-arrows-btn tile-arrows-right">
          <span className="widget-icon chevron-right"></span>
        </button>
      </div>
      <div className="panel-left">
        <div className="image-wrapper">
          <div className="image-wrapper-inner">
            <div className="image">
              {shopspotEnabled && <shopspot-flyout parent={parent} />}
              {shopspotEnabled && <shopspot-icon parent={parent} />}
              {tile.image && <img className="image-element" src={tile.image} alt="Tile" />}
            </div>
          </div>
        </div>
        <div>
          <span className="source">
            <i className={`fs fs-${tile.source}`}></i>
          </span>
        </div>
      </div>
      <div className="panel-right">
        <div className="panel-right-wrapper">
          <div className="content-wrapper">
            <div className="content-inner-wrapper">
              <div className="user-info-wrapper">
                <div className="user-info">
                  {tile.avatar ? (
                    <span className="avatar-wrapper">
                      <a className="avatar-link" href={tile.original_url} target="_blank" rel="noopener noreferrer">
                        <img src={tile.avatar} alt="Avatar" />
                      </a>
                    </span>
                  ) : (
                    <></>
                  )}
                  {tile.user ? (
                    <a className="user-link" href={tile.original_url} target="_blank" rel="noopener noreferrer">
                      <div className="user-top">
                        <span className="user-name">{tile.user}</span>
                      </div>
                      <div className="user-bottom">
                        <span className="user-handle">@{tile.user}</span>
                      </div>
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="tile-timestamp">
                {tile.source_created_at && widgetSettings.expanded_tile_show_timestamp
                  ? getTimephrase(tile.source_created_at)
                  : ""}
              </div>
              <div className="caption">
                <p className="caption-paragraph">
                  {tile.message && widgetSettings.expanded_tile_show_caption ? tile.message : ""}
                </p>
                <div>{getTagsFromTile(tile)}</div>
                {productsEnabled ? <ugc-products parent={parent}></ugc-products> : <></>}
              </div>
              <div className="footer">
                <span className="base-v2 source source-instagram">
                  <i className="fs fs-instagram"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
