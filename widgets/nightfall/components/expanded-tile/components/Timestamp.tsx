import { getTimephrase } from "@stackla/widget-utils/dist/libs/tile.lib"
import { createElement, createFragment, ISdk, Tile } from "@stackla/widget-utils"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"

declare const sdk: ISdk

function timestampEnabled(tile: Tile) {
  const { show_timestamp } = sdk.getExpandedTileConfig()
  return tile.source_created_at && show_timestamp
}

export default ({ tile }: ExpandedTileProps) => {
  return <div class="tile-timestamp">{timestampEnabled(tile) ? getTimephrase(tile.source_created_at) : <></>}</div>
}
