import ImageContainer from "./ImageContainer"
import { createElement } from "@stackla/widget-utils"
import { ExpandedTileProps } from "widgets/nightfall/types/ExpandedTileProps"

export default ({ tile }: ExpandedTileProps) => (
  <div class="panel-left">
    <ImageContainer tile={tile} />
  </div>
)
