import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

let widths: number[] = []

export async function reinitialiseMasonryLayout() {
  resizeAllUgcTiles(true)
}

export async function refreshMasonryLayout(refresh = true) {
  if (refresh) {
    resizeAllUgcTiles()
  }
}

export function handleTileImageRendered(tileId?: string) {
  if (!tileId) {
    return
  }

  const gridItemElement = sdk.placement.getShadowRoot().querySelector(`.grid-item[data-id*="${tileId}"]`)
  const tileLoadingElement = gridItemElement?.querySelector(".tile-loading.loading")
  tileLoadingElement?.classList.remove("loading")
}

export async function handleAllTileImageRendered() {
  const tileLoadingElements = sdk.placement.getShadowRoot().querySelectorAll(".grid-item .tile-loading.loading")
  tileLoadingElements?.forEach(element => element.classList.remove("loading"))

  const loadMoreHiddenElement = sdk.placement.getShadowRoot().querySelector("#buttons > #load-more.hidden")
  loadMoreHiddenElement?.classList.remove(".hidden")

  await reinitialiseMasonryLayout()
}

function getPartitionWidth(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function adjustWidthToLimit(screenWidth: number, partitions: number[], newWidth: number, minWidth: number) {
  const partitionsTotal = partitions.reduce((a, b) => a + b, 0)
  const newTotal = partitionsTotal + newWidth

  const resultWidth = (() => {
    if (newTotal > screenWidth) {
      const excessWidth = newTotal - screenWidth
      return newWidth - excessWidth
    }
    return newWidth
  })()

  if (resultWidth < minWidth) {
    const smallestPartition = Math.min(...partitions)
    const smallestPartitionIndex = partitions.indexOf(smallestPartition)
    const increasedValue = smallestPartition + resultWidth
    partitions[smallestPartitionIndex] = increasedValue
  } else {
    partitions.push(resultWidth)
  }
  return resultWidth
}

function adjustMarginFromPartitions(partitions: number[], minPartitionWidth: number) {
  const totalAdjustments = partitions.length * 10
  const candidates = partitions.filter(partition => partition - 10 > minPartitionWidth).length

  const calculated = (() => {
    // when adjustment value division among candiadtes results in decimal value
    if (totalAdjustments % candidates !== 0) {
      const sharedValue = Math.floor(totalAdjustments / candidates)
      const delta = totalAdjustments % candidates
      return { sharedValue, delta }
    }
    return { sharedValue: totalAdjustments / candidates, delta: 0 }
  })()

  const marginAdjustedPartitions = partitions.map(partition => {
    const value = partition - calculated.sharedValue
    if (value > minPartitionWidth) {
      return value
    }
    return partition
  })

  if (calculated.delta > 0) {
    const maxPartition = Math.max(...marginAdjustedPartitions)
    if (maxPartition - calculated.delta > minPartitionWidth) {
      const maxPartitionIndex = marginAdjustedPartitions.indexOf(maxPartition)
      marginAdjustedPartitions[maxPartitionIndex] = maxPartition - calculated.delta
      return marginAdjustedPartitions
    }
  }

  return marginAdjustedPartitions
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
    return []
  }

  // List to hold the widths of the partitions
  const partitions: number[] = []

  // Initialize the remaining width to be filled
  let remainingWidth = screenWidth

  // Define the maximum width for any partition
  const maxPartitionWidth = 400

  while (remainingWidth > 0) {
    const currentPartitionWidth = getPartitionWidth(minPartitionWidth, maxPartitionWidth)
    const adjustedWidth = adjustWidthToLimit(screenWidth, partitions, currentPartitionWidth, minPartitionWidth)
    remainingWidth -= adjustedWidth
  }

  // adjust margin from partitions
  return adjustMarginFromPartitions(partitions, minPartitionWidth)
}

export const resizeAllUgcTiles = (() => {
  let screenWidth: number = 0
  let executionCount = 0

  return function (reset = false) {
    if (reset) {
      widths = []
      screenWidth = 0
    }

    // If screenWidth is not stored or has changed, reinitialize the widths array
    const ugcContainer = sdk.querySelector("#nosto-ugc-container")

    if (!ugcContainer) {
      throw new Error("Failed to find Nosto UGC container")
    }

    const currentScreenWidth = ugcContainer.clientWidth!

    if (currentScreenWidth === 0) {
      return
    }

    const allTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".grid-item") ?? [])
    const ugcTiles = reset ? allTiles : allTiles.filter(tile => tile.getAttribute("width-set") !== "true")

    // If no unprocessed UGC tiles, exit
    if (!ugcTiles || ugcTiles.length === 0) {
      return
    }

    if (screenWidth == 0) {
      screenWidth = currentScreenWidth
    }

    executionCount += 1

    ugcTiles.forEach(async (tile: HTMLElement) => {
      // If widths array is empty, regenerate new partitions
      if (!widths.length) {
        widths = generateRandomPartitions(screenWidth)
      }

      // Pop the next width from the array
      const randomWidth = widths.pop()!

      // Apply the width to the tile and mark it as processed
      tile.style.width = `${randomWidth}px`
      tile.setAttribute("width-set", "true")
      tile.setAttribute("execution-count", executionCount.toString())
    })
  }
})()
