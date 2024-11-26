import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "../styles/templates/shopspot-icon/styles.scss"
import tagsStyles from "../styles/templates/tags/tags.scss"
import shareMenuStyles from "../styles/templates/share-menu/share-menu.scss"

loadWidget({
  extensions: {},
  features: {},
  callbacks: {
    // oliver todo
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
    "tile-tags": {
      styles: [
        {
          css: tagsStyles,
          global: false
        }
      ]
    },
    "share-menu": {
      styles: [
        {
          css: shareMenuStyles,
          global: false
        }
      ]
    }
  }
})
loadAllUnloadedTiles()
