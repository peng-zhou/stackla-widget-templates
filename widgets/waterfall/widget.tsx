import { loadWidget } from "@stackla/widget-utils"
import { loadWaterfallLayout, updateTagListMask } from "./waterfall.lib"

loadWidget({
  callbacks: {
    onLoadMore: [() => loadWaterfallLayout()],
    onTilesUpdated: [() => loadWaterfallLayout()],
    onResize: [() => loadWaterfallLayout()]
  },
  templates: {},
  features: {},
  extensions: {}
})
loadWaterfallLayout()
updateTagListMask()
