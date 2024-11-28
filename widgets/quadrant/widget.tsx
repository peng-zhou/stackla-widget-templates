import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"
import { getQuadrantTiles } from "./quadrant.lib"

loadWidget({
  type: "quadrant",
  extensions: {},
  features: {
    preloadImages: false,
    hideBrokenImages: true
  },
  callbacks: {},
  templates: {}
})

loadAllUnloadedTiles()
getQuadrantTiles()
