import { loadWidget, Sdk } from "@stackla/widget-utils"
import { loadWaterfallLayout } from "./waterfall.lib"

declare const sdk: Sdk

loadWidget({
  callbacks: {
    onLoadMore: [() => loadWaterfallLayout()],
    onTilesUpdated: [() => loadWaterfallLayout()],
    onResize: [() => loadWaterfallLayout()],
    onLoad: [() => loadWaterfallLayout()]
  },
  templates: {},
  features: {
    cssVariables: {
      "--tile-share-content-display-inline":
        sdk.getInlineTileConfig().show_sharing || sdk.getInlineTileConfig().show_timestamp ? "flex" : "none"
    }
  },
  extensions: {}
})

loadWaterfallLayout()
