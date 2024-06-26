import { Sdk } from "@stackla/types";

declare const sdk: Sdk;

export function handleTileClick(e : Event, widgetUrl : string) {
    const ugcTiles = sdk.tiles.tiles;
    const clickedTile = e.target.closest('.ugc-tile');
    
    if (clickedTile) {
      const tileId = clickedTile.getAttribute('data-id');
      const tileData = ugcTiles[tileId];
      
      if (tileData) {
        const tileLink = widgetUrl || tileData.original_url || tileData.original_link;
        window.open(tileLink, '_blank');
      }
    }
  }