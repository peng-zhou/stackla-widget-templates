import { loadExpandedTileTemplates } from "@libs/components/expanded-tile-swiper"
import { loadShopspotTemplates } from "./components/shopspot-icon"
import { ISdk } from "@stackla/public-types"

declare const sdk: ISdk

export function loadCustomisation() {
  loadExpandedTileTemplates()
  loadShopspotTemplates()
  sdk.querySelector(".track")?.style.removeProperty("display")
}
