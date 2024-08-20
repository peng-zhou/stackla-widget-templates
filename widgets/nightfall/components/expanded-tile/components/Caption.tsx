import { createElement, createFragment } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { getTagsFromTile } from "../../../../libs/templates/expanded-tile.lib"
import { Sdk, Tile } from "@stackla/ugc-widgets"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"
import { IWidgetSettings } from "types/IWidgetSettings"

declare const sdk: Sdk

export function isCaptionEnabled(tile: Tile, widgetSettings: IWidgetSettings) {
  return tile.message.length > 0 && widgetSettings.expanded_tile_show_caption
}

export default ({ tile, widgetSettings }: ExpandedTileProps) => {
  const productsEnabled = sdk.isComponentLoaded("products")
  const parent = sdk.getNodeId()

  return (
    <div className="caption">
      <p className="caption-paragraph">{isCaptionEnabled(tile, widgetSettings) ? tile.message : <></>}</p>
      {getTagsFromTile(tile)}
      {productsEnabled ? <ugc-products parent={parent}></ugc-products> : <></>}
    </div>
  )
}
