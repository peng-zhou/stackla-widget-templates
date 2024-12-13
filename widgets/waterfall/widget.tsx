import { loadWidget } from "@stackla/widget-utils"
import { loadWaterfallLayout } from "./waterfall.lib"

loadWidget({
  callbacks: {
    onLoadMore: [() => loadWaterfallLayout()],
    onTilesUpdated: [() => loadWaterfallLayout()],
    onResize: [() => loadWaterfallLayout()],
    onLoad: [() => loadWaterfallLayout()]
  },
  templates: {},
  features: {},
  extensions: {}
})

loadWaterfallLayout()
