import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "./components/shopspot-icon/base.scss"

loadWidget({
  type: "masonry",
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
