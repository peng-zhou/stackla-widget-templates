import { ExpandedTiles } from "./base.template"
import expandedTileStyle from "./base.scss"
import { Sdk } from "@stackla/ugc-widgets"
import shareMenuStyle from "./share-menu.scss"

declare const sdk: Sdk

export function loadExpandedTileTemplates() {
  sdk.addCSSToComponent(expandedTileStyle, "expanded-tiles")
  sdk.addCSSToComponent(shareMenuStyle, "share-menu")
  sdk.addTemplateToComponent(ExpandedTiles, "expanded-tiles")
  sdk.addWidgetCustomStyles(` 
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  body {
    font-family: 'Inter', sans-serif;
  }`)
}
