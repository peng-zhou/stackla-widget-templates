import {
  addAutoAddTileFeature,
  loadExpandedTileFeature,
  loadTitle
} from "@stackla/widget-utils/dist/libs/widget.features"
import { addCSSVariablesToPlacement, type ISdk } from "@stackla/widget-utils"
import expandedTileCSS from "./components/expanded-tile/base.scss"
import productsCSS from "./components/products/base.scss"
import customExpandedTileTemplate from "./components/expanded-tile/base.template"
import getCSSVariables from "@stackla/widget-utils/dist/libs/css-variables"

declare const sdk: ISdk

sdk.tiles.hideBrokenTiles = true
sdk.tiles.preloadImages = true
sdk.tiles.setVisibleTilesCount(100)

const widgetContainer = sdk.placement.getWidgetContainer()

const showWidget = widgetContainer.enabled
if (!showWidget) {
  throw new Error("Widget is not enabled")
}
loadTitle()
addCSSVariablesToPlacement(getCSSVariables())
addAutoAddTileFeature()
loadExpandedTileFeature(() => {
  const ugcTilesElement = sdk.querySelector(".ugc-tiles")

  if (!ugcTilesElement) {
    throw new Error("Failed to find arrows UI element")
  }

  ugcTilesElement.style.display = "none"
})

sdk.addEventListener("load", () => {
  const sliderScrollUpButton = sdk.querySelector("#scrollUp")
  const sliderScrollDownButton = sdk.querySelector("#scrollDown")
  const tileBlockElement = sdk.querySelector(".ugc-tile-wrapper")
  const tilesContainer = sdk.querySelector(".ugc-tiles")

  if (!tileBlockElement) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  if (!tilesContainer) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  if (!sliderScrollUpButton) {
    throw new Error("Slider Tiles Scroll Up Button not found")
  }

  if (!sliderScrollDownButton) {
    throw new Error("Slider Tiles Scroll Down Button not found")
  }

  const blockHeight = tileBlockElement.offsetHeight ?? 220

  sliderScrollUpButton.addEventListener("click", () => {
    tilesContainer.scrollBy({
      top: -blockHeight,
      behavior: "smooth"
    })
  })

  sliderScrollDownButton.addEventListener("click", () => {
    tilesContainer.scrollBy({
      top: blockHeight,
      behavior: "smooth"
    })
  })
})
sdk.addCSSToComponent(expandedTileCSS, "expanded-tile")
sdk.addCSSToComponent(productsCSS, "ugc-products")
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile")
