import { loadExpandedTileTemplates } from "./components/expanded-tile"
import { loadProductsTemplate } from "./components/products"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import { loadSwiperStyles } from "@libs/extensions/swiper"
import { loadAddToCartTemplates } from "./components/add-to-cart"
import icons from "../../uikit/icon.scss"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function loadCustomisation() {
  sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])
  loadSwiperStyles()
  loadProductsTemplate()
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  loadAddToCartTemplates()
}
