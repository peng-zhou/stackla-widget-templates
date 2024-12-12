import { loadSlider } from "./load-slider"
import { loadWidget } from "@stackla/widget-utils"
import { markColumnsForIndent } from "./slider-design"
import { gridAlignmentObserver, tilesIntersectionObserver } from "./observers"

// dimensions from Figma design
const tileSizeSettings = {
  small: "148.34px",
  medium: "225px",
  large: "435px"
}

const observers = {
  alignmentObserver: gridAlignmentObserver(tileSizeSettings),
  tilesIntersectionObserver: tilesIntersectionObserver()
}

loadWidget({
  features: {
    handleLoadMore: false,
    addNewTilesAutomatically: true,
    tileSizeSettings
  },
  callbacks: {
    onLoad: [
      () => {
        setTimeout(() => loadSlider(tileSizeSettings, observers), 500)
      }
    ],
    onTilesUpdated: [
      () => {
        markColumnsForIndent(tileSizeSettings)
        observers.tilesIntersectionObserver.updateObserver()
      }
    ]
  }
})
