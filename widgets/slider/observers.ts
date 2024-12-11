import { Features } from "packages/widget-utils"
import { getRenderMode, getSliderElement, getTileContainerElement, getTileElements } from "./utils"
import { markColumnsForIndent } from "./slider-design"

export function tilesIntersectionObserver() {
  const tilesContainerElement = getTileContainerElement()

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        entry.target.classList.add("tile-animate")
        if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
          entry.target.classList.remove("partially-visible")
          return
        }
        entry.target.classList.add("partially-visible")
      })
    },
    { root: tilesContainerElement, rootMargin: "0px", threshold: 1 }
  )

  function initObserve() {
    getTileElements().forEach(tile => observer.observe(tile))
  }

  function unobserve() {
    observer.disconnect()
  }

  return { initObserve, unobserve }
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
