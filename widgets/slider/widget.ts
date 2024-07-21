import { getConfig } from "./widget.config";
import {
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  loadTitle,
} from "widgets/libs/tile.features";
import { IWidgetSettings } from "types/IWidgetSettings";
import { ISdkMasonry } from "types/ISdkMasonry";
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout";
import getCSSVariables from "./css.variables";
import expandedTileCSS from "./components/expanded-tile/base.scss";
import productsCSS from "./components/products/base.scss";
import customExpandedTileTemplate from "./components/expanded-tile/base.template";

declare const sdk: ISdkMasonry;

sdk.tiles.setLoadMode("all");
sdk.tiles.hideBrokenTiles = true;
sdk.tiles.preloadImages = true;
sdk.tiles.setVisibleTilesCount(100);

const widgetContainer = sdk.placement.getWidgetContainer();
const widgetSettings = getConfig(widgetContainer);
const ugcTiles = sdk.tiles.tiles;
const ugcTilesLength = Object.keys(ugcTiles).length;

const showWidget = widgetContainer.enabled;
if (!showWidget) {
  throw new Error("Widget is not enabled");
}

loadTitle();
addCSSVariablesToPlacement(getCSSVariables());
addAutoAddTileFeature<IWidgetSettings>(widgetSettings);
loadExpandedTileFeature(widgetSettings, () => {
  const ugcTilesElement = sdk.querySelector(".ugc-tiles");

  if (!ugcTilesElement) {
    throw new Error("Failed to find arrows UI element");
  }

  ugcTilesElement.style.display = "none";
}
);

sdk.addEventListener("load", () => {
  const sliderScrollUpButton = sdk.querySelector("#scrollUp");
  const sliderScrollDownButton = sdk.querySelector("#scrollDown");
  const tileBlockElement = sdk.querySelector(".ugc-tile-wrapper");
  const tilesContainer = sdk.querySelector(".ugc-tiles");

  const blockHeight = tileBlockElement?.offsetHeight
    ? tileBlockElement.offsetHeight
    : 220;

  if (sliderScrollUpButton && blockHeight !== undefined) {
    sliderScrollUpButton.addEventListener("click", () => {
      console.error("sliderScrollUpButton clicked", blockHeight);
      if (tilesContainer && blockHeight !== undefined) {
        tilesContainer.scrollBy({
          top: -blockHeight,
          behavior: "smooth",
        });
      } else if (!tilesContainer) {
        console.error("Slider Tiles Scroll Container not found");
      }
    });
  } else {
    if (!sliderScrollUpButton) {
      console.error("Slider Tiles Scroll Up Button not found");
    }
    if (blockHeight === undefined) {
      console.error("Slider Tile not found or has no height");
    }
  }

  if (sliderScrollDownButton && blockHeight !== undefined) {
    sliderScrollDownButton.addEventListener("click", () => {
      console.error("sliderScrollDownButton clicked", blockHeight);
      if (tilesContainer && blockHeight !== undefined) {
        tilesContainer.scrollBy({
          top: blockHeight,
          behavior: "smooth",
        });
      } else if (!tilesContainer) {
        console.error("Slider Tiles Scroll Container not found");
      }
    });
  } else {
    if (!sliderScrollDownButton) {
      console.error("Slider Tiles Scroll Down Button not found");
    }
    if (blockHeight === undefined) {
      console.error("Slider Tile not found or has no height");
    }
  }
  if (tilesContainer) {
    tilesContainer.addEventListener("wheel", function (event) {
      event.preventDefault();
    });
  }
});
sdk.addCSSToComponent(expandedTileCSS, "expanded-tile");
sdk.addCSSToComponent(productsCSS, "ugc-products");
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile");
