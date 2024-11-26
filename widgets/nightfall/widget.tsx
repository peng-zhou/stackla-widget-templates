import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "../styles/templates/shopspot-icon/styles.scss"

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
    }
  }
})
loadAllUnloadedTiles()
