import { ExpandedTiles } from "./expanded-tile.template"
import { Sdk } from "types"
import { config } from "./config"

declare const sdk: Sdk

import { loadWidget } from "@stackla/widget-utils"
import { initializeInlineSwiperListeners } from "./inline-carousel-swiper.loader"

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

sdk.addEventListener("click", event => {
  const dialogEl = sdk.querySelector("#overlay-expanded-tiles")
  const dialog = sdk.querySelector(".expanded-tile-overlay")

  console.log("dialog", dialog)
  console.log("dialogEl", dialogEl)
  console.log("click event", event)
  console.log("click target", event.target)

  if (dialog.classList.contains(".expanded-tile-overlay") && !dialog.contains(event.target as Node)) {
    dialog.style.display = "none"
  }
})

initializeInlineSwiperListeners()
