import { ExpandedTiles } from "./base.template"
import expandedTileStyle from "../../styles/components/expanded-tile-swiper/base.scss"
import swiperExpandedStyles from "../../styles/components/expanded-tile-swiper/swiper-expanded.scss"
import tileTagStyles from "../../styles/templates/tags/tags.scss"
import shareMenuStyle from "../../styles/templates/share-menu/share-menu.scss"
import addToCartStyleOverrides from "../../styles/components/expanded-tile-swiper/add-to-cart.scss"
import productStyleOverrides from "../../styles/components/expanded-tile-swiper/products.scss"
import icons from "../../styles/uikit/icon.scss"
import { loadSwiperStyles } from "@stackla/widget-utils/extensions"
import { ISdk } from "@stackla/widget-utils"

declare const sdk: ISdk

export function loadExpandedTileTemplates() {
  sdk.addCSSToComponent(expandedTileStyle, "expanded-tiles")
  sdk.addCSSToComponent(shareMenuStyle, "expanded-tiles")
  sdk.addCSSToComponent(swiperExpandedStyles, "expanded-tiles")
  sdk.addCSSToComponent(tileTagStyles, "expanded-tiles")
  sdk.addTemplateToComponent(ExpandedTiles, "expanded-tiles")
  sdk.addCSSToComponent(addToCartStyleOverrides, "add-to-cart")
  sdk.addWidgetCustomStyles(` 
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  body {
    font-family: 'Inter', sans-serif;
  }`)
  sdk.addCSSToComponent(productStyleOverrides, "ugc-products")
  sdk.addSharedCssCustomStyles("icons", icons, [sdk.placement.getWidgetId(), "expanded-tiles"])

  loadSwiperStyles()
}
