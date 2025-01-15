import { loadWidget } from "@stackla/widget-utils"
import { getQuadrantTiles, getTileRowHeight } from "./quadrant.lib"

loadWidget({
  features: {
    preloadImages: false,
    hideBrokenImages: true,
    addNewTilesAutomatically: false,
    tileSizeSettings: {
      small: "1fr 1fr 1fr",
      medium: "1fr 1fr",
      large: "1fr"
    },
    cssVariables: {
      "--tile-size-column-height": getTileRowHeight()
    }
  }
})

getQuadrantTiles()
