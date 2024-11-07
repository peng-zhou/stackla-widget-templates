import loadSlider from "./load-slider"
import { loadWidget } from "@stackla/widget-utils"
import userContentStyles from "./components/user-content/overrides.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"

loadWidget({
  extensions: {},
  features: {
    handleLoadMore: false
  },
  callbacks: {
    onLoad: [loadSlider]
  },
  templates: {
    "user-content": {
      style: {
        css: userContentStyles,
        global: true
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
