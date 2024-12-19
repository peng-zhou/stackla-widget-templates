import { Features } from "packages/widget-utils"
import { getRenderMode, getSliderElement, getTileContainerElement, getTileElements } from "./utils"
import { markColumnsForIndent } from "./slider-design"

type SliderObserverProps = {
  settings: Features["tileSizeSettings"]
  resizeCb?: () => void
  intersectionCb?: () => void
}

export function initObservers({ settings, resizeCb, intersectionCb }: SliderObserverProps) {
  const animationClasses = { up: "tile-animate-up", down: "tile-animate-down" }
  const partiallyVisibleClass = "partially-visible"
  const tilesContainerElement = getTileContainerElement()
  let previousPosition = tilesContainerElement.scrollTop
  let latestEntries: IntersectionObserverEntry[] = []

  const resizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(() => {
      markColumnsForIndent(settings)
      resizeCb?.()
    })
  )

  const tilesIntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const htmlElement = entry.target as HTMLElement
        enableAnimation(htmlElement)
        if (entry.isIntersecting) {
          if (entry.target.classList.contains(partiallyVisibleClass)) {
            if (entry.intersectionRatio === 1) {
              entry.target.classList.remove(partiallyVisibleClass)
              return
            }
          }
        }

        latestEntries.push(entry)

        entry.target.classList.add(partiallyVisibleClass)
      })
      intersectionCb?.()
      previousPosition = tilesContainerElement.scrollTop
    },
    { root: tilesContainerElement, rootMargin: "0px", threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
  )

  getTileElements()[0].classList.add(animationClasses.up)

  function getNextTilePosition() {
    const uniqueEntries = []

    const partialTiles = latestEntries
      .filter(entry => entry.intersectionRatio < 1 && !entry.isIntersecting)
      .map(partialEntry => partialEntry.target)

    for (const entry of partialTiles) {
      const existingIndex = uniqueEntries.findIndex(uniqEntry => uniqEntry.isSameNode(entry))
      if (existingIndex >= 0) {
        uniqueEntries.splice(existingIndex, 1, entry)
      } else {
        uniqueEntries.push(entry)
      }
    }

    const positions = uniqueEntries
      .filter(target => target.classList.contains(partiallyVisibleClass))
      .map(partialTile => partialTile.getBoundingClientRect())
      .map(rect => rect.y)
      .filter(value => value > 0)

    cleanupStyles()

    latestEntries = []

    return Math.min(...positions)
  }

  function cleanupStyles() {
    latestEntries.forEach(entry => Object.values(animationClasses).forEach(item => entry.target.classList.remove(item)))
  }

  function enableAnimation(element: HTMLElement) {
    if (previousPosition === tilesContainerElement.scrollTop) {
      return
    }

    const animationClass =
      previousPosition < tilesContainerElement.scrollTop ? animationClasses.up : animationClasses.down

    Object.values(animationClasses).forEach(item => element.classList.remove(item))

    if (getRenderMode(getSliderElement()) !== "mobile" || element.classList.contains(partiallyVisibleClass)) {
      element.classList.add(animationClass)
    }
  }

  function configResizeObserverTargets() {
    resizeObserver.observe(tilesContainerElement)
  }

  function configTileIntersectionTargets() {
    getTileElements().forEach(tile => tilesIntersectionObserver.observe(tile))
  }

  function disconnect() {
    tilesIntersectionObserver.disconnect()
    resizeObserver.disconnect()
  }

  return { configResizeObserverTargets, configTileIntersectionTargets, getNextTilePosition, cleanupStyles, disconnect }
}
