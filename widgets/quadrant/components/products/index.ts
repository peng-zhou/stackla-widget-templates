import type { ISdk } from "@stackla/widget-utils"
import productsStyle from "./base.scss"

declare const sdk: ISdk

export function loadProductsTemplate() {
  sdk.addCSSToComponent(productsStyle, "ugc-products")
}
