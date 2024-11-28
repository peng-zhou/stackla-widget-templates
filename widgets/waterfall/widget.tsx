import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"
import { reinitialiseWaterfallLayout, loadWaterfallLayout } from "./waterfall.lib"

loadWidget({
  callbacks: {
    onLoadMore: [() => reinitialiseWaterfallLayout()],
    onTilesUpdated: [() => reinitialiseWaterfallLayout()],
    onResize: [() => reinitialiseWaterfallLayout()]
  }
})
loadWaterfallLayout()
loadAllUnloadedTiles()
