import type { Sdk } from "@stackla/ugc-widgets"
import { getConfig } from "../../widget.config"
import { getTimephrase } from "../../../libs/tile.lib"
import { tileTemplate } from "./tile.template"

declare const sdk: Sdk

export default function initializeQuadrant() {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)
  const tile = sdk.tiles.getTile()

  if (!tile) {
    throw new Error("Tile not found")
  }

  tileTemplate(sdk, widgetSettings, tile)
}
