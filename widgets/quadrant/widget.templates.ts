import { loadSwiperStyles } from "@widgets/libs/extensions/swiper"
import { loadExpandedTileTemplates } from "@libs/components/expanded-tile-swiper"
import icons from "../../uikit/icon.scss"
import { Sdk } from "@stackla/ugc-widgets"
import { loadProductsTemplate } from "./components/products"
import { loadShopspotTemplates } from "./components/shopspot-icon"
declare const sdk: Sdk

export function loadCustomisation() {
  loadSwiperStyles()
  loadProductsTemplate()
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])
}
