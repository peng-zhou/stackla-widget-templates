import type { Sdk } from "@stackla/types";
import { getConfig } from "./widget.config";
import { loadComponents } from "./widget.components";
import {
  addAutoAddTileFeature,
  addTilesPerPageFeature,
  loadClickThroughFeature,
} from "./widget.features";
import { registerLoadListener } from "./widget.listeners";
import { expandedTileTemplate } from "./components/expanded-tile/base.template";
import expandedTileStyle from "./components/expanded-tile/base.css";
import productsStyle from "./components/products/base.css";
import { addCSSVariablesToPlacement, loadTitle } from "./widget.layout";

declare const sdk: Sdk;
sdk.tiles.preloadImages = true;
sdk.tiles.setLoadMode("page");

const widgetContainer = sdk.placement.getWidgetContainer();
const widgetSettings = getConfig(widgetContainer);

if (!widgetSettings.enabled) {
  throw new Error("Widget is not enabled");
}

addCSSVariablesToPlacement();
loadTitle();
loadComponents();
addAutoAddTileFeature();
addTilesPerPageFeature();
registerLoadListener();
loadClickThroughFeature();

sdk.addCSSToComponent(expandedTileStyle, "expanded-tile");
sdk.addCSSToComponent(productsStyle, "ugc-products");
sdk.addTemplateToComponent(expandedTileTemplate, "expanded-tile");
