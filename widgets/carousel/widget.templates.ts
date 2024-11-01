import { loadExpandedTileTemplates } from "@stackla/widget-utils/dist/libs/components/expanded-tile-swiper"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import type { ISdk } from "@stackla/widget-utils"

declare const sdk: ISdk

export function loadCustomisation() {
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  sdk.querySelector(".track")?.style.removeProperty("display")
}
