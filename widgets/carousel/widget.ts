import { loadCustomisation } from "./widget.templates"
import { loadSettings } from "./widget.settings"
import swiperFont from "../libs/extensions/swiper/swiper-font.scss"
import swiperCommon from "../libs/extensions/swiper/swiper-common.scss"
import swiperBundleCss from "@swiper/swiper-bundle.css"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk
loadSettings()
loadCustomisation()

// some of the css styles are inherited across the shadow DOM components
// https://www.w3.org/TR/CSS22/propidx.html#q0
// Injects @font-face into placement head
sdk.addWidgetCustomStyles(swiperFont)

// Swiper specific styles to be available for both carousel and expanded tile
sdk.addSharedCssCustomStyles(swiperBundleCss)
sdk.addSharedCssCustomStyles(swiperCommon)
