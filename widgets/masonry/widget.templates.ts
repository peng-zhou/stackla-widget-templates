import { loadExpandedTileTemplates } from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import "@stackla/widget-utils/dist/libs/components/load-more"

export function loadCustomisation() {
  loadExpandedTileTemplates()
  loadShopspotTemplates()
}
