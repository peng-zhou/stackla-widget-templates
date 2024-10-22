import { Sdk } from "@stackla/ugc-widgets"
import swiperFont from "./swiper-font.scss"
import swiperCommon from "./swiper-common.scss"
import swiperBundleCss from "swiper/swiper-bundle.css"
import swiperExpandedTile from "./expanded-tile.scss"

declare const sdk: Sdk

export function loadSwiperStyles() {
  // some of the css styles are inherited across the shadow DOM components
  // https://www.w3.org/TR/CSS22/propidx.html#q0
  // Injects @font-face into placement head
  sdk.addWidgetCustomStyles(swiperFont)

  // Swiper specific styles to be available for both carousel and expanded tile
  sdk.addSharedCssCustomStyles("swiper-bundle", swiperBundleCss, [
    sdk.placement.getWidgetId(),
    "expanded-tiles",
    "ugc-products"
  ])
  sdk.addSharedCssCustomStyles("swiper-overrides", swiperCommon, [sdk.placement.getWidgetId(), "expanded-tiles"])
  sdk.addSharedCssCustomStyles("swiper-expanded-tile", swiperExpandedTile, [
    sdk.placement.getWidgetId(),
    "expanded-tiles"
  ])
}
