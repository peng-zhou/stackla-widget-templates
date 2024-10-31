import { ISdk } from "@stackla/public-types"
import productsStyle from "./base.scss"

declare const sdk: ISdk

export function loadProductsTemplate() {
  sdk.addCSSToComponent(productsStyle, "ugc-products")
}
