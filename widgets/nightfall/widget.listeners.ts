import { Sdk } from "@stackla/types";

declare const sdk: Sdk;

export function onTileClose() {
    const tilesWrapper = sdk.querySelector(".track");

    if (!tilesWrapper) {
      throw new Error("Failed to find tiles UI element");
    }
  
    tilesWrapper.style.display = "block";
}