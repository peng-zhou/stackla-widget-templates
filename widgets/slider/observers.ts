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

  const resizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(() => {
      markColumnsForIndent(settings)
      resizeCb?.()
    })
  )

  const tilesIntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      filterRecentEntries(entries).forEach(entry => {
        const htmlElement = entry.target as HTMLElement
        enableAnimation(htmlElement)
        if (entry.isIntersecting) {
          if (entry.target.classList.contains(partiallyVisibleClass)) {
            if (entry.intersectionRatio > 0.9) {
              entry.target.classList.remove(partiallyVisibleClass)
            }
          }
        } else if (!entry.target.classList.contains(partiallyVisibleClass)) {
          entry.target.classList.add(partiallyVisibleClass)
        }
      })
      intersectionCb?.()
      previousPosition = tilesContainerElement.scrollTop
    },
    { root: tilesContainerElement, rootMargin: "0px", threshold: [0.5, 0.7, 1] }
  )

  configObserverTargets()

  getTileElements()[0].classList.add(animationClasses.up)

  function filterRecentEntries(entries: IntersectionObserverEntry[]) {
    const uniqueEntries = []

    for (const entry of entries) {
      const existingIndex = uniqueEntries.findIndex(uniqEntry => uniqEntry.target.isSameNode(entry.target))
      if (existingIndex >= 0) {
        uniqueEntries.splice(existingIndex, 1, entry)
      } else {
        uniqueEntries.push(entry)
      }
    }

    return uniqueEntries
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

  return { configObserverTargets, configTileIntersectionTargets, disconnect }
}
