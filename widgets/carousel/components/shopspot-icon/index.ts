import { Sdk } from "@stackla/ugc-widgets"
import shopspotStyle from "./base.scss"

declare const sdk: Sdk

export function loadShopspotTemplates() {
  sdk.addSharedCssCustomStyles(shopspotStyle)
}
