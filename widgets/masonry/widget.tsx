import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "../styles/templates/shopspot-icon/styles.scss"

loadWidget({
  extensions: {
    masonry: true
  },
  features: {},
  callbacks: {},
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
