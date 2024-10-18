import { loadExpandedTileTemplates } from "@libs/components/expanded-tile-swiper"
import { loadProductsTemplate } from "./components/products"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import { loadSwiperStyles } from "@libs/extensions/swiper"
import icons from "../../uikit/icon.scss"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function loadCustomisation() {
  sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])
  loadSwiperStyles()
  loadProductsTemplate()
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  sdk.querySelector(".track")?.style.removeProperty("display")
}
