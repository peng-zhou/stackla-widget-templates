import { Sdk } from "@stackla/ugc-widgets"
import { refreshMasonryLayout } from "@widgets/libs/extensions/masonry.extension"

declare const sdk: Sdk

/**
 * Partition the screen width into random partitions
 * @param screenWidth
 * @param minPartitionWidth
 * @returns
 */
export function generateRandomHeights(containerHeight: number, minPartitionHeight = 100) {
  // Validate input
  if (containerHeight <= 0) {
    return []
  }

  // List to hold the heights of the partitions
  const partitions = []

  const numberOfPartitions = 6

  // Initialize the remaining height to be filled
  let remainingHeight = containerHeight

  // Define the maximum height for any partition
  const maxPartitionHeight = 400

  for (let i = 0; i < numberOfPartitions - 1; i++) {
    // Ensure that the remaining height is enough for the minPartitionHeight and other partitions
    const maxAvailableHeight = Math.min(
      maxPartitionHeight,
      remainingHeight - (numberOfPartitions - i - 1) * minPartitionHeight
    )

    if (maxAvailableHeight < minPartitionHeight) {
      break
    }

    const currentPartitionHeight =
      Math.floor(Math.random() * (maxAvailableHeight - minPartitionHeight + 1)) + minPartitionHeight

    partitions.push(currentPartitionHeight)
    remainingHeight -= currentPartitionHeight
  }

  if (remainingHeight > maxPartitionHeight) {
    // split into enough partitions
    const partitionsCount = Math.floor(remainingHeight / maxPartitionHeight)
    const partitionHeight = Math.floor(remainingHeight / partitionsCount)
    for (let i = 0; i < partitionsCount; i++) {
      partitions.push(partitionHeight)
    }

    return partitions
  }

  // Add the last partition which will take the remaining height
  partitions.push(remainingHeight)

  return partitions
}

export const resizeAllUgcTiles = (() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let totalTilesHeight = 0
  let heights: number[] = []
  let containerHeight: number = 0
  let executionCount = 0

  return function (reset = false) {
    if (reset) {
      totalTilesHeight = 0
      heights = []
      containerHeight = 0
    }

    executionCount += 1
    const allTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".tile") ?? [])
    const ugcTiles = reset ? allTiles : allTiles.filter(tile => tile.getAttribute("height-set") !== "true")

    // If no unprocessed UGC tiles, exit
    if (!ugcTiles || ugcTiles.length === 0) {
      return
    }

    // If containerHeight is not stored or has changed, reinitialize the heights array
    const ugcContainer = sdk.querySelector("#nosto-ugc-container")

    if (!ugcContainer) {
      throw new Error("Failed to find Nosto UGC container")
    }

    const currentContainerHeight = ugcContainer.clientHeight! - 80

    if (containerHeight == 0) {
      containerHeight = currentContainerHeight
      heights = generateRandomHeights(containerHeight) // Generate new partitions based on the new container height
      totalTilesHeight = 0 // Reset total height as we are reinitializing
    }

    ugcTiles.forEach(async (tile: HTMLElement) => {
      // If heights array is empty, regenerate new partitions
      if (!heights.length) {
        totalTilesHeight = 0
        heights = generateRandomHeights(containerHeight)
      }

      // Pop the next height from the array
      const randomHeight = heights.pop()!
      totalTilesHeight += randomHeight

      // Apply the height to the tile and mark it as processed
      tile.style.height = `${randomHeight}px`
      tile.setAttribute("height-set", "true")
      tile.setAttribute("execution-count", executionCount.toString())

      // Update the layout (assuming refreshMasonryLayout is used for layout updates)
      await refreshMasonryLayout(false)
    })
  }
})()
