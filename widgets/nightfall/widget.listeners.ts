import { Sdk } from "@stackla/ugc-widgets"
declare const sdk: Sdk

export function onTileClose() {
  const tilesWrapper = sdk.querySelector(".track")
  const tilesContainer = sdk.querySelector("#tiles")
  const ugcTiles = sdk.querySelector(".ugc-tiles")

  if (!ugcTiles) {
    throw new Error("Failed to find tiles wrapper")
  }

  if (!tilesWrapper) {
    throw new Error("Failed to find tiles wrapper")
  }

  if (!tilesContainer) {
    throw new Error("Failed to find tiles container")
  }

  tilesWrapper.style.display = "flex"
  tilesContainer.style.display = "flex"
}
