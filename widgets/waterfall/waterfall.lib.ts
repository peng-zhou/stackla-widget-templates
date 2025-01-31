import { ISdk } from "@stackla/widget-utils"

declare const sdk: ISdk

export async function loadWaterfallLayout(reset = false) {
  const widgetContainer = sdk.querySelector("#widget-container")

  if (!widgetContainer) {
    return
  }

  widgetContainer.classList.add("hidden-container")

  const allTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".grid-item") ?? [])
  const ugcTiles = reset ? allTiles : allTiles.filter(tile => tile.getAttribute("height-set") !== "true")
  const { inline_tile_size } = sdk.getStyleConfig()

  if (!ugcTiles || ugcTiles.length === 0) {
    return
  }

  const promises = ugcTiles.map(async (tile: HTMLElement) => {
    return new Promise<void>((resolve, reject) => {
      const hasUserHandle = tile.querySelector(".user-handle") !== null
      const hasTimePhrase = tile.querySelector(".tile-timephrase") !== null
      const bottomContainer = tile.querySelector<HTMLElement>(".tile-bottom-container")
      const caption = tile.querySelector(".caption")
      const icons = tile.querySelectorAll(".icon-share, .network-icon, .content-icon, .icon-products")

      if (!bottomContainer) {
        reject()
        return
      }

      if (inline_tile_size === "small") {
        bottomContainer.classList.add("small")
      }

      icons.forEach(icon => icon.classList.add(`${inline_tile_size}`))

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
          const rowSpan = Math.floor(Math.random() * 20) + 15
          tile.style.gridRowEnd = `span ${rowSpan}`
        }

        if (imageElement && !imageElement.complete) {
          imageElement.onload = () => {
            calculateHeight()
            resolve()
          }
          imageElement.onerror = () => {
            imageElement.parentElement?.remove()
            reject()
          }
        } else {
          calculateHeight()
          resolve()
        }
      }

      reject()
    })
  })

  await Promise.allSettled(promises)

  setTimeout(() => {
    widgetContainer.classList.remove("hidden-container")
  }, 100)
}
