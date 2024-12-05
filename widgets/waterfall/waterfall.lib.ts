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

export function updateTagListMask() {
  const tilesContainer = sdk.querySelector(".ugc-tiles")

  waitForElements(tilesContainer, ".swiper-tags", () => {
    const container = sdk.querySelector(".swiper-tags")
    const arrowRight = sdk.querySelector<HTMLElement>(".swiper-tags-button-next")
    const arrowLeft = sdk.querySelector<HTMLElement>(".swiper-tags-button-prev")

    if (!container || !arrowRight || !arrowLeft) return

    const updateMask = () => {
      container.className = container.className.replace(/mask-\w+/g, "").trim()

      const isArrowRightEnabled = !arrowRight.classList.contains("swiper-button-disabled")
      const isArrowLeftEnabled = !arrowLeft.classList.contains("swiper-button-disabled")

      if (isArrowRightEnabled && isArrowLeftEnabled) {
        container.classList.add("mask-both")
      } else if (isArrowLeftEnabled) {
        container.classList.add("mask-left")
      } else if (isArrowRightEnabled) {
        container.classList.add("mask-right")
      }
    }

    const observer = new MutationObserver(updateMask)
    observer.observe(arrowRight, { attributes: true, attributeFilter: ["class"] })
    observer.observe(arrowLeft, { attributes: true, attributeFilter: ["class"] })

    updateMask()
  })
}
