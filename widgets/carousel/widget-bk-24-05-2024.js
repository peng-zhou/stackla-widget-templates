// const loadedComponents = [];
// isShopSpotEnabled
// loadedComponents.push("expanded-tile");
const settings = {
  minimal_tiles: 5,
  auto_refresh: true, // to-do
  unavailable_products_behaviour: 5, // to-do: php legacy template
  enable_custom_tiles_per_page: true, // to-do: php legacy template
  tiles_per_page: 5,
  load_more_type: "", // button || scroll || static

  // Color Settings
  widget_background: "FF0000",
  text_tile_background: "2BFF00",

  // Font Settings
  text_tile_font_size: "24px",
  text_tile_font_color: "000",
  text_tile_link_color: "000",
  text_tile_user_name_font_size: "16px",
  text_tile_user_name_font_color: "000",
  text_tile_user_handle_font_size: "16px",
  text_tile_user_handle_font_color: "000",
  enable_typekit: "", // to-do

  // Other Settings
  click_through_url_select: "[EXPAND]", // [EXPAND] || [ORIGINAL_URL] || [NONE] || [CUSTOM]
  click_through_url: "",
  margin: "10", // 10px
  external_js: "", // to-do: php legacy template, we can remove this.
  show_claim_button: "", // to-do: php legacy template

  // CTA Settings
  shopspot_btn_background: "0198CF",
  shopspot_btn_font_color: "000",
  shopspot_icon: "", // to-do: not working on PROD
  shopspot_icon_width: "", // to-do: not working on PROD
  shopspot_icon_height: "", // to-do: not working on PROD
  shopspot_icon_size: "", // to-do: not working on PROD

  // Inline Tile Settings
  inline_tile_show_shopspots: true, // to-do: config[tile_options][show_shopspots]

  // Expand Tile Settings
  expanded_tile_show_sharing: "", // to-do: config[lightbox][show_sharing]
  expanded_tile_show_products: true, // config[lightbox][show_products]
  expanded_tile_show_caption: true, // config[lightbox][show_caption]
  expanded_tile_show_shopspots: true, // config[lightbox][show_shopspots]
  expanded_tile_show_timestamp: true, // config[lightbox][show_timestamp]
  expanded_tile_show_add_to_cart: "", // to-do: config[lightbox][show_add_to_cart] 
};
console.log("sdk", sdk);
window.sdk = sdk;
sdk.addLoadedComponents([
  "expanded-tile",
  "products",
  "shopspots",
  "cross-sellers",
  "https://cdn.jsdelivr.net/npm/@glidejs/glide",
  "https://assetscdn.stackla.com/media/js/common/stackla_tile_decorator.js",
]);

sdk.tiles.setVisibleTilesCount(100);
// This can be disabled if the load is too much on the client, but it also ensures images are not broken.
const arrows = sdk.querySelector(".glide__arrows");
sdk.tiles.preloadImages = true;
const tileWidth = 240;

const decorateTiles = sdk.tiles.tiles;
// Function to initialize Glide with a dynamic perView based on screen size
function initializeGlide() {
  const screenSize = window.innerWidth;
  const perView = settings.enable_custom_tiles_per_page ? Math.floor(screenSize / tileWidth) : settings.tiles_per_page;
  const glide = new Glide(sdk.placement.querySelector(".glide"), {
    type: "slider",
    startAt: 0,
    perView: perView,
    breakpoints: {
      768: {
        perView: 1,
      },
    },
  });

  // Listen for mount.after event to take action after Glide is mounted
  glide.on("mount.after", function () {
    // Disable "Prev" button if we're at the start
    if (glide.index === 0) {
      sdk.placement.querySelector(".glide__arrow--left").disabled = true;
    }
  });

  // Listen for run event to update disable state of arrow buttons
  glide.on("run", function (move) {
    const prevButton = sdk.placement.querySelector(".glide__arrow--left");
    const nextButton = sdk.placement.querySelector(".glide__arrow--right");

    // Enable both buttons by default
    prevButton.disabled = false;
    nextButton.disabled = false;

    // If we're at the first slide...
    if (glide.index === 0) {
      prevButton.disabled = true;
    }

    // If we're at the last slide...
    if (glide.index === glide.length - 1) {
      nextButton.disabled = true;
    }
  });

  glide.mount();
}
sdk.tiles.setLoadMode("page");

