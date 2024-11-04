import { loadExpandedTileTemplates } from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper"
import { loadShopspotTemplates } from "./components/shopspot-icon"

export function loadCustomisation() {
  loadExpandedTileTemplates()
  loadShopspotTemplates()
}
