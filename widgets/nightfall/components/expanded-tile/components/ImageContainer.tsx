import { createElement, createFragment } from "jsx-html"
import { Sdk } from "@stackla/ugc-widgets"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"
import { IWidgetSettings } from "types/IWidgetSettings"

declare const sdk: Sdk

export function getShopspots(widgetSettings: IWidgetSettings) {
  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && widgetSettings.expanded_tile_show_shopspots
  const parent = sdk.getNodeId()

  console.log("shopspotEnabled", shopspotEnabled)

  if (!shopspotEnabled) {
    return <></>
  }

  return (
    <div>
      <shopspot-flyout parent={parent}></shopspot-flyout>
      <shopspot-icon parent={parent}></shopspot-icon>
    </div>
  )
}

export default ({ tile, widgetSettings }: ExpandedTileProps) => {
  return (
    <>
      <div className="image-wrapper">
        <div className="image-wrapper-inner">
          <div className="image">
            {getShopspots(widgetSettings)}
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
