import ImageContainer from "./ImageContainer"
import { createElement } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { ExpandedTileProps } from "widgets/nightfall/types/ExpandedTileProps"

export default ({ tile }: ExpandedTileProps) => (
  <div class="panel-left">
    <ImageContainer tile={tile} />
  </div>
)
