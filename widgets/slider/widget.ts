import { getConfig } from "./widget.config";
import {
  addAutoAddTileFeature,
  addLoadMoreButtonFeature,
  addTilesPerPageFeature,
  loadExpandedTileFeature,
  loadTitle,
} from "widgets/libs/tile.features";
import { IWidgetSettings } from "types/IWidgetSettings";
import { ISdkMasonry } from "types/ISdkMasonry";
import {
  initializeMasonry,
  loadMoreMasonryTiles,
  refreshMasonryLayout,
} from "widgets/libs/extensions/masonry.extension";
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout";
import getCSSVariables from "./css.variables";
import expandedTileCSS from "./components/expanded-tile/base.scss";
import productsCSS from "./components/products/base.scss";
import customExpandedTileTemplate from "./components/expanded-tile/base.template";

declare const sdk: ISdkMasonry;

sdk.tiles.setLoadMode("all");
sdk.tiles.hideBrokenTiles = true;
sdk.tiles.preloadImages = true;

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
loadExpandedTileFeature(widgetSettings);
addTilesPerPageFeature<IWidgetSettings>(widgetSettings);

sdk.addEventListener("load", () => {

  const sliderScrollUpButton = sdk.querySelector("#scrollUp");
  const slidewrScrollDownButton = sdk.querySelector("#scrollDown");
  const tileBlockElement = sdk.querySelector(".ugc-tile-wrapper");
  const tilesContainer = sdk.querySelector(".ugc-tiles");

  const blockHeight = tileBlockElement?.offsetHeight ? tileBlockElement.offsetHeight : '220';

  console.log("slider blockHeight", blockHeight);
  console.log("slider sliderScrollUpButton", sliderScrollUpButton);
  console.log("slider tileBlockElement", tileBlockElement);
  console.log("slider tilesContainer", tilesContainer);
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
});
sdk.addEventListener("moreLoad", () => loadMoreMasonryTiles());
sdk.addEventListener("tilesUpdated", () => refreshMasonryLayout());
sdk.addCSSToComponent(expandedTileCSS, "expanded-tile");
sdk.addCSSToComponent(productsCSS, "ugc-products");
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile");
