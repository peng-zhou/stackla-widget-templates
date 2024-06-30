declare const sdk: Sdk;

import { getConfig } from "./widget.config";
import type { Sdk } from "@stackla/types";
import {
  initializeMasonry,
  loadMoreMasonryTiles,
  refreshMasonryLayout,
} from "./widget.extensions";
import {
  addAutoAddTileFeature,
  addLoadMoreButtonFeature,
  addTilesPerPageFeature,
  loadClickThroughFeature,
  loadTitle,
} from "widgets/libs/tile.features";
import { loadExpandSettingComponents } from "widgets/libs/widget.components";
import { IWidgetSettings } from "types/IWidgetSettings";
import customExpandedTileTemplate from "./components/expanded-tile/base.template";
import customExpandedTileCSS from "./components/expanded-tile/base.css";
import customProductsCSS from "./components/products/base.css";
import getCSSVariables from "./css.variables";
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout";
import { onTileClose } from "./widget.listeners";

sdk.tiles.setLoadMode("all");
sdk.tiles.hideBrokenTiles = true;
sdk.tiles.preloadImages = true;

const widgetContainer = sdk.placement.getWidgetContainer();
const widgetSettings = getConfig(widgetContainer);
const ugcTiles = sdk.tiles.tiles;
const ugcTilesLength = Object.keys(ugcTiles).length;

const showWidget =
  ugcTiles &&
  ugcTilesLength > widgetSettings.minimal_tiles &&
  widgetContainer.enabled;

if (!showWidget) {
  throw new Error("Widget is not enabled");
}

loadTitle();
loadExpandSettingComponents(widgetSettings);
addAutoAddTileFeature<IWidgetSettings>(widgetSettings);
loadClickThroughFeature(widgetSettings, () => {}, onTileClose);
addTilesPerPageFeature<IWidgetSettings>(widgetSettings);
addLoadMoreButtonFeature();
addCSSVariablesToPlacement(getCSSVariables());

sdk.addEventListener("load", () => initializeMasonry());
sdk.addEventListener("moreLoad", () => loadMoreMasonryTiles());
sdk.addEventListener("tilesUpdated", () => refreshMasonryLayout());

sdk.addCSSToComponent(customExpandedTileCSS, "expanded-tile");
sdk.addCSSToComponent(customProductsCSS, "ugc-products");
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile");
