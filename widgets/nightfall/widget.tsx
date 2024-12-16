import { loadWidget } from "@stackla/widget-utils"
import { loadWaterfallLayout } from "./waterfall.lib"
import ProductsTemplate from "./products.template"

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
  features: {},
  extensions: {}
})

loadWaterfallLayout()
