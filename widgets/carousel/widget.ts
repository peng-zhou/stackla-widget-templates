import { Sdk } from "@stackla/types";
import { getConfig } from "./widget.config";
import { loadComponents, loadExpandSettingComponents } from "./widget.components";
import { addAutoAddTileFeature, addTilesPerPageFeature, loadTileExpandArrows } from "./widget.features";
import { registerLoadListener, registerTileClickEventListeners, registerTileClosedListener, registerTileExpandListener } from "./widget.listeners";
import { expandedTileTemplate } from "./components/expanded-tile/base.template";

declare const sdk: Sdk;
sdk.tiles.preloadImages = true;
sdk.tiles.setLoadMode('page');

const widgetContainer = sdk.placement.getWidgetContainer();
const title = widgetContainer.title;

let widgetTitle = document.createElement('p');
widgetTitle.innerHTML = title;

const widgetSettings = getConfig(widgetContainer);

if (!widgetSettings.enabled) { throw new Error("Widget is not enabled"); }

loadComponents(widgetSettings);
addAutoAddTileFeature(widgetSettings);
addTilesPerPageFeature(widgetSettings);
registerLoadListener(widgetSettings);

if (widgetSettings.click_through_url === '[EXPAND]') {
  loadExpandSettingComponents(widgetSettings);
  registerTileExpandListener();
  registerTileClosedListener();
} else if (widgetSettings.click_through_url === '[ORIGINAL_URL]' || /^https?:\/\/.+/.test(widgetSettings.click_through_url)) {
  registerTileClickEventListeners(widgetSettings);
}

// Style
sdk.addCSSToComponent(
  `:host {
    padding: 0;
    box-sizing: border-box;
    display: inline-block;
    margin: 30px auto;
    max-width: 1060px;
    position: relative;
    vertical-align: middle;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: transparent;
  }
  .exit {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
  }
  .panel {
    display: flex;
    position: relative;
    background: #f4f4f4;
    width: 100%;
    height: 100%;
  }
  .panel-left {
    min-width: 40%;
    max-width: 40%;
    background: #fff;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .panel-left img {
    width: 100%;
  }
  .panel-right {
    padding: 26px 40px;
  }
  .tile-arrows-left {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: -60px;
    border: 0;
    background: none;
  }
  .tile-arrows-right {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    right: -60px;
    border: 0;
    background: none;
  }

  .tile-arrows .widget-icon {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  div.image {
    position: relative;
  }
  .image-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 16px;
  }
  .image-wrapper-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .user-info {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .user-info-wrapper {
    text-align: left !important;
  }

  .user-info-wrapper a {
    color: #666;
    font-family: 'Roboto Condensed', sans-serif;
    text-decoration: none;
    line-height: 1.4;
  }

  .user-top {
    font-weight: 700;
    font-size: 1.5em;
    text-transform: uppercase;
  }

  .user-bottom {
    font-size: 1.2em;
    font-weight: 300;
  }

  .caption-paragraph {
    color: #090909;
    display: inline-block;
    font-size: 12px;
    line-height: 2;
    text-align: left;
    width: 100%;
    word-break: break-word;
  }
  html {
    background: #${widgetSettings.widget_background};
  }
  .ugc-tile {
    width: ${widgetSettings.max_tile_width ? widgetSettings.max_tile_width : '300' }px;
    background: #${widgetSettings.text_tile_background};
    margin-left: ${widgetSettings.margin}px !important;
    margin-right: ${widgetSettings.margin}px !important;
  }
  .caption {
    font-size: ${widgetSettings.text_tile_font_size}px;
    color: #${widgetSettings.text_tile_font_color};
  }
  .content-inner-wrapper a {
    color: #${widgetSettings.text_tile_link_color};
  }
  .user-name {
    font-size: ${widgetSettings.text_tile_user_name_font_size}px;
    color: #${widgetSettings.text_tile_user_name_font_color};
  }
  .user-handle {
    font-size: ${widgetSettings.text_tile_user_handle_font_size}px;
    color: #${widgetSettings.text_tile_user_handle_font_color};
  }
  .widget-icon {
    display: block;
  }
  .tile-timestamp {
    color: #ababab;
    display: inline-block;
    font-size: 12px;
    padding-right: 20px;
    text-align: left;
    width: 100%;
  }
  `,
  'expanded-tile'
);

sdk.addCSSToComponent(
  `
    .stacklapopup-products-item-title-wrap {
      text-decoration: none;
    }
    .stacklapopup-products-item-title {
      color: #000;
      text-transform: uppercase;
      font-size: 18px;
      font-weight: bold;
      line-height: 1.2;
      text-transform: uppercase;
    }
    .stacklapopup-products-item-price {
      font-size: 14px;
      font-weight: normal;
      color: #000;
      margin-bottom: 5px;
    }
    .stacklapopup-products-item-description {
      color: #282828;
      font-size: 14px;
      font-weight: 400;
    }
    .stacklapopup-shopspot-cart,
    .stacklapopup-products-item-button {
      color: #${widgetSettings.shopspot_btn_font_color};
      background-color: #${widgetSettings.shopspot_btn_background};
      border-radius: 4px;
      display: inline-block;
      font-size: 14px;
      font-style: normal;
      font-weight: bold;
      padding: 15px 0px;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      min-width: 300px;
    }
    `,
  'ugc-products'
);

sdk.addTemplateToComponent(expandedTileTemplate, 'expanded-tile');