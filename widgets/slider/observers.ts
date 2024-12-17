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
  let latestEntries: Element[] = []

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

        if (entry.intersectionRatio > 0 && entry.intersectionRatio < 1) {
          latestEntries.push(entry.target)
        }
        entry.target.classList.add(partiallyVisibleClass)
      })
      intersectionCb?.()
      previousPosition = tilesContainerElement.scrollTop
    },
    { root: tilesContainerElement, rootMargin: "0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] }
  )

  configObserverTargets()

  getTileElements()[0].classList.add(animationClasses.up)

  function getNextTilePosition() {
    const uniqueEntries = []

    for (const entry of latestEntries) {
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

    latestEntries = []

    /* setTimeout(() => {
      latestEntries.forEach(entry => Object.values(animationClasses).forEach(item => entry.classList.remove(item)))
      latestEntries = []
    }, 500) */

    return Math.min(...positions)
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

  function configObserverTargets() {
    configTileIntersectionTargets()
    resizeObserver.observe(tilesContainerElement)
  }

  function configTileIntersectionTargets() {
    getTileElements().forEach(tile => tilesIntersectionObserver.observe(tile))
  }

  function disconnect() {
    tilesIntersectionObserver.disconnect()
    resizeObserver.disconnect()
  }

  return { configObserverTargets, configTileIntersectionTargets, getNextTilePosition, disconnect }
}
