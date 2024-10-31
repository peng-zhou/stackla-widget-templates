import { loadSwiperStyles } from "@widgets/libs/extensions/swiper"
import { loadExpandedTileTemplates } from "@libs/components/expanded-tile-swiper"
import { loadProductsTemplate } from "./components/products"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import icons from "../../uikit/icon.scss"
import { ISdk } from "@stackla/public-types"
declare const sdk: ISdk

export function loadCustomisation() {
  loadSwiperStyles()
  loadProductsTemplate()
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])
}
