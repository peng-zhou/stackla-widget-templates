import { Sdk } from "types"
import { Features, getTileSizeByWidget } from "@stackla/widget-utils"

declare const sdk: Sdk

type SwiperDirection = "none" | "left" | "right" | "up" | "down"

function getTileSize(settings: Features["tileSizeSettings"]) {
  const hostElement = sdk.placement.getElement()
  const tileSizeUnitless = hostElement.style.getPropertyValue("--tile-size-unitless")
  const tileSizeConfig = getTileSizeByWidget(settings)
  return Number(tileSizeUnitless || tileSizeConfig["--tile-size-unitless"])
}

function getColumnCount(settings: Features["tileSizeSettings"]) {
  // using only 95% of available width
  const availableWidth = (window.screen.availWidth * 95) / 100
  const tileRenderingWidth = getTileSize(settings) * 2 + 20
  return Math.floor(availableWidth / tileRenderingWidth)
}

export function addColumnIndex(settings: Features["tileSizeSettings"]) {
  const targetColumnCount = getColumnCount(settings)
  const totalExpectedIndentedColumns = Math.floor(targetColumnCount / 2)
  const sliderInline = sdk.querySelector(".slider-inline")
  const tilesContainer = sliderInline.querySelector<HTMLElement>(".ugc-tiles")

  const tiles = tilesContainer!.querySelectorAll(".ugc-tile")
  let skipNext = false
  let indentedRowCounter = 0
  let columnCounter = 0
  let columnCount = targetColumnCount
  let verticalTileCounter = 0
  const indentedOffsets: number[] = []
  const leftOffset = tiles[0].getBoundingClientRect().left
  const totalTileWidth = getTileSize(settings) * 2 + 20

  tiles.forEach((tile: Element) => {
    const isRowSpanCurrent = getComputedStyle(tile).gridRow === "span 2"
    const isRowSpanNext = tile.nextElementSibling
      ? getComputedStyle(tile.nextElementSibling).gridRow === "span 2"
      : false
    const verticalRender = isRowSpanCurrent && isRowSpanNext

    if (skipNext) {
      skipNext = false
      return
    }

    if (columnCounter === 0) {
      columnCount = targetColumnCount - verticalTileCounter
      verticalTileCounter = 0
    }

    columnCounter++

    // handle row
    if (
      columnCounter > 0 &&
      (columnCounter % 2 === 0 || indentedOffsets.length === totalExpectedIndentedColumns) &&
      columnCounter <= columnCount
    ) {
      if (isRowSpanCurrent && !isRowSpanNext) {
        return
      }

      if (!skipNext) {
        indentedRowCounter++
        const actualLeft = tile.getBoundingClientRect().left
        const expectedLeft = leftOffset + totalTileWidth * (columnCounter - 1)

        if (indentedOffsets.length === totalExpectedIndentedColumns) {
          if (indentedOffsets.includes(actualLeft)) {
            tile.setAttribute("grid-column-center", "true")

            if (verticalRender) {
              tile.nextElementSibling?.setAttribute("grid-column-center", "true")
            }
          } else {
            tile.removeAttribute("grid-column-center")

            if (verticalRender) {
              tile.nextElementSibling?.removeAttribute("grid-column-center")
            }
          }
        } else if (actualLeft === expectedLeft) {
          tile.setAttribute("grid-column-center", "true")

          if (indentedOffsets.length < totalExpectedIndentedColumns) {
            indentedOffsets.push(actualLeft)
          }

          if (verticalRender) {
            tile.nextElementSibling?.setAttribute("grid-column-center", "true")
          }
        } else {
          tile.removeAttribute("grid-column-center")

          if (verticalRender) {
            tile.nextElementSibling?.removeAttribute("grid-column-center")
          }
        }
      }
    } else {
      tile.removeAttribute("grid-column-center")

      if (verticalRender) {
        tile.nextElementSibling?.removeAttribute("grid-column-center")
      }
    }

    if (verticalRender) {
      skipNext = true
      verticalTileCounter++
    }

    // reset counter when all columns are rendered
    if (columnCounter === columnCount) {
      columnCounter = 0
      indentedRowCounter = 0
    }
  })
}

