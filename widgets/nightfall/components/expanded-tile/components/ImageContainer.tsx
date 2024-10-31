import { createElement, createFragment } from "jsx-html"
import { ISdk } from "@stackla/public-types"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"

declare const sdk: ISdk

export function Shopspots() {
  const { show_shopspots } = sdk.getExpandedTileConfig()
  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && show_shopspots
  const parent = sdk.getNodeId()

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

export default ({ tile }: ExpandedTileProps) => {
  return (
    <>
      <div className="image-wrapper">
        <div className="image-wrapper-inner">
          <div className="image">
            <Shopspots />
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
