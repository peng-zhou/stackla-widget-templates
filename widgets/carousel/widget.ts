import type { Sdk } from "@stackla/types";
import { getConfig } from "./widget.config";
import { expandedTileTemplate } from "./components/expanded-tile/base.template";
import expandedTileStyle from "./components/expanded-tile/base.scss";
import productsStyle from "./components/products/base.scss";
import { hideGlideArrows, initializeGlideListeners } from "./widget.extensions";
import { registerLoadListener } from "widgets/libs/tile.listeners";
import {
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  loadTitle,
} from "widgets/libs/tile.features";
import getCSSVariables from "./css.variables";
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout";
import { IWidgetSettings } from "types/IWidgetSettings";

declare const sdk: Sdk;
sdk.tiles.preloadImages = true;
sdk.tiles.setLoadMode("page");
sdk.tiles.setVisibleTilesCount(100);

const widgetContainer = sdk.placement.getWidgetContainer();
const widgetSettings = getConfig(widgetContainer);

if (!widgetSettings.enabled) {
  throw new Error("Widget is not enabled");
}

// Add CSS variables to placement
addCSSVariablesToPlacement(getCSSVariables());

// Load features
loadTitle();

// Load listeners
registerLoadListener(() => initializeGlideListeners());

// Add features
addAutoAddTileFeature<IWidgetSettings>(widgetSettings);
loadExpandedTileFeature<IWidgetSettings>(widgetSettings, () =>
  hideGlideArrows(),
);

// Add styles and templates to components
sdk.addCSSToComponent(expandedTileStyle, "expanded-tile");
sdk.addCSSToComponent(productsStyle, "ugc-products");
sdk.addTemplateToComponent(expandedTileTemplate, "expanded-tile");
