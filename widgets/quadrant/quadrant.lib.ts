import type { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function createSmallTile(tile: any, clickHandler: (id: number) => void) {
  const smallTileDiv = document.createElement("div")
  smallTileDiv.className = "grid-item"

  const tileImageWrapper = document.createElement("div")
  tileImageWrapper.className = "tile-image-wrapper"

  const smallImg = document.createElement("img")
  smallImg.src = tile.image

  const smallOverlay = document.createElement("div")
  smallOverlay.className = "tile-info-overlay"
  smallOverlay.innerHTML = `<h3>${tile.name}</h3><p>${tile.message}</p>`

  tileImageWrapper.appendChild(smallImg)
  smallTileDiv.appendChild(tileImageWrapper)
  smallTileDiv.appendChild(smallOverlay)

  smallTileDiv.addEventListener("click", () => {
    clickHandler(tile.id)
  })

  return smallTileDiv
}

export function initializeQuadrant() {
  let groupCount = 0
  const imagesPerGroup = 5

  const ugcTiles = sdk.tiles.getEnabledTiles()
  const startIndex = groupCount * imagesPerGroup
  const endIndex = Math.min(startIndex + imagesPerGroup, ugcTiles.length)
  const container = sdk.querySelector(".quadrant-grid-container")

  if (!container) {
    throw new Error("Container not found")
  }

  for (let i = startIndex; i < endIndex; i += imagesPerGroup) {
    const groupDiv = document.createElement("div")
    groupDiv.className = "group-container"

    if (i + 4 < endIndex) {
      const bigTileDiv = document.createElement("div")
      bigTileDiv.className = "grid-item large"

      const tileImageWrapper = document.createElement("div")
      tileImageWrapper.className = "tile-image-wrapper"

      const bigImg = document.createElement("img")
      bigImg.src = ugcTiles[i + 4].image

      const bigOverlay = document.createElement("div")
      bigOverlay.className = "tile-info-overlay"
      bigOverlay.innerHTML = `<h3>${ugcTiles[i + 4].name}</h3><p>${ugcTiles[i + 4].message}</p>`

      tileImageWrapper.appendChild(bigImg)
      bigTileDiv.appendChild(tileImageWrapper)
      bigTileDiv.appendChild(bigOverlay)
      bigTileDiv.addEventListener("click", () => {
        handleClickedTileEvents(ugcTiles[i + 4].id)
      })

      if (groupCount % 2 === 1) {
        // Odd index: Insert big image at the bottom
        for (let j = 0; j < 4; j++) {
          if (i + j < endIndex) {
            const smallTileDiv = createSmallTile(ugcTiles[i + j], handleClickedTileEvents)
            groupDiv.appendChild(smallTileDiv)
          }
        }
        groupDiv.appendChild(bigTileDiv)
      } else {
        // Even index: Insert big image at the top
        groupDiv.appendChild(bigTileDiv)
        for (let j = 0; j < 4; j++) {
          if (i + j < endIndex) {
            const smallTileDiv = createSmallTile(ugcTiles[i + j], handleClickedTileEvents)
            groupDiv.appendChild(smallTileDiv)
          }
        }
      }
    }

    container.appendChild(groupDiv)
    groupCount++
    if (groupCount >= ugcTiles.length / imagesPerGroup) {
      const loadMoreButton = sdk.querySelector("#load-more")

      if (!loadMoreButton) {
        throw new Error("Load more button not found")
      }

      loadMoreButton.style.display = "none"
    }
  }
}

function handleClickedTileEvents(tileId) {
  const ugcTiles = sdk.tiles.getEnabledTiles()
  const tileData = {
    tileData: ugcTiles.find(tile => tile.id === tileId),
    widgetId: sdk.placement.getWidgetId(),
    filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId
  }
  const expandedTileWrapper = document.createElement("div")
  expandedTileWrapper.className = "expanded-tile-wrapper"
  sdk.triggerEvent("tileExpandClose")
  sdk.triggerEvent("tileExpand", tileData)
}

export function updateGridColumns() {
  const container = sdk.querySelector(".quadrant-grid-container")

  if (!container) {
    throw new Error("Container not found")
  }

  const windowWidth = window.innerWidth

  if (windowWidth >= 1600) {
    container.style.gridTemplateColumns = "repeat(6, 1fr)"
  } else if (windowWidth >= 1400) {
    container.style.gridTemplateColumns = "repeat(5, 1fr)"
  } else if (windowWidth >= 1200) {
    container.style.gridTemplateColumns = "repeat(4, 1fr)"
  } else if (windowWidth >= 992) {
    container.style.gridTemplateColumns = "repeat(3, 1fr)"
  } else if (windowWidth >= 768) {
    container.style.gridTemplateColumns = "repeat(2, 1fr)"
  } else if (windowWidth >= 576) {
    container.style.gridTemplateColumns = "repeat(2, 1fr)"
  } else {
    container.style.gridTemplateColumns = "repeat(1, 1fr)"
  }
}