// Action
sdk.addEventListener("load", () => {
  sdk.querySelector(".ugc-tiles").classList.add("glide__slides");
  sdk.querySelector("#tiles").style.display = "";

  // Glide Initial setup
  const tilesObjects = sdk?.tiles?.tiles || {};
  const tilesLength = Object.keys(tilesObjects).length;
  const showCarousel = true; // to-do: tilesObjects && tilesLength > settings.minimal_tiles;
  if(showCarousel) {
    initializeGlide();
  }

  // Update Glide on window resize
  window.addEventListener("resize", function () {
    if(showCarousel) {
        initializeGlide();
    }
  });
  arrows.style.display = "inline-block";
});

sdk.addEventListener("tileExpand", () => {
  arrows.style.display = "none";
  // Define a function to get tile data by tile ID.
  const getTileDataById = (tiles, tileId) => {
    return tiles.find((tile) => tile.id === tileId);
  };

  // Retrieve the current tile and enabled tiles only once
  const currentTile = sdk.tiles.getTile();
  const enabledTiles = sdk.tiles.getEnabledTiles();
  console.log("enabledTiles", enabledTiles);
  console.log("currentTile", currentTile);

  // This function finds the previous tile ID based on the current tile
  function getCurrentTileId(currentTile, enabledTiles) {
    const currentIndex = enabledTiles.findIndex(
      (tile) => tile.id === currentTile.id
    );
    // If current tile is the first tile or no previous tile found, return null or an appropriate value
    return currentIndex > 0 ? enabledTiles[currentIndex].id : null;
  }
  // This function finds the previous tile ID based on the current tile
  function getPreviousTileId(currentTile, enabledTiles) {
    console.log("getPreviousTileId currentTile", currentTile);
    console.log("getPreviousTileId enabledTiles", enabledTiles);
    const currentIndex = enabledTiles.findIndex(
      (tile) => tile.id === currentTile.id
    );
    // If current tile is the first tile or no previous tile found, return null or an appropriate value
    return currentIndex > 0 ? enabledTiles[currentIndex - 1].id : null;
  }

  // This function finds the next tile ID based on the current tile
  function getNextTileId(currentTile, enabledTiles) {
    const currentIndex = enabledTiles.findIndex(
      (tile) => tile.id === currentTile.id
    );
    // If current tile is the last tile or no next tile found, return null or an appropriate value
    return currentIndex >= 0 && currentIndex < enabledTiles.length - 1
      ? enabledTiles[currentIndex + 1].id
      : null;
  }

  // Here you would retrieve the IDs of the previous and next tiles; placeholder functions are used
  //   const prevTileId = getPreviousTileId(currentTile, enabledTiles);
  //   const nextTileId = getNextTileId(currentTile, enabledTiles);

  //   // Build the previous and next tile data objects
  //   const prevTileData = {
  //     tileData: getTileDataById(enabledTiles, prevTileId),
  //     tileId: prevTileId,
  //     widgetId: sdk.placement.getWidgetId(),
  //     filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId,
  //   };

  //   const nextTileData = {
  //     tileData: getTileDataById(enabledTiles, nextTileId),
  //     tileId: nextTileId,
  //     widgetId: sdk.placement.getWidgetId(),
  //     filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId,
  //   };

  //   // Function to dispatch a CustomEvent with a given name and detail
  //   function dispatchTileEvent(eventName, detailData) {
  //     const customEvent = new CustomEvent(eventName, {
  //       detail: { data: detailData },
  //     });
  //     sdk.events.dispatchUgcEvent(customEvent);
  //   }

  // Dispatch the Close event for the previous tile and Expand events for previous and next tiles
  // dispatchTileEvent("expandedTileClose", prevTileData);
  // dispatchTileEvent("tileExpand", prevTileData);
  // dispatchTileEvent("tileExpand", nextTileData);

  // This function sets up click event listeners on your page for the previous and next tiles
  function setupClickEvents(currentTile, enabledTiles, type) {
    // Obtain prevTileData and nextTileData using our previously defined functions
    const prevTileId = getPreviousTileId(currentTile, enabledTiles);
    const prevTileData = enabledTiles.find((tile) => tile.id === prevTileId);
    const nextTileId = getNextTileId(currentTile, enabledTiles);
    const nextTileData = enabledTiles.find((tile) => tile.id === nextTileId);
    const currentTileId = getCurrentTileId(currentTile, enabledTiles);
    const currentTileData = enabledTiles.find(
      (tile) => tile.id === currentTileId
    );

    console.log("setupClickEvents prevTileId", prevTileId);
    console.log("setupClickEvents prevTileData", prevTileData);
    console.log("setupClickEvents nextTileId", nextTileId);
    console.log("setupClickEvents nextTileData", nextTileData);
    console.log("setupClickEvents currentTileId", currentTileId);
    console.log("setupClickEvents currentTileData", currentTileData);

    const tileClose = new CustomEvent("expandedTileClose", {
      detail: {
        data: currentTileData,
      },
    });

    sdk.events.dispatchUgcEvent(tileClose);

    // Set up click listener for the previous tile if it exists
    if (prevTileData && type === "previous") {
        const prevTileElement = sdk.querySelector(".tile-arrows-left");
        prevTileElement.addEventListener("click", () => {
          sdk.events.dispatchTileEvent("expandedTileClose", currentTile);
          sdk.events.dispatchTileEvent("tileExpand", prevTileData);
        });

      console.log("setupClickEvents type & prevTileData", type);

      const expandPrevTile = new CustomEvent("tileExpand", {
        detail: {
          data: prevTileData,
        },
      });
      sdk.events.dispatchUgcEvent(expandPrevTile);
    }

    // Set up click listener for the next tile if it exists
    if (nextTileData && type === "next") {
        const nextTileElement = sdk.querySelector(".tile-arrows-right");
        nextTileElement.addEventListener("click", () => {
          sdk.events.dispatchTileEvent("expandedTileClose", currentTile);
          sdk.events.dispatchTileEvent("tileExpand", nextTileData);
        });
      console.log("setupClickEvents type & nextTileData", type);

      const expandNextTile = new CustomEvent("tileExpand", {
        detail: {
          data: nextTileData,
        },
      });
      sdk.events.dispatchUgcEvent(expandNextTile);
    }
  }
  // Example of how you might call this function:
  // Assuming currentTile and enabledTiles are defined and contain the correct information
  const expandedTile = sdk.querySelector("expanded-tile");
  const expandedTileShadowRoot = expandedTile.shadowRoot;
  const prevButtonSelector =
    expandedTileShadowRoot.querySelector(".tile-arrows-left");
  const nextButtonSelector =
    expandedTileShadowRoot.querySelector(".tile-arrows-right");
  console.log("navButtonSelector prevButtonSelector", prevButtonSelector);
  console.log("navButtonSelector nextButtonSelector", nextButtonSelector);

  //   navButtonSelector.onclick = () => {
  //     console.log('navButtonSelector click');
  //     setupClickEvents(currentTile, enabledTiles, navButtonSelector);
  //   };
  prevButtonSelector.addEventListener("click", (e) => {
    console.log("navButtonSelector prevButtonSelector clicked");
    const type = e.target.classList.contains("tile-arrows-left")
      ? "previous"
      : "next";
    console.log(
      "navButtonSelector prevButtonSelector click e.target.classList",
      e.target.classList
    );
    setupClickEvents(currentTile, enabledTiles, type);
  });
  nextButtonSelector.addEventListener("click", (e) => {
    console.log("navButtonSelector nextButtonSelector clicked");
    const type = e.target.classList.contains("tile-arrows-left")
      ? "previous"
      : "next";
    console.log(
      "navButtonSelector nextButtonSelector click e.target.classList",
      e.target.classList
    );
    setupClickEvents(currentTile, enabledTiles, type);
  });
});
sdk.addEventListener("expandedTileClose", () => {
  arrows.style.display = "block";
});

