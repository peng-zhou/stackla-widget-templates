import { getConfig } from "./widget.config"
import { addAutoAddTileFeature, loadTitle } from "widgets/libs/widget.features"
import { Sdk } from "@stackla/ugc-widgets"
import { addCSSVariablesToPlacement } from "widgets/libs/widget.layout"
import productsCSS from "./components/products/base.scss"
import getCSSVariables from "@widgets/libs/css-variables"
import icons from "../../uikit/icon.scss"
import { loadExpandedTileTemplates } from "@libs/components/expanded-tile-swiper"

declare const sdk: Sdk

sdk.tiles.hideBrokenTiles = true
sdk.tiles.preloadImages = true
sdk.tiles.setVisibleTilesCount(100)

const widgetContainer = sdk.placement.getWidgetContainer()
const widgetSettings = getConfig(widgetContainer)

const showWidget = widgetContainer.enabled
if (!showWidget) {
  throw new Error("Widget is not enabled")
}
loadTitle()
addCSSVariablesToPlacement(getCSSVariables(widgetSettings))
addAutoAddTileFeature(widgetSettings)
loadExpandedTileTemplates()

sdk.addEventListener("load", () => setTimeout(initListeners, 1000))

function initListeners() {
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

  const blockHeight = (tileBlockElement.offsetHeight ?? 220) + 20

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
}

sdk.addCSSToComponent(productsCSS, "ugc-products")
sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])
