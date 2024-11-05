import { loadAllUnloadedTiles } from "@stackla/widget-utils/dist/libs/extensions/swiper/loader.extension"
import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "./components/shopspot-icon/base.scss"

const settings = {
  extensions: {},
  features: {
    handleLoadMore: false
  },
  callbacks: {},
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
loadAllUnloadedTiles()