// Style
sdk.addCSSToComponent(
  `:host {
    padding: 0;
    box-sizing: border-box;
    display: inline-block;
    margin: 30px auto;
    max-width: 1060px;
    position: relative;
    vertical-align: middle;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .exit {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .panel {
    display: flex;
    position: relative;
    background: #f4f4f4;
    width: 100%;
    height: 100%;
  }
  .panel-left {
    min-width: 40%;
    max-width: 40%;
    background: #fff;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .panel-left img {
    width: 100%;
  }
  .panel-right {
    padding: 26px 40px;
  }
  .tile-arrows-left {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: -60px;
    border: 0;
    background: none;
  }
  .tile-arrows-right {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    right: -60px;
    border: 0;
    background: none;
  }

  .tile-arrows .widget-icon {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  div.image {
    position: relative;
  }
  .image-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 16px;
  }
  .image-wrapper-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .user-info {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .user-info-wrapper {
    text-align: left !important;
  }

  .user-info-wrapper a {
    color: #666;
    font-family: 'Roboto Condensed', sans-serif;
    text-decoration: none;
    line-height: 1.4;
  }

  .user-top {
    font-weight: 700;
    font-size: 1.5em;
    text-transform: uppercase;
  }

  .user-bottom {
    font-size: 1.2em;
    font-weight: 300;
  }

  .caption-paragraph {
    color: #090909;
    display: inline-block;
    font-size: 12px;
    line-height: 2;
    min-height: 300px;
    text-align: left;
    width: 100%;
    word-break: break-word;
  }
  html {
    background: #${settings.widget_background};
  }
  .ugc-tile {
    background: #${settings.text_tile_background};
    margin-left: ${settings.margin}px !important;
    margin-right: ${settings.margin}px !important;
  }
  .caption {
    font-size: ${settings.text_tile_font_size};
    color: #${settings.text_tile_font_color};
  }
  .content-inner-wrapper a {
    color: #${settings.text_tile_link_color};
  }
  .user-name {
    font-size: ${settings.text_tile_user_name_font_size};
    color: #${settings.text_tile_user_name_font_color};
  }
  .user-handle {
    font-size: ${settings.text_tile_user_handle_font_size};
    color: #${settings.text_tile_user_handle_font_color};
  }
  .widget-icon {
    display: block;
  }
  .tile-timestamp {
    color: #ababab;
    display: inline-block;
    font-size: 12px;
    padding-right: 20px;
    text-align: left;
    width: 100%;
  }
  `,
  "expanded-tile"
);

