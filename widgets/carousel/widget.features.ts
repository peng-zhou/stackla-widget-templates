import { Sdk } from "@stackla/types";
import { IWidgetSettings } from "types/IWidgetSettings";
import { arrowClickListener } from "./widget.arrows";
import { loadExpandSettingComponents } from "./widget.components";
import { registerTileExpandListener, registerTileClosedListener, registerTileClickEventListeners } from "./widget.listeners";

declare const sdk: Sdk;

export function addAutoAddTileFeature(widgetSettings: IWidgetSettings) {
  if (widgetSettings.auto_refresh === true) {
    sdk.tiles.setAutoAddNewTiles(true);
  }
}

export function addTilesPerPageFeature(widgetSettings: IWidgetSettings) {
  const loadMoreButton = sdk.querySelector<HTMLButtonElement>("#load-more");

  if (!loadMoreButton) {
    throw new Error("Failed to find load more button UI element");
  }

  if (widgetSettings.enable_custom_tiles_per_page) {
    sdk.tiles.setVisibleTilesCount(widgetSettings.tiles_per_page);
    loadMoreButton.style.display = "none";
  } else {
    sdk.tiles.setVisibleTilesCount(3 * widgetSettings.rows_per_page);
  }
}

export function loadTileExpandArrows() {
  const arrows = sdk.querySelector(".glide__arrows");

  if (!arrows) {
    throw new Error("Failed to find arrows UI element");
  }

  arrows.style.display = "none";
  const expandedTile = sdk.querySelector("expanded-tile");

  if (!expandedTile) {
    throw new Error("Failed to find expanded tile UI element");
  }

  const expandedTileShadowRoot = expandedTile.shadowRoot;

  if (!expandedTileShadowRoot) {
    throw new Error("Failed to find expanded tile shadow root");
  }

  const prevButton = expandedTileShadowRoot.querySelector(".tile-arrows-left");
  const nextButton = expandedTileShadowRoot.querySelector(".tile-arrows-right");

  if (!prevButton || !nextButton) {
    throw new Error("Failed to find arrow UI elements");
  }

  prevButton.addEventListener("click", arrowClickListener);
  nextButton.addEventListener("click", arrowClickListener);
}

export function loadClickThrough(widgetSettings: IWidgetSettings) {
    if (widgetSettings.click_through_url === "[EXPAND]") {
        loadExpandSettingComponents(widgetSettings);
        registerTileExpandListener();
        registerTileClosedListener();
      } else if (
        widgetSettings.click_through_url === "[ORIGINAL_URL]" ||
        /^https?:\/\/.+/.test(widgetSettings.click_through_url ?? '')
      ) {
        registerTileClickEventListeners(widgetSettings);
      }
}