import type { Sdk, Tile } from "@stackla/ugc-widgets"
import { loadExpandSettingComponents } from "./widget.components"
import {
  registerExpandedTileRenderedListener,
  registerTileClickEventListeners,
  registerTileClosedListener,
  registerTileExpandListener
} from "./tile.listeners"
import { BaseConfig } from "../../types/IBaseConfig"
import { isEnabled } from "./widget.layout"
import { useInfiniteScroller } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export const getNextNavigatedTile = (currentTile: Tile, enabledTiles: HTMLElement[], direction: string) => {
  const currentIndex = enabledTiles.findIndex((tile: HTMLElement) => tile.getAttribute("data-id") === currentTile.id)

  if (direction === "previous") {
    const previousTile = getPreviousTile(enabledTiles, currentIndex)

    if (!previousTile) {
      throw new Error("Failed to find previous tile")
    }

    return previousTile.getAttribute("data-id")
  } else if (direction === "next") {
    const nextTile = getNextTile(enabledTiles, currentIndex)

    if (!nextTile) {
      throw new Error("Failed to find next tile")
    }

    return nextTile.getAttribute("data-id")
  }

  return null
}

export const getNextTile = (enabledTiles: HTMLElement[], currentIndex: number) => enabledTiles[currentIndex + 1]
export const getPreviousTile = (enabledTiles: HTMLElement[], currentIndex: number) => enabledTiles[currentIndex - 1]

export const arrowClickListener = (e: Event) => {
  if (!e.target) {
    throw new Error("Failed to find target element for arrow click listener")
  }

  const target = e.target as HTMLElement

  const type = target.classList.contains("tile-arrows-left") ? "previous" : "next"

  const currentTile = sdk.tiles.getTile()

  if (!currentTile) {
    throw new Error("Failed to find current tile")
  }

  const tilesAsHtml = sdk.querySelectorAll(".ugc-tile")

  if (!tilesAsHtml) {
    throw new Error("Failed to find tiles for arrow initialisation")
  }

  const tilesAsHtmlArray = Array.from(tilesAsHtml)

  const tileId = getNextNavigatedTile(currentTile, tilesAsHtmlArray, type)

  const tilesStore: Tile[] = Object.values(sdk.tiles.tiles)

  const tileData = {
    tileData: tilesStore.find(tile => tile.id === tileId),
    widgetId: sdk.placement.getWidgetId(),
    filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId
  }

  sdk.triggerEvent("expandedTileClose")
  sdk.triggerEvent("tileExpand", tileData)
}

export function addAutoAddTileFeature<T extends BaseConfig>(widgetSettings: T) {
  if (widgetSettings.auto_refresh === true) {
    sdk.tiles.enableAutoAddNewTiles()
  }
}

// TODO - Move to ugc-widgets
export function loadWidgetIsEnabled<T extends BaseConfig>(widgetSettings: T) {
  if (isEnabled(widgetSettings)) {
    return true
  }

  const ugcContainer = sdk.querySelector("#nosto-ugc-container")

  if (!ugcContainer) {
    throw new Error("Failed to find Nosto UGC container")
  }

  ugcContainer.style.display = "none"

  throw new Error("Widget is not enabled")
}

export function loadExpandedTileFeature<T extends BaseConfig>(
  widgetSettings: T,
  onTileExpand: (tileId: string) => void = () => {},
  onTileClosed: () => void = () => {},
  onTileRendered: () => void = () => {}
) {
  if (widgetSettings.click_through_url === "[EXPAND]") {
    loadExpandSettingComponents<T>(widgetSettings)
    registerTileExpandListener(onTileExpand)
    registerTileClosedListener(onTileClosed)
    registerExpandedTileRenderedListener(onTileRendered)
  } else if (
    widgetSettings.click_through_url === "[ORIGINAL_URL]" ||
    /^https?:\/\/.+/.test(widgetSettings.click_through_url ?? "")
  ) {
    registerTileClickEventListeners(widgetSettings)
  }
}

function loadMore() {
  if (window.__isLoading) {
    return
  }

  window.__isLoading = true

  const EVENT_LOAD_MORE = "moreLoad"
  const loadMoreButton = sdk.querySelector("#load-more")

  if (!loadMoreButton) {
    throw new Error("Failed to find load more button")
  }

  sdk.triggerEvent(EVENT_LOAD_MORE)

  if (!sdk.tiles.hasMorePages()) {
    loadMoreButton.style.display = "none"
  }

  setTimeout(() => {
    window.__isLoading = false
  }, 500)
}

