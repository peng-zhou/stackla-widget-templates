import { loadAllUnloadedTiles } from "@stackla/widget-utils/extensions/swiper"
import { loadWidget } from "@stackla/widget-utils"

loadWidget({
  type: "grid",
  extensions: {},
  features: {},
  callbacks: {},
  templates: {}
})
loadAllUnloadedTiles()
