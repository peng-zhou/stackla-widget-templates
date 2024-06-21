sdk.addLoadedComponents([
  "expanded-tile",
  "products",
  "shopspots",
  "add-to-cart",
  "cross-sellers",
]);
const EVENT_LOAD_MORE = "moreLoad";
const EVENT_LOAD_LESS = "lessLoad";
const loadMoreButton = sdk.querySelector("#load-more");
const loadLessButton = sdk.querySelector("#load-less");
const postLoad = sdk.querySelector("#postload");
const preLoad = sdk.querySelector("#preload");
const buttons = sdk.querySelector("#buttons");

loadLessButton.style.display = "none";

sdk.tiles.setVisibleTilesCount(5);
sdk.tiles.setLoadMode("page");
sdk.tiles.hideBrokenTiles = true;
sdk.tiles.preloadImages = true;

function loadMore() {
  sdk.triggerEvent(EVENT_LOAD_MORE);

  if (sdk.tiles.hasLessPages()) {
    loadLessButton.style.display = "";
  }

  if (!sdk.tiles.hasMorePages()) {
    loadMoreButton.style.display = "none";
  }

  window.scrollTo(0, 0);
}

function loadLess() {
  sdk.triggerEvent(EVENT_LOAD_LESS);

  if (sdk.tiles.hasLessPages()) {
    loadLessButton.style.display = "";
  }

  if (!sdk.tiles.hasLessPages()) {
    loadLessButton.style.display = "none";
  }

  if (sdk.tiles.hasMorePages()) {
    loadMoreButton.style.display = "";
  }
}

loadMoreButton.onclick = loadMore;
loadLessButton.onclick = loadLess;

sdk.addEventListener("tilesUpdated", (e) => {
  if (sdk.tiles.hasMorePages()) {
    loadMoreButton.style.display = "";
  }

  if (sdk.tiles.hasLessPages()) {
    loadLessButton.style.display = "";
  }
});

sdk.addEventListener("tileExpand", (e) => {
  buttons.style.display = "none";
});
sdk.addEventListener("expandedTileClose", (e) => {
  buttons.style.display = "";
});
sdk.addEventListener("tilesUpdated", (e) => {
  postLoad.style.display = "";
  preLoad.style.display = "none";
});
