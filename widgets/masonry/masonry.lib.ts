import { Sdk } from "@stackla/ugc-widgets"
import { refreshMasonryLayout } from "@widgets/libs/extensions/masonry.extension"

declare const sdk: Sdk

export const preloadTileBackgroundImages = async (): Promise<void> => {
  const ugcTiles = sdk.querySelectorAll<HTMLElement>(".grid-item .tile[data-background-image]") ?? []

  await Promise.all(
    Array.from(ugcTiles).map((tile: HTMLElement) => {
      return new Promise<void>((resolve, reject) => {
        const image = tile.getAttribute("data-background-image")

        if (!image) {
          resolve()
          return
        }

        const preload = new Image()
        preload.src = image

        preload.onload = () => {
          tile.removeAttribute("data-background-image")
          tile.style.backgroundImage = `url(${image})`
          resolve()
        }

        preload.onerror = async () => {
          const parent = tile.parentElement
          if (parent) {
            parent.remove()
          }
          await refreshMasonryLayout(true)
          console.error(`Failed to load image ${image}`)
          reject(new Error(`Failed to load image ${image}`))
        }
      })
    })
  )
}

/**
 * Partition the screen width into random partitions
 * @param screenWidth
 * @param minPartitionWidth
 * @returns
 */
export function generateRandomPartitions(screenWidth: number, minPartitionWidth = 100) {
  // Validate input
  if (screenWidth <= 0) {
    throw new Error("Screen width must be greater than 0.")
  }

  // List to hold the widths of the partitions
  const partitions = []

  const numberOfPartitions = 6

  // Initialize the remaining width to be filled
  let remainingWidth = screenWidth

  // Define the maximum width for any partition
  const maxPartitionWidth = 400

  for (let i = 0; i < numberOfPartitions - 1; i++) {
    // Ensure that the remaining width is enough for the minPartitionWidth and other partitions
    const maxAvailableWidth = Math.min(
      maxPartitionWidth,
      remainingWidth - (numberOfPartitions - i - 1) * minPartitionWidth
    )

    if (maxAvailableWidth < minPartitionWidth) {
      break
    }

    const currentPartitionWidth =
      Math.floor(Math.random() * (maxAvailableWidth - minPartitionWidth + 1)) + minPartitionWidth

    partitions.push(currentPartitionWidth)
    remainingWidth -= currentPartitionWidth
  }

  if (remainingWidth > maxPartitionWidth) {
    // split into enough partitions
    const partitionsCount = Math.floor(remainingWidth / maxPartitionWidth)
    const partitionWidth = Math.floor(remainingWidth / partitionsCount)
    for (let i = 0; i < partitionsCount; i++) {
      partitions.push(partitionWidth)
    }

    return partitions
  }

  // Add the last partition which will take the remaining width
  partitions.push(remainingWidth)

  return partitions
}

export const resizeAllUgcTiles = (() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let totalTilesWidth = 0
  let widths: number[] = []
  let screenWidth: number = 0
  let executionCount = 0

  return function (reset = false) {
    if (reset) {
      totalTilesWidth = 0
      widths = []
      screenWidth = 0
    }

    executionCount += 1
    const allTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".grid-item") ?? [])
    const ugcTiles = reset ? allTiles : allTiles.filter(tile => tile.getAttribute("width-set") !== "true")

    // If no unprocessed UGC tiles, exit
    if (!ugcTiles || ugcTiles.length === 0) {
      return
    }

    // If screenWidth is not stored or has changed, reinitialize the widths array

    const ugcContainer = sdk.querySelector("#nosto-ugc-container")

    if (!ugcContainer) {
      throw new Error("Failed to find Nosto UGC container")
    }

    const currentScreenWidth = ugcContainer.clientWidth! - 80

    if (screenWidth == 0) {
      screenWidth = currentScreenWidth
      widths = generateRandomPartitions(screenWidth) // Generate new partitions based on the new screen size
      totalTilesWidth = 0 // Reset total width as we are reinitializing
    }

    ugcTiles.forEach(async (tile: HTMLElement) => {
      // If widths array is empty, regenerate new partitions
      if (!widths.length) {
        totalTilesWidth = 0
        widths = generateRandomPartitions(screenWidth)
      }

      // Pop the next width from the array
      const randomWidth = widths.pop()!
      totalTilesWidth += randomWidth

      // Apply the width to the tile and mark it as processed
      tile.style.width = `${randomWidth}px`
      tile.setAttribute("width-set", "true")
      tile.setAttribute("execution-count", executionCount.toString())

      // Update the layout (assuming refreshMasonryLayout is used for layout updates)
      await refreshMasonryLayout(false)
    })
  }
})()
