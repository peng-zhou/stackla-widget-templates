import { registerExpandedTileCrossSellersRendered, registerWidgetInitComplete } from "widgets/libs/tile.listeners"
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
import { initializeInlineSwiperListeners } from "./components/inline-swiper.loader"
import {
  onTileClosed,
  onTileExpand,
  onTileRendered
} from "@libs/components/expanded-tile-swiper/expanded-swiper.loader"
import { onExpandedTileCrossSellersRendered } from "@libs/components/expanded-tile-swiper/product-recs-swiper.loader"

declare const sdk: Sdk

export function loadSettings() {
  sdk.tiles.preloadImages = true

  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  loadWidgetIsEnabled(widgetSettings)
  addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
  loadTitle()
  registerWidgetInitComplete(initializeInlineSwiperListeners)
  addAutoAddTileFeature(widgetSettings)
  loadExpandedTileFeature(widgetSettings, onTileExpand, onTileClosed, onTileRendered)
  registerExpandedTileCrossSellersRendered(onExpandedTileCrossSellersRendered)
}
