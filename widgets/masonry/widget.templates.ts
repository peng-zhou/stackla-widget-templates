import { loadExpandedTileTemplates } from "@libs/components/expanded-tile-swiper"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import { Sdk } from "@stackla/ugc-widgets"
declare const sdk: Sdk

export function loadCustomisation() {
  loadExpandedTileTemplates()
  loadShopspotTemplates()
}
