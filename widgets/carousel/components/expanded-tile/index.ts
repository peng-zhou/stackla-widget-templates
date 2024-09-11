import { ExpandedTiles } from "./base.template"
import expandedTileStyle from "./base.scss"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function loadExpandedTileTemplates() {
  sdk.addCSSToComponent(expandedTileStyle, "expanded-tiles")
  sdk.addTemplateToComponent(ExpandedTiles, "expanded-tiles")
}
