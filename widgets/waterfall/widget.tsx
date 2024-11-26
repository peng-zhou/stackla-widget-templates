import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"
import { reinitialiseWaterfallLayout, loadWaterfallLayout } from "./waterfall.lib"
import tileTagStyles from "../styles/templates/tags/tags.scss"

loadWidget({
  extensions: {},
  features: {},
  callbacks: {
    onLoadMore: [() => loadWaterfallLayout()],
    onTilesUpdated: [() => loadWaterfallLayout()],
    onResize: [() => reinitialiseWaterfallLayout()]
  },
  templates: {
    "expanded-tiles": {
      styles: [
        {
          css: tileTagStyles,
          global: false
        }
      ]
    }
  }
})
loadWaterfallLayout()
loadAllUnloadedTiles()
