import { Features } from "packages/widget-utils"
import { getRenderMode, getSliderElement, getTileContainerElement, getTileElements } from "./utils"
import { markColumnsForIndent } from "./slider-design"

export function tilesIntersectionObserver() {
  const animationClasses = { up: "tile-animate-up", down: "tile-animate-down" }
  const partiallyVisibleClass = "partially-visible"
  const tilesContainerElement = getTileContainerElement()
  let previousPosition = tilesContainerElement.scrollTop

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      filterRecentEntries(entries).forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains(partiallyVisibleClass)) {
            if (entry.intersectionRatio === 1) {
              enableAnimation(entry.target)
              entry.target.classList.remove(partiallyVisibleClass)
            }
          }
        } else if (!entry.target.classList.contains(partiallyVisibleClass)) {
          entry.target.classList.add(partiallyVisibleClass)
        }
      })
      previousPosition = tilesContainerElement.scrollTop
    },
    { root: tilesContainerElement, rootMargin: "0px", threshold: 1 }
  )

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

  function enableAnimation(element: Element) {
    if (previousPosition === tilesContainerElement.scrollTop) {
      return
    }

    const animationClass =
      previousPosition < tilesContainerElement.scrollTop ? animationClasses.up : animationClasses.down

    const removeClass = animationClass === animationClasses.up ? animationClasses.down : animationClasses.up

    element.classList.remove(removeClass)

    if (!element.classList.contains(animationClass)) {
      element.classList.add(animationClass)
    }
  }

  function initObserve() {
    getTileElements().forEach(tile => observer.observe(tile))
  }

  function unobserve() {
    observer.disconnect()
  }

  return { initObserve, unobserve, updateObserver: initObserve }
}

export function gridAlignmentObserver(settings: Features["tileSizeSettings"]) {
  const sliderInlineElement = getSliderElement()
  const tilesContainerElement = getTileContainerElement()

  const observer = new ResizeObserver(() =>
    requestAnimationFrame(() => {
      if (getRenderMode(sliderInlineElement) === "desktop") {
        markColumnsForIndent(settings)
      }
    })
  )

  function initObserve() {
    observer.observe(tilesContainerElement)
  }

  function unobserve() {
    observer.disconnect()
  }

  return {
    initObserve,
    unobserve
  }
}
