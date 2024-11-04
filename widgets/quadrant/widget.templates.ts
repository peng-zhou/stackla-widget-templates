import { loadSwiperStyles } from "@stackla/widget-utils/dist/libs/extensions/swiper"
import { loadExpandedTileTemplates } from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper"
import { loadProductsTemplate } from "./components/products"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import icons from "../../uikit/icon.scss"
import type { ISdk } from "@stackla/widget-utils"
declare const sdk: ISdk

export function loadCustomisation() {
  loadSwiperStyles()
  loadProductsTemplate()
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])
}
