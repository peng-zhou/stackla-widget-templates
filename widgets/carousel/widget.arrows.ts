import { Sdk } from "@stackla/types";

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
  const enabledTiles = sdk.tiles
    .getEnabledTiles()
    .filter((item: Tile) => item.media === "video" || item.media === "image");
  const tileId = getTileId(currentTile, enabledTiles, type);
  const tileData = {
    tileData: enabledTiles.find((tile: Tile) => tile.id === tileId),
    widgetId: sdk.placement.getWidgetId(),
    filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId,
  };
  sdk.triggerEvent("tileExpandClose");
  sdk.triggerEvent("tileExpand", tileData);
};

export const arrowClickListener = (e: Event) => {
  if (!e.target) {
    return;
  }

  const target = e.target as HTMLElement;

  const type = target.classList.contains("tile-arrows-left")
    ? "previous"
    : "next";
  handleTileArrowClicked(type);
};
