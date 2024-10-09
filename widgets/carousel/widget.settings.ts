import { onTileExpand, initializeInlineSwiperListeners, onTileClosed, onTileRendered } from "./widget.extensions"
import { registerWidgetInitComplete } from "widgets/libs/tile.listeners"
import {
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  loadTitle,
  loadWidgetIsEnabled
} from "widgets/libs/widget.features"
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout"
import getCSSVariables from "widgets/libs/css-variables"
import { Sdk } from "@stackla/ugc-widgets"
import { getConfig } from "./widget.config"

declare const sdk: Sdk

export function loadSettings() {
  sdk.tiles.preloadImages = false
  sdk.tiles.setLoadMode("all")
  sdk.tiles.loadOwner = "client"

  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  loadWidgetIsEnabled(widgetSettings)
  addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
  loadTitle()
  registerWidgetInitComplete(initializeInlineSwiperListeners)
  addAutoAddTileFeature(widgetSettings)
  loadExpandedTileFeature(widgetSettings, onTileExpand, onTileClosed, onTileRendered)
}