const getLoadMoreLoader = () => {
  const loadMoreLoader = sdk.querySelector("#load-more-loader")

  if (!loadMoreLoader) {
    throw new Error("Failed to find load more loader")
  }

  return loadMoreLoader
}

const loadMoreWrappedWithEasedLoader = () => {
  const loadMoreLoader = getLoadMoreLoader()
  loadMoreLoader.classList.remove("hidden")
  loadMore()
}

export function addLoadMoreButtonFeature<T extends BaseConfig>(widgetSettings: T) {
  const loadMoreType = widgetSettings.load_more_type

  switch (loadMoreType) {
    case "button":
      attachLoadMoreButtonListener()

      sdk.addEventListener("tilesUpdated", () => {
        const loadMoreLoader = getLoadMoreLoader()
        loadMoreLoader.classList.add("hidden")
      })

      break
    case "scroll":
      disableLoadMoreButtonIfExists()

      sdk.addEventListener("tilesUpdated", () => {
        const loadMoreLoader = getLoadMoreLoader()
        loadMoreLoader.classList.add("hidden")
      })

      useInfiniteScroller(sdk, window, loadMoreWrappedWithEasedLoader)
      break
    case "static":
      disableLoadMoreLoaderIfExists()
      disableLoadMoreButtonIfExists()
      break
    default:
      throw new Error("Invalid load more type")
  }

  if (!sdk.tiles.hasMorePages()) {
    disableLoadMoreButtonIfExists()
    disableLoadMoreLoaderIfExists()
  }
}

export function attachLoadMoreButtonListener() {
  const loadMoreButton = sdk.querySelector("#load-more")

  if (!loadMoreButton) {
    throw new Error("Failed to find load more button")
  }

  loadMoreButton.onclick = loadMoreWrappedWithEasedLoader
}

export function disableLoadMoreButtonIfExists() {
  const loadMoreButton = sdk.querySelector("#load-more")

  if (!loadMoreButton) {
    throw new Error("Failed to find load more button")
  }

  loadMoreButton.style.display = "none"
}

export function disableLoadMoreLoaderIfExists() {
  const loadMoreLoader = sdk.querySelector("#load-more-loader")

  if (!loadMoreLoader) {
    throw new Error("Failed to find load more loader")
  }

  loadMoreLoader.style.display = "none"
}

export function addTilesPerPageFeature<T extends BaseConfig>(widgetSettings: T) {
  if (widgetSettings.enable_custom_tiles_per_page) {
    sdk.tiles.setVisibleTilesCount(widgetSettings.tiles_per_page)
  } else {
    sdk.tiles.setVisibleTilesCount(10 * widgetSettings.rows_per_page)
  }
}

export function loadTitle() {
  const widgetTitle = document.createElement("p")
  const widgetContainer = sdk.placement.getWidgetContainer()
  const title = widgetContainer.title

  if (title) {
    widgetTitle.innerHTML = title
  }
}

export function waitForElm(parent: Element | ShadowRoot, targets: string[], callback: (elements: Element[]) => void) {
  if (targets.every(it => !!parent.querySelector(it))) {
    callback(targets.map(it => parent.querySelector(it)!))
  }

  const observer = new MutationObserver((_, observer) => {
    if (targets.every(it => !!parent.querySelector(it))) {
      observer.disconnect()
      callback(targets.map(it => parent.querySelector(it)!))
    }
  })

  observer.observe(parent, {
    childList: true,
    subtree: true
  })
}

export function waitForMultipleElements(
  parent: Element | ShadowRoot,
  target: string,
  callback: (elements: NodeListOf<HTMLElement>) => void
) {
  const elements = parent.querySelectorAll<HTMLElement>(target)

  if (elements.length > 0) {
    callback(elements)
  }

  const observer = new MutationObserver(() => {
    const newElements = parent.querySelectorAll<HTMLElement>(target)
    if (newElements.length > 0) {
      observer.disconnect()
      callback(newElements)
    }
  })

  observer.observe(parent, {
    childList: true,
    subtree: true
  })
}
