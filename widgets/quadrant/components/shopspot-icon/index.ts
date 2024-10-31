import { ISdk } from "@stackla/public-types"
import shopspotStyle from "./base.scss"

declare const sdk: ISdk

export function loadShopspotTemplates() {
  sdk.addSharedCssCustomStyles("shopspot-icon", shopspotStyle, [sdk.placement.getWidgetId(), "expanded-tiles"])
}
