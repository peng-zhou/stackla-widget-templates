import { Sdk } from "@stackla/types";

declare const sdk: Sdk;

export function handleTileClick(e: Event, widgetUrl: string) {
  const ugcTiles = sdk.tiles.tiles;

  const clickedElement = e.target as HTMLElement;
  const clickedTile = clickedElement.closest(".ugc-tile");

  if (!clickedTile) {
    throw new Error("Failed to find clicked tile");
  }

  const tileId = clickedTile.getAttribute("data-id");

  if (!tileId) {
    throw new Error("Failed to find tile ID");
  }

  const tileData = ugcTiles[tileId];
  const tileLink: string =
    widgetUrl || tileData.original_url || tileData.original_link;

  if (tileLink) {
    window.open(tileLink, "_blank");
  }
}