export default function (settings: Features["tileSizeSettings"]) {
  const sliderScrollUpButton = sdk.querySelector("#scroll-up")
  const sliderScrollDownButton = sdk.querySelector("#scroll-down")
  const tileBlockElement = sdk.querySelector(".ugc-tile-wrapper")
  const sliderInline = sdk.querySelector(".slider-inline")

  const tilesContainer = sliderInline.querySelector<HTMLElement>(".ugc-tiles")

  const scrollHistory: Array<number> = []

  if (!sliderInline) {
    throw new Error("Slider inline container not found")
  }

  if (!tileBlockElement) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  if (!tilesContainer) {
    throw new Error("Slider Tiles Scroll Container not found")
  }

  if (!sliderScrollUpButton) {
    throw new Error("Slider Tiles Scroll Up Button not found")
  }

  if (!sliderScrollDownButton) {
    throw new Error("Slider Tiles Scroll Down Button not found")
  }

  const swipeDetectHanlder = swipeDetect(tilesContainer!, direction => {
    if (direction === "up") {
      scrollDown()
    } else if (direction === "down") {
      scrollUp()
    }
  })

  function gridGap() {
    const parsed = parseInt(getComputedStyle(tilesContainer!).gap)
    return isNaN(parsed) ? 0 : parsed
  }

  const style = sdk.getStyleConfig()
  const { inline_tile_size } = style

  tilesContainer.setAttribute("variation", inline_tile_size)

  const tileSizeUnitless = getTileSize(settings)
  const defaultBlockHeight = isNaN(tileSizeUnitless) ? 220 : tileSizeUnitless

  sliderScrollUpButton.addEventListener("click", (event: Event) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    if (tilesContainer.scrollTop > 0) {
      scrollUp()
    }
  })

  sliderScrollDownButton.addEventListener("click", (event: Event) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    scrollDown()
  })

  controlNavigationButtonVisibility()

  const containerResizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(() => {
      if (getRenderMode() === "desktop") {
        tilesContainer.scrollTop = 0
        addColumnIndex(settings)
      } else {
        registerSwipeDetect()
      }
    })
  )
  containerResizeObserver.observe(tilesContainer)

  const screenResizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(() => {
      tilesContainer.scrollTop = 0
      if (getRenderMode() === "desktop") {
        controlNavigationButtonVisibility()
        swipeDetectHanlder.unregister()
      } else {
        swipeDetectHanlder.register()
      }
    })
  )

  screenResizeObserver.observe(sliderInline)

  addColumnIndex(settings)

  function registerSwipeDetect() {}

  function getTopElementHeight() {
    const elements = Array.from(tilesContainer!.querySelectorAll<HTMLElement>(".ugc-tile"))
    const topElement = elements.find(element => {
      const top = element.getBoundingClientRect().top
      return top > 0 && top < 50
    })
    return topElement?.getBoundingClientRect().height || defaultBlockHeight
  }

  function calcHeightAndRecordHistory(value: number) {
    if (!scrollHistory.length) {
      scrollHistory.push(0)
      return value + gridGap()
    } else {
      const totalHeight = tilesContainer!.scrollTop + value + gridGap()
      scrollHistory.push(tilesContainer!.scrollTop)
      return totalHeight
    }
  }

  function getBlockHeight() {
    switch (getRenderMode()) {
      case "mobile": {
        return calcHeightAndRecordHistory(window.screen.height ?? defaultBlockHeight)
      }
      case "tablet": {
        return calcHeightAndRecordHistory(getTopElementHeight())
      }
      default:
        return calcHeightAndRecordHistory(defaultBlockHeight)
    }
  }

  function getRenderMode() {
    return getComputedStyle(sliderInline).getPropertyValue("--render-mode")
  }

  function scrollUp() {
    tilesContainer!.scrollTo({
      top: scrollHistory.pop(),
      left: 0,
      behavior: "smooth"
    })
    setTimeout(() => controlNavigationButtonVisibility(), 500)
  }

  function scrollDown() {
    tilesContainer!.scrollTo({
      top: getBlockHeight(),
      left: 0,
      behavior: "smooth"
    })
    setTimeout(() => controlNavigationButtonVisibility(), 500)
  }

  function controlNavigationButtonVisibility() {
    if (getRenderMode() !== "desktop") {
      return
    }

    if (tilesContainer!.scrollTop > 0 && scrollHistory.length > 0) {
      sliderScrollUpButton.style.visibility = "visible"
    } else {
      sliderScrollUpButton.style.visibility = "hidden"
    }

    const offset = tilesContainer!.scrollHeight - tilesContainer!.scrollTop - tilesContainer!.offsetHeight

    if (offset === 0 || (tilesContainer!.scrollHeight > 0 && offset >= defaultBlockHeight / 2)) {
      sliderScrollDownButton.style.visibility = "visible"
    } else {
      sliderScrollDownButton.style.visibility = "hidden"
    }

    sliderScrollUpButton.style.pointerEvents = "auto"
    sliderScrollDownButton.style.pointerEvents = "auto"
  }

  function swipeDetect(el: HTMLElement, callback: (swipeDirection: SwiperDirection) => void) {
    const allowedTime = 1500,
      threshold = 150,
      restraint = 100
    let startX: number, startY: number, startTime: number

    function registerTouchStart(event: TouchEvent) {
      requestAnimationFrame(() => {
        const touchObject = event.changedTouches[0]
        startX = touchObject.pageX
        startY = touchObject.pageY
        startTime = new Date().getTime()
        event.preventDefault()
      })
    }

    function registerTouchEnd(event: TouchEvent) {
      requestAnimationFrame(() => {
        const touchObject = event.changedTouches[0]
        const distX = touchObject.pageX - startX
        const distY = touchObject.pageY - startY
        const elapsedTime = new Date().getTime() - startTime

        if (elapsedTime <= allowedTime) {
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
            callback(distX < 0 ? "left" : "right")
          } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
            callback(distY < 0 ? "up" : "down")
          }
        }
        event.preventDefault()
      })
    }

    return {
      register: () => {
        el.addEventListener("touchstart", registerTouchStart, false)
        el.addEventListener("touchmove", (event: TouchEvent) => event.preventDefault())
        el.addEventListener("touchend", registerTouchEnd)
      },

      unregister: () => {
        el.removeEventListener("touchstart", registerTouchStart, false)
        el.removeEventListener("touchmove", (event: TouchEvent) => event.preventDefault())
        el.removeEventListener("touchend", registerTouchEnd)
      }
    }
  }
}
