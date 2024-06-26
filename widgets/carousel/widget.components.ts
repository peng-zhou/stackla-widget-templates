import { Sdk } from "@stackla/types";

declare const sdk: Sdk;

export function loadComponents(widgetSettings) {
    sdk.addLoadedComponents([
        'https://cdn.jsdelivr.net/npm/@glidejs/glide',
        'https://assetscdn.stackla.com/media/js/common/stackla_tile_decorator.js',
        'https://static.addtoany.com/menu/page.js'
      ]);
      
      if (widgetSettings.expanded_tile_show_shopspots) {
        sdk.addLoadedComponents([
          "shopspots",
        ]);
      }
      
}

export function loadExpandSettingComponents(widgetSettings) {
    sdk.addLoadedComponents([
        "expanded-tile",
        "cross-sellers",
      ]);
      if (widgetSettings.expanded_tile_show_products) {
        sdk.addLoadedComponents([
          "products",
        ]);
      }
      if (widgetSettings.expanded_tile_show_add_to_cart) {
        sdk.addLoadedComponents([
          "add-to-cart",
        ]);
      }
}