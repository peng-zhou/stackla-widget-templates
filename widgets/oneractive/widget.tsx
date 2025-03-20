import { ExpandedTiles } from "./expanded-tile.template"
import { Sdk } from "types"
import { config } from "./config"

declare const sdk: Sdk

import { loadWidget } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-carousel-swiper.loader"
import { EVENT_EXPANDED_TILE_CLOSE } from "@stackla/widget-utils"

loadWidget({
  config: {
    ...config
  },
  extensions: {
    swiper: true
  },
  features: {
    handleLoadMore: false
  },
  templates: {
    "expanded-tiles": {
      template: ExpandedTiles
    }
  }
})

sdk.querySelector(".track")?.style.removeProperty("display")

// Add oneractive header
const oneractiveHeaderContainer = sdk.querySelector("#nosto-ugc-container")
const oneractiveHeader = document.createElement("div")
oneractiveHeader.className = "oneractive-header"
const oneractiveHeaderTemplate = `
    <h2 class="oneractive-title">Be Active. Be Social.</h2>
    <p class="oneractive-subline center">Follow @oneractive on Instagram</p>
`

oneractiveHeader.innerHTML = oneractiveHeaderTemplate

oneractiveHeaderContainer?.parentNode?.insertBefore(oneractiveHeader, oneractiveHeaderContainer)

const dialog = sdk.querySelector("#overlay-expanded-tiles")
dialog.addEventListener("click", event => {
  if (dialog === event.target) {
    sdk.triggerEvent(EVENT_EXPANDED_TILE_CLOSE)
  }
})

initializeInlineSwiperListeners()
