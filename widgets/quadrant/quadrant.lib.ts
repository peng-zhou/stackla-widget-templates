import type { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export const createElementHelper = (tag: string, text: string) => {

  // Create the element
  const element = document.createElement(tag)

  // Set the escaped text as innerHTML
  element.textContent = text

  return element
}

export function createSmallTile(tile: any, clickHandler: (id: number) => void) {
  const smallTileDiv = document.createElement("div")
  smallTileDiv.className = "grid-item"

  const tileImageWrapper = document.createElement("div")
  tileImageWrapper.className = "tile-image-wrapper"

  const smallImg = document.createElement("img")
  smallImg.src = tile.image

  const smallOverlay = document.createElement("div")
  smallOverlay.className = "tile-info-overlay"
  const titleEl = createElementHelper("h3", tile.name)
  const msgEl = createElementHelper("p", tile.message)
  smallOverlay.appendChild(titleEl)
  smallOverlay.appendChild(msgEl)

  tileImageWrapper.appendChild(smallImg)
  smallTileDiv.appendChild(tileImageWrapper)
  smallTileDiv.appendChild(smallOverlay)

  smallTileDiv.addEventListener("click", () => {
    clickHandler(tile.id)
  })

  return smallTileDiv
}

export function initializeQuadrant() {
  const imagesPerGroup = 5;
  let groupCount = 0;

  const ugcTiles = sdk.tiles.getEnabledTiles();
  const container = sdk.querySelector(".quadrant-grid-container");

  if (!container) {
    throw new Error("Container not found");
  }

  while (groupCount * imagesPerGroup < ugcTiles.length) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "group-container";
    const currentStartIndex = groupCount * imagesPerGroup;
    const endIndex = Math.min(currentStartIndex + imagesPerGroup, ugcTiles.length);
    const prependBigTile = (groupCount % 4 === 0);

    // Create and append small tiles to the group
    for (let offset = 0; offset < imagesPerGroup - 1 && currentStartIndex + offset < endIndex; offset++) {
      const smallTileDiv = createSmallTile(ugcTiles[currentStartIndex + offset], handleClickedTileEvents);
      groupDiv.appendChild(smallTileDiv);
    }

    // Create big tile div
    if (currentStartIndex + imagesPerGroup - 1 < ugcTiles.length) {
      const bigTile = ugcTiles[currentStartIndex + imagesPerGroup - 1];
      const bigTileDiv = document.createElement("div");
      bigTileDiv.className = "grid-item large";

      const tileImageWrapper = document.createElement("div");
      tileImageWrapper.className = "tile-image-wrapper";

      const bigImg = document.createElement("img");
      bigImg.src = bigTile.image;

      const bigOverlay = document.createElement("div");
      bigOverlay.className = "tile-info-overlay";
      bigOverlay.innerHTML = `<h3>${bigTile.name}</h3><p>${bigTile.message}</p>`;

      tileImageWrapper.appendChild(bigImg);
      bigTileDiv.appendChild(tileImageWrapper);
      bigTileDiv.appendChild(bigOverlay);
      bigTileDiv.addEventListener("click", () => {
        handleClickedTileEvents(bigTile.id);
      });

      if (prependBigTile) {
        groupDiv.insertBefore(bigTileDiv, groupDiv.firstChild);
      } else {
        groupDiv.appendChild(bigTileDiv);
      }
    }

    container.appendChild(groupDiv);
    groupCount++;
  }

  const loadMoreButton = sdk.querySelector("#load-more");

  if (!loadMoreButton) {
    throw new Error("Load more button not found");
  }

  loadMoreButton.style.display = groupCount >= Math.ceil(ugcTiles.length / imagesPerGroup) ? "none" : "block";
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
