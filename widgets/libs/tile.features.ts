import { Sdk, Tile } from "@stackla/types";
import { loadExpandSettingComponents } from "./widget.components";
import { registerTileClickEventListeners, registerTileClosedListener, registerTileExpandListener } from "./tile.listeners";
import { BaseConfig } from '../../types/IBaseConfig';

declare const sdk: Sdk;

export const getTileId = (
    currentTile: Tile,
    enabledTiles: Tile[],
    direction: string,
  ) => {
    const currentIndex = enabledTiles.findIndex(
      (tile: Tile) => tile.id === currentTile.id,
    );
    if (direction === "previous") {
      return currentIndex > 0 ? enabledTiles[currentIndex - 1].id : null;
    } else if (direction === "next") {
      return currentIndex >= 0 && currentIndex < enabledTiles.length - 1
        ? enabledTiles[currentIndex + 1].id
        : null;
    }
    return null;
  };
  
  export const handleTileArrowClicked = (type: string) => {
    const currentTile = sdk.tiles.getTile();
  
    if (!currentTile) {
      throw new Error("Failed to find current tile");
      return;
    }
  
    const enabledTiles = sdk.tiles
      .getEnabledTiles()
      .filter(
        (item) => item.media === "video" || item.media === "image",
      ) as Tile[];
    const tileId = getTileId(currentTile, enabledTiles, type);
    const tileData = {
      tileData: enabledTiles.find((tile) => tile.id === tileId),
      widgetId: sdk.placement.getWidgetId(),
      filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId,
    };
    sdk.triggerEvent("tileExpandClose");
    sdk.triggerEvent("tileExpand", tileData);
  };
  
  export const arrowClickListener = (e: Event) => {
    if (!e.target) {
      throw new Error("Failed to find target element for arrow click listener");
    }
  
    const target = e.target as HTMLElement;
  
    const type = target.classList.contains("tile-arrows-left")
      ? "previous"
      : "next";
  
    handleTileArrowClicked(type);
  };

export function addAutoAddTileFeature<T extends BaseConfig>(widgetSettings: T) {
    if (widgetSettings.auto_refresh === true) {
        sdk.tiles.setAutoAddNewTiles(true);
    }
}

export function loadTileExpandArrows(fn : () => void) {
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

    fn();
  }

export function loadClickThroughFeature<T extends BaseConfig>(
    widgetSettings : T,
    onTileExpand : () => void = () => {},
    onTileClosed : () => void = () => {}
) {
    if (widgetSettings.click_through_url === "[EXPAND]") {
      loadExpandSettingComponents<T>(widgetSettings);
      registerTileExpandListener(onTileExpand);
      registerTileClosedListener(onTileClosed);
    } else if (
      widgetSettings.click_through_url === "[ORIGINAL_URL]" ||
      /^https?:\/\/.+/.test(widgetSettings.click_through_url ?? "")
    ) {
      registerTileClickEventListeners(widgetSettings);
    }
  }

  export function addLoadMoreButtonFeature() {
    const EVENT_LOAD_MORE = "moreLoad";
    const loadMoreButton = sdk.querySelector("#load-more");

    if (!loadMoreButton) {
      throw new Error("Failed to find load more button");
    }

    function loadMore() {
      sdk.triggerEvent(EVENT_LOAD_MORE);

      if (!sdk.tiles.hasMorePages()) {
        // @ts-expect-error - Property is possibly null or undefined
        loadMoreButton.style.display = "none";
      }
    }

    loadMoreButton.onclick = loadMore;
  }

  export function addTilesPerPageFeature<T extends BaseConfig>(widgetSettings: T) {
    if (widgetSettings.enable_custom_tiles_per_page) {
      sdk.tiles.setVisibleTilesCount(widgetSettings.tiles_per_page);
    } else {
      sdk.tiles.setVisibleTilesCount(3 * widgetSettings.rows_per_page);
    }
  }

  export function loadTitle() {
    const widgetTitle = document.createElement("p");
    const widgetContainer = sdk.placement.getWidgetContainer();
    const title = widgetContainer.title;
  
    if (title) {
      widgetTitle.innerHTML = title;
    }
  }