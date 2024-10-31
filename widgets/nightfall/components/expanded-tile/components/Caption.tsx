import { createElement, createFragment } from "jsx-html"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"
import { Tags } from "@libs/templates/tags/tags.lib"
import Timestamp from "./Timestamp"
import { ISdk, Tile } from "@stackla/public-types"

declare const sdk: ISdk

export function isCaptionEnabled(tile: Tile) {
  const { show_caption } = sdk.getExpandedTileConfig()
  return tile.message.length > 0 && show_caption
}

export default ({ tile }: ExpandedTileProps) => {
  const productsEnabled = sdk.isComponentLoaded("products")
  const parent = sdk.getNodeId()

  return (
    <div className="caption">
      <p className="caption-paragraph">{isCaptionEnabled(tile) ? tile.message : <></>}</p>
      <Tags tile={tile} />
      <Timestamp tile={tile} />
      {productsEnabled && <ugc-products parent={parent}></ugc-products>}
    </div>
  )
}
