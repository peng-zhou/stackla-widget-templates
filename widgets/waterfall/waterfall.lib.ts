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
    const hasUserHandle = tile.querySelector(".user-handle") !== null
    const hasTimePhrase = tile.querySelector(".tile-timephrase") !== null
    const caption = tile.querySelector(".caption")

    if (caption) {
      if (hasUserHandle || hasTimePhrase) {
        caption.classList.add("lines-4")
      } else {
        caption.classList.add("lines-5")
      }
    }

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

      const updateArrowVisibility = () => {
        const tagListWidth = tagList.offsetWidth
        const tagListScrollWidth = tagList.scrollWidth

        if (tagListWidth === 0 || tagListScrollWidth === 0) {
          return
        }

        const atStart = tagList.scrollLeft <= 0
        const atEnd = tagList.scrollLeft + tagListWidth >= tagListScrollWidth
        const isScrollable = tagListScrollWidth > tagListWidth

        leftArrow.style.display = atStart ? "none" : "block"
        rightArrow.style.display = atEnd || !isScrollable ? "none" : "block"

        tagList.classList.remove("mask-left", "mask-right", "mask-both")

        if (!atStart && !atEnd) {
          tagList.classList.add("mask-both")
        } else {
          if (!atStart) {
            tagList.classList.add("mask-left")
          }
          if (!atEnd) {
            tagList.classList.add("mask-right")
          }
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
        }, 50)
      }

      leftArrow.addEventListener("click", () => {
        tagList.scrollBy({ left: -100, behavior: "smooth" })
      })

      rightArrow.addEventListener("click", () => {
        tagList.scrollBy({ left: 100, behavior: "smooth" })
      })

      tagList.addEventListener("scroll", updateArrowVisibility)

      ensureDimensions()
    })
  })
}
