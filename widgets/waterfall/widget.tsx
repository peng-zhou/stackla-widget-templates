import { loadAllUnloadedTiles } from "@stackla/widget-utils/dist/libs/extensions/swiper/loader.extension"
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
      style: {
        css: shopspotStyle,
        global: true
      }
    }
  }
}

loadWidget(settings)
loadWaterfallLayout()
loadAllUnloadedTiles()
