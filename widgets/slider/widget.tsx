import loadSlider from "./load-slider"
import { loadWidget } from "@stackla/widget-utils"
import userContentStyles from "./components/tile-content/overrides.scss"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import timephraseStyles from "@styles/templates/time-phrase/styles.scss"

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
    "expanded-tiles": {
      styles: [
        {
          css: shopspotStyle,
          global: true
        }
      ]
    },
    "tile-content": {
      styles: [
        {
          css: userContentStyles,
          global: false
        }
      ]
    },
    "time-phrase": {
      styles: [
        {
          css: timephraseStyles,
          global: false
        }
      ]
    }
  }
})
