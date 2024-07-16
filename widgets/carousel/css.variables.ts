import type { Sdk } from "@stackla/types";
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
        --show-caption: ${widgetSettings.show_caption ? "block" : "none"};
        ${
          widgetSettings.shopspot_icon
            ? `--shopspot-icon: url("${widgetSettings.shopspot_icon}")`
            : `--shopspot-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z' fill='%23fff' /%3E%3C/svg%3E");
        `
        };
`;
}
