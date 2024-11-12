import loadSlider from "./load-slider"
import { loadWidget } from "@stackla/widget-utils"
import userContentStyles from "./components/tile-content/overrides.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"

loadWidget({
  extensions: {},
  features: {
    handleLoadMore: false,
    addNewTilesAutomatically: true
  },
  callbacks: {
    onLoad: [loadSlider]
  },
  templates: {
    "tile-content": {
      style: {
        css: userContentStyles,
        global: false
      }
    },
    "expanded-tiles": {
      style: {
        css: shopspotStyle,
        global: true
      }
    }
  }
})
