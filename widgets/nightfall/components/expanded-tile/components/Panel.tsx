import CloseIcon from "./CloseIcon"
import TileArrows from "./TileArrows"
import { createElement } from "@stackla/widget-utils"

export default (props: { children?: JSX.Element[] }) => (
  <div className="panel">
    <CloseIcon />
    <TileArrows />
    {props.children}
  </div>
)
