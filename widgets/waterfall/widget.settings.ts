import { Sdk } from "@stackla/ugc-widgets"
import { loadWidget } from "@stackla/widget-utils"
import {
  refreshWaterfallLayout,
  reinitialiseWaterfallLayout,
  resizeAllUgcTilesHeight
} from "@widgets/libs/extensions/waterfall.extension"

declare const sdk: Sdk

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

  const minmax: [number, number] = [260, 450]

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
