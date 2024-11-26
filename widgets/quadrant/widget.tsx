import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "../styles/templates/shopspot-icon/styles.scss"
import tagsStyles from "../styles/templates/tags/tags.scss"

loadWidget({
  extensions: {},
  features: {
    preloadImages: false,
    hideBrokenImages: true
  },
  callbacks: {},
  templates: {
    "expanded-tiles": {
      styles: [
        {
          css: shopspotStyle,
          global: true
        }
      ]
    },
    "tile-tags": {
      styles: [
        {
          css: tagsStyles,
          global: false
        }
      ]
    }
  }
})
loadAllUnloadedTiles()
