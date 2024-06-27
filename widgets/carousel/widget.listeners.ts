import { Sdk } from "@stackla/types";
import { initializeGlide } from "./widget.extensions";
import { handleTileClick } from "./widget.handlers";
import { loadTileExpandArrows } from "./widget.features";
import { IWidgetSettings } from "types/IWidgetSettings";

declare const sdk: Sdk;

export function registerLoadListener(widgetSettings: IWidgetSettings) {
  sdk.addEventListener("load", () => {
    const arrows = sdk.querySelector(".glide__arrows");
    const tiles = sdk.querySelector(".ugc-tiles");

    if (!tiles || !arrows) {
      console.error("Failed to find tiles or arrow UI element");
      return;
    }

    tiles.classList.add("glide__slides");
    tiles.style.display = "";
    const showWidget = true;
    if (showWidget) {
      initializeGlide(widgetSettings);
    }

    window.addEventListener("resize", function () {
      if (showWidget) {
        initializeGlide(widgetSettings);
      }
    });
    arrows.style.display = "inline-block";
  });
}

export function registerTileClickEventListeners(
  widgetSettings: IWidgetSettings,
) {
  const urlPattern = /^https?:\/\/.+/;

  const tiles = sdk.querySelectorAll(".ugc-tile");

  if (!tiles) {
    throw new Error("Failed to find tiles UI element");
  }

  tiles.forEach((tile: HTMLElement) => {
    const url = widgetSettings.click_through_url ?? "";
    const urlIsValid = urlPattern.test(url);

    if (urlIsValid) {
      tile.onclick = (e) => {
        handleTileClick(e, url);
      };
    }
  });
}

export function registerTileExpandListener() {
  sdk.addEventListener("tileExpand", () => {
    loadTileExpandArrows();
  });
}

export function registerTileClosedListener() {
  sdk.addEventListener("expandedTileClose", () => {
    const arrows = sdk.querySelector(".tile-arrows");

    if (!arrows) {
      throw new Error("Failed to find arrows UI element");
    }
    
    arrows.style.display = "block";
  });
}
