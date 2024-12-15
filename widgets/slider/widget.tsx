import { loadSlider } from "./load-slider"
import { loadWidget } from "@stackla/widget-utils"

// dimensions from Figma design
const tileSizeSettings = {
  small: "148.34px",
  medium: "225px",
  large: "435px"
}

let sliderCallbacks: ReturnType<typeof loadSlider>

loadWidget({
  features: {
    handleLoadMore: false,
    addNewTilesAutomatically: true,
    tileSizeSettings
  },
  callbacks: {
    onLoad: [
      () =>
        void setTimeout(() => {
          sliderCallbacks = loadSlider(tileSizeSettings)
        }, 500)
    ],
    onTilesUpdated: [() => sliderCallbacks?.tilesUpdatedEventHandler()]
  }
})