sdk.addCSSToComponent(
    `
    .stacklapopup-products-item-title-wrap {
      text-decoration: none;
    }
    .stacklapopup-products-item-title {
      color: #000;
      text-transform: uppercase;
    }
    .stacklapopup-shopspot-cart,
    .stacklapopup-products-item-button {
      color: #${settings.shopspot_btn_font_color};
      background-color: #${settings.shopspot_btn_background};
      border-radius: 4px;
      display: inline-block;
      font-size: 14px;
      font-style: normal;
      font-weight: bold;
      padding: 15px 0px;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      min-width: 300px;
    }
    `,
    "ugc-products"
  );

// Template
const customExpandedTileTemplate = (sdk) => {
  console.log("customExpandedTileTemplate sdk", sdk);
  const tile = sdk.tiles.getTile();

  console.log("customExpandedTileTemplate tile", tile);
  const shopspotEnabled = sdk.isComponentLoaded("shopspots") && settings.expanded_tile_show_shopspots;
  const productsEnabled = sdk.isComponentLoaded("products") && settings.expanded_tile_show_products;
  const parent = sdk.getNodeId();
  return `<div class="panel">
        <a class="exit" href="#">
            <span class="widget-icon close"></span>
        </a>
        <div class="tile-arrows">
            <button class="tile-arrows-btn tile-arrows-left"><span class="widget-icon chevron-left"></span></button>
            <button class="tile-arrows-btn tile-arrows-right" ><span class="widget-icon chevron-right"></span></button>
        </div>
        <div class="panel-left">
            <div class="image-wrapper">
                <div class="image-wrapper-inner">
                    <div class="image">
                        ${
                          shopspotEnabled
                            ? `<shopspot-flyout parent="${parent}"></shopspot-flyout>`
                            : ""
                        }
                        ${
                          shopspotEnabled
                            ? `<shopspot-icon parent="${parent}"/></shopspot-icon>`
                            : ""
                        }
                        ${
                          tile.image
                            ? `<img class="image-element" src="${tile.image}" />`
                            : ""
                        }
                    </div>
                </div>
            </div>
            <div>
                <span class="source">
                    <i class="fs fs-${tile.source}"></i>
                </span>
            </div>
        </div>
        <div class="panel-right">
            <div class="panel-right-wrapper">
                <div class="content-wrapper">
                    <div class="content-inner-wrapper">
                        <div class="user-info-wrapper">
                            <div class="user-info">
                                ${
                                  tile.avatar
                                    ? `<span class="avatar-wrapper">
                                    <a class="avatar-link" href="${tile.original_url}" target="_blank">
                                       <img src="${tile.avatar}">
                                    </a>
                                </span>`
                                    : ""
                                }
                                ${
                                  tile.user
                                    ? `<a class="user-link" href="${tile.original_url}" target="_blank">
                                    <div class="user-top">
                                        <span class="user-name">${tile.user}</span>
                                    </div>
                                    <div class="user-bottom">
                                        <span class="user-handle">@${tile.user}</span>
                                    </div>
                                </a>`
                                    : ""
                                }
                            </div>
                        </div>
                        <div class="tile-timestamp">${tile.source_created_at && settings.expanded_tile_show_timestamp ? window.StacklaTileDecorator._getTimephrase(tile.source_created_at) : ""}</div>
                        <div class="caption">
                            <p class="caption-paragraph">${
                                (tile.message && settings.expanded_tile_show_caption) ? tile.message : ""
                            }</p>
                            ${
                              productsEnabled
                                ? `<ugc-products parent="${parent}">`
                                : ""
                            }
                        </div>
                        <div class="footer">
                            <span class="base-v2 source source-instagram">
                                <i class="fs fs-instagram"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>`;
};
sdk.addTemplateToComponent(customExpandedTileTemplate, "expanded-tile");

// left/right navigation on Expanded Tile Popup

// const tileData = {
//   tileData: sdk.tiles
//     .getEnabledTiles()
//     .filter((tile) => tile.id == sdk.tiles.getTile().id)[0],
//   tileId: sdk.tiles.getTile().id,
//   widgetId: sdk.placement.getWidgetId(),
//   filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId,
// };
// const tileClose = new CustomEvent("expandedTileClose", {
//   detail: {
//     data: tileData,
//   },
// });
// sdk.events.dispatchUgcEvent(tileClose);
// const expandPrevTile = new CustomEvent("tileExpand", {
//   detail: {
//     data: tileData,
//   },
// });
// sdk.events.dispatchUgcEvent(expandPrevTile);
// const expandNextTile = new CustomEvent("tileExpand", {
//   detail: {
//     data: tileData,
//   },
// });
// sdk.events.dispatchUgcEvent(expandNextTile);
