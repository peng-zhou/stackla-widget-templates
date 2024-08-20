import { createElement, createFragment } from "jsx-html"
import { Sdk } from "@stackla/ugc-widgets"
import { getConfig } from "../../../widget.config"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"

declare const sdk: Sdk

export default ({ tile }: ExpandedTileProps) => {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && widgetSettings.expanded_tile_show_shopspots
  const parent = sdk.getNodeId()

  return (
    <>
      <div className="image-wrapper">
        <div className="image-wrapper-inner">
          <div className="image">
            {shopspotEnabled ? <shopspot-flyout parent={parent}></shopspot-flyout> : <></>}
            {shopspotEnabled ? <shopspot-icon parent={parent}></shopspot-icon> : <></>}
            {tile.image ? <img alt="UGC Image" className="image-element" src={tile.image} /> : <></>}
          </div>
        </div>
      </div>
      <div>
        <span class="source">
          <i class={`fs fs-${tile.source}`}></i>
        </span>
      </div>
    </>
  )
}
