import type { Sdk } from "@stackla/ugc-widgets"
import { handleTileClick } from "./tile.lib"
import { BaseConfig } from "../../types/IBaseConfig"

declare const sdk: Sdk

export function registerTileClickEventListeners<T extends BaseConfig>(widgetSettings: T) {
  const urlPattern = /^https?:\/\/.+/

  const tiles = sdk.querySelectorAll(".ugc-tile")

  if (!tiles) {
    throw new Error("Failed to find tiles UI element")
  }

  tiles.forEach((tile: HTMLElement) => {
    const url = widgetSettings.click_through_url ?? ""
    const urlIsValid = urlPattern.test(url)

    if (urlIsValid) {
      tile.onclick = e => {
        handleTileClick(e, url)
      }
    }
  })
}

export function registerTileExpandListener(fn: () => void = () => {}) {
  sdk.addEventListener("tileExpand", fn)
}

export function registerTileClosedListener(fn: () => void = () => {}) {
  sdk.addEventListener("expandedTileClose", fn)
}

export function registerLoadListener(fn: () => void) {
  sdk.addEventListener("load", fn)
}

export function registerTilesUpdated(fn: () => void) {
  sdk.placement.events.addUgcEventListener("tilesUpdated", () => setTimeout(fn, 500))
}

export function registerPreloadTileHidden(fn: (id: string) => void) {
  sdk.placement.events.addUgcEventListener("preloadTileHidden", async event => {
    const tileId = (event as CustomEvent).detail.data.id
    fn(tileId)
  })
}
