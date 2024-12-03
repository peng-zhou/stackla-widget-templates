import { loadWidget } from "@stackla/widget-utils"
import { loadWaterfallLayout, initializeTagSlider } from "./waterfall.lib"

loadWidget({
  callbacks: {
    onLoadMore: [() => loadWaterfallLayout()],
    onTilesUpdated: [
      () => {
        loadWaterfallLayout()
        initializeTagSlider
      }
    ],
    onResize: [() => loadWaterfallLayout()]
  },
  templates: {},
  features: {},
  extensions: {}
})
loadWaterfallLayout()
initializeTagSlider()
