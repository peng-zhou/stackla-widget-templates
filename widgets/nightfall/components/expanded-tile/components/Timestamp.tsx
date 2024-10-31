import { getTimephrase } from "../../../../libs/tile.lib"
import { createElement, createFragment } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { Sdk, Tile } from "@stackla/ugc-widgets"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"

declare const sdk: Sdk

function timestampEnabled(tile: Tile) {
  const { show_timestamp } = sdk.getExpandedTileConfig()
  return tile.source_created_at && show_timestamp
}

export default ({ tile }: ExpandedTileProps) => {
  return <div class="tile-timestamp">{timestampEnabled(tile) ? getTimephrase(tile.source_created_at) : <></>}</div>
}
