import { Sdk } from "types"

declare const sdk: Sdk

import { loadWidget } from "@stackla/widget-utils"
import { initializeSwiperForInlineStoryTiles, onTilesUpdated } from "./inline-story-swiper.loader"
import { StoryExpandedTiles } from "./templates/base.template"

// dimensions from Figma design
const tileSizeSettings = {
  small: "50px",
  medium: "100px",
  large: "150px"
}

loadWidget({
  extensions: {
    swiper: true
  },
  features: {
    handleLoadMore: false,
    tileSizeSettings,
    cssVariables: {
      "--navigation-arrow-display": sdk.isPaginationEnabled() ? "flex" : "none"
    }
  },
  callbacks: {
    onLoad: [initializeSwiperForInlineStoryTiles],
    onTilesUpdated: [onTilesUpdated]
  },
  templates: {
    "expanded-tiles": {
      template: StoryExpandedTiles
    }
  }
})

sdk.querySelector(".track")?.style.removeProperty("display")
