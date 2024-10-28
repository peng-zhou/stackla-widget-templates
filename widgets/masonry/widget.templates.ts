import { loadExpandedTileTemplates } from "@libs/components/expanded-tile-swiper"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import "@libs/components/load-more"

export function loadCustomisation() {
  loadExpandedTileTemplates()
  loadShopspotTemplates()
}
