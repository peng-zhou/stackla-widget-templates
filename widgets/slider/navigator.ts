import { EVENT_LOAD_MORE, Features, ISdk } from "@stackla/widget-utils"
import {
  getRenderMode,
  getSliderElement,
  getTileContainerElement,
  getTileSizeUnitless,
  getTopElementHeight,
  getWidgetDimension,
  inlineTileGap
} from "./utils"
import { initObservers } from "./observers"

type SwiperDirection = "none" | "left" | "right" | "up" | "down"

declare const sdk: ISdk

export default function (settings: Features["tileSizeSettings"], observers: ReturnType<typeof initObservers>) {
  const sliderElement = getSliderElement()
  const tilesContainerElement = getTileContainerElement()
  const scrollHistory: Array<number> = []
  const tileSizeUnitless = getTileSizeUnitless(settings)
  const defaultBlockHeight = isNaN(tileSizeUnitless) ? 220 : tileSizeUnitless

  const scrollerHandler = scroller(sliderElement)

  const swipeDetectHandler = swipeDetect(tilesContainerElement, direction => {
    if (direction === "up") {
      scrollDown()
    } else if (direction === "down") {
      scrollUp()
    }
  })

  const screenResizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(() => {
      scrollerHandler.setPage(1)
      tilesContainerElement.scrollTop = 0
      if (getRenderMode(sliderElement) === "desktop") {
        swipeDetectHandler.unregister()
        scrollerHandler.register()
      } else {
        swipeDetectHandler.register()
        scrollerHandler.unregister()
      }
    })
  )

  screenResizeObserver.observe(tilesContainerElement)

  function scroller(el: HTMLElement) {
    const sliderScrollUpButton = el.querySelector<HTMLElement>("#scroll-up")
    const sliderScrollDownButton = el.querySelector<HTMLElement>("#scroll-down")
    let page = 1

    if (!sliderScrollUpButton) {
      throw new Error("Slider Tiles Scroll Up Button not found")
    }

    if (!sliderScrollDownButton) {
      throw new Error("Slider Tiles Scroll Down Button not found")
    }

    function scrollUpEventHandler(event: Event) {
      event.preventDefault()
      event.stopImmediatePropagation()
      event.stopPropagation()
      if (tilesContainerElement.scrollTop > 0) {
        scrollUp()
      }
    }

    function scrollDownEventHandler(event: Event) {
      event.preventDefault()
      event.stopImmediatePropagation()
      event.stopPropagation()
      scrollDown()
    }

    function register() {
      toggleScrollUp("hidden")
      toggleScrollDown("visible")
      sliderScrollUpButton!.addEventListener("click", scrollUpEventHandler)
      sliderScrollDownButton!.addEventListener("click", scrollDownEventHandler)
    }

    function unregister() {
      toggleScrollUp("hidden")
      toggleScrollDown("hidden")
      sliderScrollUpButton!.removeEventListener("click", scrollUpEventHandler)
      sliderScrollDownButton!.removeEventListener("click", scrollDownEventHandler)
    }

    function toggleScrollUp(visibility: string) {
      sliderScrollUpButton!.style.visibility = visibility
    }

    function toggleScrollDown(visibility: string) {
      sliderScrollDownButton!.style.visibility = visibility
    }

    function setPage(value: number) {
      page = value
    }

    function incrementPage() {
      setPage(page + 1)

      const hasMoreTiles = sdk.tiles.hasMoreTiles()

      if (
        tilesContainerElement.scrollTop + tilesContainerElement.clientHeight + 200 >=
        tilesContainerElement.scrollHeight
      ) {
        if (hasMoreTiles) {
          sdk.triggerEvent(EVENT_LOAD_MORE)
        } else {
          toggleScrollDown("hidden")
        }
      }
    }

    function decrementPage() {
      setPage(page - 1)

      if (page === 1) {
        toggleScrollUp("hidden")
      }

      toggleScrollDown("visible")
    }

    return {
      register,
      unregister,
      toggleScrollUp,
      toggleScrollDown,
      page,
      incrementPage,
      decrementPage,
      setPage
    }
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

  function scrollUp() {
    scrollerHandler.toggleScrollDown("visible")
    scrollerHandler.decrementPage()

    tilesContainerElement.scrollTo({
      top: scrollHistory.pop(),
      left: 0
    })

    setTimeout(() => {
      observers.cleanupStyles()
    }, 500)
  }

  function scrollDown() {
    scrollerHandler.toggleScrollUp("visible")
    scrollerHandler.incrementPage()

    tilesContainerElement.scrollBy({
      top: getBlockHeight(),
      left: 0
    })
  }

  function calcHeightAndRecordHistory(value: number, tileGap = 0) {
    if (!scrollHistory.length) {
      scrollHistory.push(0)
      return value + tileGap
    } else {
      const totalHeight = tilesContainerElement.scrollTop + value + tileGap
      scrollHistory.push(tilesContainerElement.scrollTop)
      return totalHeight
    }
  }

  function getNextScrollPosition() {
    scrollHistory.push(tilesContainerElement.scrollTop)
    const nextTarget = observers.getNextTilePosition(scrollHistory)
    return nextTarget
  }

  function getBlockHeight(useLegacy = false) {
    const renderMode = getRenderMode(sliderElement)

    if (renderMode === "mobile") {
      return calcHeightAndRecordHistory(getWidgetDimension().containerHeight ?? defaultBlockHeight)
    }

    if (useLegacy) {
      if (renderMode === "tablet") {
        return calcHeightAndRecordHistory(
          getTopElementHeight(tilesContainerElement, defaultBlockHeight),
          inlineTileGap()
        )
      }
    }

    return getNextScrollPosition()
  }
}
