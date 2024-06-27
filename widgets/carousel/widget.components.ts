import type { Sdk } from "@stackla/types";
import { IWidgetSettings } from "types/IWidgetSettings";
import { getConfig } from "./widget.config";

declare const sdk: Sdk;

export function loadComponents() {
  const widgetContainer = sdk.placement.getWidgetContainer();
  const widgetSettings = getConfig(widgetContainer);

  if (widgetSettings.expanded_tile_show_shopspots) {
    sdk.addLoadedComponents(["shopspots"]);
  }
}

export function loadExpandSettingComponents(widgetSettings: IWidgetSettings) {
  sdk.addLoadedComponents(["expanded-tile", "cross-sellers"]);
  if (widgetSettings.expanded_tile_show_products) {
    sdk.addLoadedComponents(["products"]);
  }
  if (widgetSettings.expanded_tile_show_add_to_cart) {
    sdk.addLoadedComponents(["add-to-cart"]);
  }
}
