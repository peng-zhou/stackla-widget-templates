import { Sdk } from "@stackla/types";
import { getConfig } from "./widget.config";

declare const sdk: Sdk;

export default function getCSSVariables() {
  const widgetContainer = sdk.placement.getWidgetContainer();
  const widgetSettings = getConfig(widgetContainer);

  return `
        --widget-background: #${widgetSettings.widget_background};
        --text-tile-background: #${widgetSettings.text_tile_background};
        --text-tile-font-color: #${widgetSettings.text_tile_font_color};
        --text-tile-link-color: #${widgetSettings.text_tile_link_color};
        --text-tile-user-name-font-color: #${widgetSettings.text_tile_user_name_font_color};
        --text-tile-user-handle-font-color: #${widgetSettings.text_tile_user_handle_font_color};
        --shopspot-btn-background: #${widgetSettings.shopspot_btn_background};
        --shopspot-btn-font-color: #${widgetSettings.shopspot_btn_font_color};
        --max-tile-width: ${widgetSettings.max_tile_width};
        --margin: ${widgetSettings.margin ? widgetSettings.margin : 0};
        --text-tile-font-size: ${widgetSettings.text_tile_font_size};
        --text-tile-user-name-font-size: ${widgetSettings.text_tile_user_name_font_size};
        --text-tile-user-handle-font-size: ${widgetSettings.text_tile_user_handle_font_size};
        ? widgetSettings.text_tile_user_handle_font_size
        : 12};
        --shopspot-btn_font_color: #${widgetSettings.shopspot_btn_font_color};
        --shopspot-btn_background: #${widgetSettings.shopspot_btn_background};
`;
}
