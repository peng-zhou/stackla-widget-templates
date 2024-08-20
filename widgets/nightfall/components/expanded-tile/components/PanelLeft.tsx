import ImageContainer from "./ImageContainer"
import { createElement } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { Tile } from "@stackla/ugc-widgets"

export default (tile: Tile) => (
  <div class="panel-left">
    <ImageContainer tile={tile} />
  </div>
)
