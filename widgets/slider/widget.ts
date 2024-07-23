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

  if (!tileBlockElement) {
    throw new Error("Slider Tiles Scroll Container not found");
  }

  if (!tilesContainer) {
    throw new Error("Slider Tiles Scroll Container not found");
  }

  if (!sliderScrollUpButton) {
    throw new Error("Slider Tiles Scroll Up Button not found");
  }

  if (!sliderScrollDownButton) {
    throw new Error("Slider Tiles Scroll Down Button not found");
  }

  const blockHeight = tileBlockElement.offsetHeight
    ? tileBlockElement.offsetHeight
    : 220;

  sliderScrollUpButton.addEventListener("click", () => {
    tilesContainer.scrollBy({
      top: -blockHeight,
      behavior: "smooth",
    });
  });

  sliderScrollDownButton.addEventListener("click", () => {
    tilesContainer.scrollBy({
      top: blockHeight,
      behavior: "smooth",
    });
  });
});
sdk.addCSSToComponent(expandedTileCSS, "expanded-tile");
sdk.addCSSToComponent(productsCSS, "ugc-products");
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile");
