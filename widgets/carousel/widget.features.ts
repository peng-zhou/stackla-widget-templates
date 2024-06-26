import { Sdk, Tile } from "@stackla/types";

declare const sdk: Sdk;

export function addAutoAddTileFeature(widgetSettings) {
    if (widgetSettings.auto_refresh === true) {
        sdk.tiles.setAutoAddNewTiles(true);
    }
}

export function addTilesPerPageFeature(widgetSettings) {
    const loadMoreButton = sdk.querySelector<HTMLButtonElement>("#load-more");

    if (widgetSettings.enable_custom_tiles_per_page) {
        sdk.tiles.setVisibleTilesCount(widgetSettings.tiles_per_page);
        loadMoreButton.style.display = "none";
      } else {
        sdk.tiles.setVisibleTilesCount(3 * widgetSettings.rows_per_page);
      }
}

export function loadTileExpandArrows() {
    const arrows = sdk.querySelector('.glide__arrows');
    arrows.style.display = 'none';

    const getTileId = (currentTile : Tile, enabledTiles: Tile[], direction : string) => {
        const currentIndex = enabledTiles.findIndex((tile : Tile) => tile.id === currentTile.id);
        if (direction === 'previous') {
        return currentIndex > 0 ? enabledTiles[currentIndex - 1].id : null;
        } else if (direction === 'next') {
        return currentIndex >= 0 && currentIndex < enabledTiles.length - 1 ? enabledTiles[currentIndex + 1].id : null;
        }
        return null;
    };
    
    const handleTileArrowClicked = (currentTile : Tile, enabledTiles : Tile[], type : string) => {
        const tileId = getTileId(currentTile, enabledTiles, type);
        const tileData = {
        tileData: enabledTiles.find((tile : Tile) => tile.id === tileId),
        widgetId: sdk.placement.getWidgetId(),
        filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId,
        };
        sdk.triggerEvent('tileExpandClose');
        sdk.triggerEvent('tileExpand', tileData);
    };
    
    const currentTile = sdk.tiles.getTile();
    const enabledTiles = sdk.tiles.getEnabledTiles().filter((item : Tile) => item.media === 'video' || item.media === 'image');
    const expandedTile = sdk.querySelector('expanded-tile');
    const expandedTileShadowRoot = expandedTile.shadowRoot;
    const prevButton = expandedTileShadowRoot.querySelector('.tile-arrows-left');
    const nextButton = expandedTileShadowRoot.querySelector('.tile-arrows-right');
    
    const arrowClickListener = (e) => {
        const type = e.target.classList.contains('tile-arrows-left') ? 'previous' : 'next';
        handleTileArrowClicked(currentTile, enabledTiles, type);
    };
    
    prevButton.addEventListener('click', arrowClickListener);
    nextButton.addEventListener('click', arrowClickListener);
}