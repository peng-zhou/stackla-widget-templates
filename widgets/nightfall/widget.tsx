import { loadWidget, Sdk } from "@stackla/widget-utils"
import { loadWaterfallLayout } from "./waterfall.lib"
import ProductsTemplate from "./products.template"

declare const sdk: Sdk

loadWidget({
  callbacks: {
    onLoadMore: [() => loadWaterfallLayout()],
    onTilesUpdated: [() => loadWaterfallLayout()],
    onResize: [() => loadWaterfallLayout()],
    onLoad: [() => loadWaterfallLayout()]
  },
  templates: {
    "ugc-products": {
      template: ProductsTemplate
    }
  },
  features: {
    cssVariables: {
      "--tile-share-content-display-inline":
        sdk.getInlineTileConfig().show_sharing || sdk.getInlineTileConfig().show_timestamp ? "flex" : "none"
    }
  },
  extensions: {}
})

loadWaterfallLayout()
