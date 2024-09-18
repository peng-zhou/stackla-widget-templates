import { loadExpandedTileTemplates } from "./components/expanded-tile"
import { loadProductsTemplate } from "./components/products"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import { loadSwiperStyles } from "@libs/extensions/swiper"
import icons from "../../uikit/icon.scss"
import swiperInlineTileOverrides from "./swiper-inline-tile.scss"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function loadCustomisation() {
  loadSwiperStyles()
  sdk.addSharedCssCustomStyles("swiper-inline-overrides", swiperInlineTileOverrides, [sdk.placement.getWidgetId()])
  loadProductsTemplate()
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])
}
