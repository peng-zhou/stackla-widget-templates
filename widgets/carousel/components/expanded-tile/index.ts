import { ExpandedTiles } from "./base.template"
import expandedTileStyle from "./base.scss"
import swiperExpandedStyles from "./swiper-expanded-tile.scss"
import tileTagStyles from "@libs/templates/tags/tags.scss"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function loadExpandedTileTemplates() {
  sdk.addCSSToComponent(expandedTileStyle, "expanded-tiles")
  sdk.addCSSToComponent(swiperExpandedStyles, "expanded-tiles")
  sdk.addCSSToComponent(tileTagStyles, "expanded-tiles")
  sdk.addTemplateToComponent(ExpandedTiles, "expanded-tiles")
}
