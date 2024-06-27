import { Sdk } from "@stackla/types";
import { IWidgetSettings } from "types/IWidgetSettings";

declare const sdk: Sdk;

export function loadComponents(widgetSettings: IWidgetSettings) {
  sdk.addLoadedComponents([
    // TODO - Remove this legacy code
    "https://assetscdn.stackla.com/media/js/common/stackla_tile_decorator.js",
    "https://static.addtoany.com/menu/page.js",
  ]);

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
