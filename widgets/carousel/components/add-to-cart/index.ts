import { Sdk } from "@stackla/ugc-widgets"
import addToCartStyle from "./base.scss"

declare const sdk: Sdk

export function loadAddToCartTemplates() {
  sdk.addCSSToComponent(addToCartStyle, "add-to-cart")
}
