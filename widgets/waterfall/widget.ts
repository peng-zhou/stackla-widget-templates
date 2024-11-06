import { loadAllUnloadedTiles } from "@stackla/widget-utils/dist/libs/extensions/swiper/loader.extension"
import { ISdk, loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import { refreshWaterfallLayout, reinitialiseWaterfallLayout, resizeAllUgcTilesHeight } from "./waterfall.lib"

declare const sdk: ISdk

const { inline_tile_size } = sdk.getStyleConfig()
const minmax: [number, number] =
  inline_tile_size === "small" ? [200, 340] : inline_tile_size === "large" ? [350, 700] : [260, 450]

const settings = {
  extensions: {},
  features: {},
  callbacks: {
    onMoreLoad: [() => refreshWaterfallLayout(minmax)],
    onTilesUpdated: [() => refreshWaterfallLayout(minmax)],
    resize: [() => reinitialiseWaterfallLayout(minmax)]
  },
  templates: {
    "expanded-tiles": {
      style: {
        css: shopspotStyle,
        global: true
      }
    }
  }
}

loadWidget(settings)
resizeAllUgcTilesHeight(minmax)
loadAllUnloadedTiles()
