import { createElement, createFragment } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { getTagsFromTile } from "../../../../libs/templates/expanded-tile.lib"
import { Sdk, Tile } from "@stackla/ugc-widgets"
import { getConfig } from "../../../widget.config"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"

declare const sdk: Sdk

function isCaptionEnabled(tile: Tile) {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  return tile.message && widgetSettings.expanded_tile_show_caption
}

export default ({ tile }: ExpandedTileProps) => {
  const productsEnabled = sdk.isComponentLoaded("products")
  const parent = sdk.getNodeId()

  return (
    <div className="caption">
      <p className="caption-paragraph">{isCaptionEnabled(tile) ? tile.message : <></>}</p>
      {getTagsFromTile(tile)}
      {productsEnabled ? <ugc-products parent={parent}></ugc-products> : <></>}
    </div>
  )
}
