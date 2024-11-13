import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import { reinitialiseWaterfallLayout, loadWaterfallLayout } from "./waterfall.lib"

const settings = {
  extensions: {},
  features: {},
  callbacks: {
    onMoreLoad: [() => loadWaterfallLayout()],
    onTilesUpdated: [() => loadWaterfallLayout()],
    resize: [() => reinitialiseWaterfallLayout()]
  },
  templates: {
    "expanded-tiles": {
      styles: [
        {
          css: shopspotStyle,
          global: true
        }
      ]
    }
  }
}

loadWidget(settings)
loadWaterfallLayout()
loadAllUnloadedTiles()
