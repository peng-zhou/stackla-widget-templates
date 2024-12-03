import { ISdk, waitForElements } from "@stackla/widget-utils"

declare const sdk: ISdk

export function loadWaterfallLayout(reset = false) {
  const allTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".grid-item") ?? [])
  const ugcTiles = reset ? allTiles : allTiles.filter(tile => tile.getAttribute("height-set") !== "true")

  if (!ugcTiles || ugcTiles.length === 0) {
    return
  }

  const rowHeight = 10
  const { margin } = sdk.getStyleConfig()
  const gap = parseInt(margin)

  ugcTiles.forEach((tile: HTMLElement) => {
    const tileTop = tile.querySelector<HTMLElement>(".tile-top")
    const tileBottom = tile.querySelector<HTMLElement>(".tile-bottom")

    if (tileTop && tileBottom) {
      const imageElement = tileTop.querySelector<HTMLImageElement>("img")

      const calculateHeight = () => {
        const topHeight = tileTop.scrollHeight
        const bottomHeight = tileBottom.scrollHeight
        const totalHeight = topHeight + bottomHeight

        const rowSpan = Math.ceil(totalHeight / (rowHeight + gap))
        tile.style.gridRowEnd = `span ${rowSpan}`
      }

      if (imageElement && !imageElement.complete) {
        imageElement.onload = calculateHeight
      } else {
        calculateHeight()
      }
    }
  })
}

export function initializeTagSlider() {
  const tilesContainer = sdk.querySelector(".ugc-tiles")

  waitForElements(tilesContainer, ".tag-slider", () => {
    const tagSliders = sdk.querySelectorAll<HTMLElement>(".tag-slider")

    if (!tagSliders.length) {
      return
    }

    tagSliders.forEach(tagSlider => {
      const tagList = tagSlider.querySelector<HTMLElement>(".tile-tags")
      const leftArrow = tagSlider.querySelector<HTMLButtonElement>(".left-arrow")
      const rightArrow = tagSlider.querySelector<HTMLButtonElement>(".right-arrow")

      if (!tagList || !leftArrow || !rightArrow) {
        console.warn("Tag list or arrows not found in the tag slider")
        return
      }

      const scrollAmount = 100 // Pixels to scroll on arrow click

      const updateArrowVisibility = () => {
        const tagListWidth = tagList.offsetWidth
        const tagListScrollWidth = tagList.scrollWidth

        if (tagListWidth === 0 || tagListScrollWidth === 0) {
          return
        }

        const isScrollable = tagListScrollWidth > tagListWidth

        leftArrow.style.display = tagList.scrollLeft > 0 ? "block" : "none"

        rightArrow.style.display =
          isScrollable && tagList.scrollLeft + tagListWidth < tagListScrollWidth ? "block" : "none"

        // Update mask classes
        if (tagList.scrollLeft > 0 && tagList.scrollLeft + tagListWidth < tagListScrollWidth) {
          tagList.classList.add("mask-both")
          tagList.classList.remove("mask-left", "mask-right")
        } else if (leftArrow.style.display === "block" && tagList.scrollLeft > 0) {
          tagList.classList.add("mask-left")
          tagList.classList.remove("mask-right", "mask-both")
        } else if (tagList.scrollLeft + tagListWidth < tagListScrollWidth) {
          tagList.classList.add("mask-right")
          tagList.classList.remove("mask-left", "mask-both")
        } else {
          tagList.classList.remove("mask-left", "mask-right", "mask-both")
        }
      }

      const ensureDimensions = () => {
        const interval = setInterval(() => {
          const tagListWidth = tagList.offsetWidth
          const tagListScrollWidth = tagList.scrollWidth

          if (tagListWidth > 0 && tagListScrollWidth > 0) {
            clearInterval(interval)
            updateArrowVisibility()
          }
        }, 50) // Check every 50ms
      }

      // Event listeners for arrows and scrolling
      leftArrow.addEventListener("click", () => {
        tagList.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      })

      rightArrow.addEventListener("click", () => {
        tagList.scrollBy({ left: scrollAmount, behavior: "smooth" })
      })

      tagList.addEventListener("scroll", updateArrowVisibility)

      ensureDimensions() // Ensure dimensions are valid before updating visibility
    })
  })
}
