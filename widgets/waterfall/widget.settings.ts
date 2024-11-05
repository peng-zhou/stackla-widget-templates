import { ISdk, loadWidget } from "@stackla/widget-utils"
import {
  refreshWaterfallLayout,
  reinitialiseWaterfallLayout,
  resizeAllUgcTilesHeight
} from "@widgets/libs/extensions/waterfall.extension"

declare const sdk: ISdk

export function getSettings() {
  return {
    extensions: {},
    features: {},
    callbacks: {}
  }
}

export async function loadSettings() {
  const settings = getSettings()
  loadWidget(settings)
  const { inline_tile_size } = sdk.getStyleConfig()

  const minmax: [number, number] =
    inline_tile_size === "small" ? [70, 340] : inline_tile_size === "large" ? [350, 700] : [260, 450] //TODO: recheck values with the design team

  await resizeAllUgcTilesHeight(minmax)
  sdk.addEventListener("moreLoad", async () => {
    await refreshWaterfallLayout(minmax, true)
  })
  sdk.addEventListener("tilesUpdated", async () => {
    await refreshWaterfallLayout(minmax, true)
  })
  window.addEventListener("resize", async () => {
    await reinitialiseWaterfallLayout(minmax)
  })
}
