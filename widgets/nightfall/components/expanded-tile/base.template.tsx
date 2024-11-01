import type { ISdk } from "@stackla/widget-utils"
import { createElement } from "@stackla/widget-utils"
import Panel from "./components/Panel"
import PanelRight from "./components/PanelRight"
import PanelLeft from "./components/PanelLeft"

export default (sdk: ISdk) => {
  const tile = sdk.tiles.getTile()

  if (!tile) {
    throw new Error("Failed to find expanded tile")
  }

  return (
    <Panel>
      <PanelLeft tile={tile} />
      <PanelRight tile={tile} />
    </Panel>
  )
}
