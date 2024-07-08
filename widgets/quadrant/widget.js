const widgetContainer = sdk.placement.getWidgetContainer();

const {
  title,
  enabled,
  widgetOptions
} = widgetContainer;

const {
  widgetStyle,
  widgetConfig
} = widgetOptions;
let widgetTitle = document.createElement('p');
widgetTitle.innerHTML = title;
// sdk.querySelector('.container').prepend(widgetTitle);
const widgetSettings = {
  // Widget Status
  enabled: enabled, // to do: enabled
  name: widgetStyle.name,

  // Content Rules
  minimal_tiles: widgetStyle.minimal_tiles,
  auto_refresh: widgetStyle.auto_refresh,
  unavailable_products_behaviour: widgetStyle.unavailable_products_behaviour, // done
  enable_custom_tiles_per_page: widgetStyle.enable_custom_tiles_per_page, // screen size to show 
  rows_per_page: widgetStyle.rows_per_page,
  tiles_per_page: widgetStyle.tiles_per_page,

  // Color Settings
  widget_background: widgetStyle.widget_background,
  text_tile_background: widgetStyle.text_tile_background,

  // Font Settings
  text_tile_font_size: widgetStyle.text_tile_font_size,
  text_tile_font_color: widgetStyle.text_tile_font_color,
  text_tile_link_color: widgetStyle.text_tile_link_color,
  text_tile_user_name_font_size: widgetStyle.text_tile_user_name_font_size,
  text_tile_user_name_font_color: widgetStyle.text_tile_user_name_font_color,
  text_tile_user_handle_font_size: widgetStyle.text_tile_user_handle_font_size,
  text_tile_user_handle_font_color: widgetStyle.text_tile_user_handle_font_color,
  enable_typekit: widgetStyle.enable_typekit, // to-do: we can remove this.

  // Other Settings
  max_tile_width: widgetStyle.max_tile_width,
  margin: widgetStyle.margin, // 10px
  click_through_url: widgetStyle.click_through_url, // [EXPAND] || [ORIGINAL_URL] || [NONE] || [CUSTOM]
  load_more_type: widgetStyle.load_more_type, // button || scroll
  show_claim_button: widgetConfig.claim_config.show_claim_button, // to-do: php legacy template
  enable_doublecolumnspan: widgetStyle.enable_doublecolumnspan,

  // CTA Settings
  shopspot_btn_background: widgetStyle.shopspot_btn_background,
  shopspot_btn_font_color: widgetStyle.shopspot_btn_font_color,
  shopspot_icon: widgetStyle.shopspot_icon, // to-do: not working on PROD
  // shopspot_icon_width: widgetStyle.shopspot_icon_width, // to-do: not working on PROD
  // shopspot_icon_height: widgetStyle.shopspot_icon_height, // to-do: not working on PROD
  // shopspot_icon_size: widgetStyle.shopspot_icon_size, // to-do: not working on PROD

  // Inline Tile Settings
  show_caption: widgetConfig.tile_options.show_caption, // config[tile_options][show_caption]
  inline_tile_show_shopspots: widgetConfig.tile_options.show_shopspots, // to-do: config[tile_options][show_shopspots]
  
  // Expand Tile Settings
  expanded_tile_show_sharing: widgetConfig.lightbox.show_sharing, // to-do: config[lightbox][show_sharing]
  expanded_tile_show_products: widgetConfig.lightbox.show_products, // config[lightbox][show_products]
  expanded_tile_show_caption: widgetConfig.lightbox.show_caption, // config[lightbox][show_caption]
  expanded_tile_show_shopspots: widgetConfig.lightbox.show_shopspots, // config[lightbox][show_shopspots]
  expanded_tile_show_timestamp: widgetConfig.lightbox.show_timestamp, // config[lightbox][show_timestamp]
  expanded_tile_show_add_to_cart: widgetConfig.lightbox.show_add_to_cart, // to-do: config[lightbox][show_add_to_cart] 
};
if (!widgetSettings.enabled) {
  return;
}
console.log("sdk", sdk);
window.widgetSettings = widgetSettings;
console.log("sdk widgetSettings", widgetSettings);
window.sdk = sdk;
const ugcTiles = sdk.tiles.getEnabledTiles();
const urlPattern = /^https?:\/\/.+/;
sdk.addLoadedComponents([
  'https://cdn.jsdelivr.net/npm/@glidejs/glide',
  'https://assetscdn.stackla.com/media/js/common/stackla_tile_decorator.js',
  'https://static.addtoany.com/menu/page.js'
]);

if (widgetSettings.expanded_tile_show_shopspots) {
  sdk.addLoadedComponents([
    "shopspots",
  ]);
}

if (widgetSettings.auto_refresh === true) {
  sdk.tiles.setAutoAddNewTiles(true);
}

if (widgetSettings.enable_custom_tiles_per_page) {
  sdk.tiles.setVisibleTilesCount(widgetSettings.tiles_per_page);
  loadMoreButton.style.display = "none";
} else {
  sdk.tiles.setVisibleTilesCount(3 * widgetSettings.rows_per_page);
}
// This can be disabled if the load is too much on the client, but it also ensures images are not broken.
const arrows = sdk.querySelector('.glide__arrows');
sdk.tiles.preloadImages = true;
const tileWidth = 240;


const container = sdk.querySelector('.quadrant-grid-container');
let groupCount = 0;
const groupsToShowInitially = 6;
const imagesPerGroup = 5;

// Quadrant Widget dynamic columns
function updateGridColumns() {
  const container = sdk.querySelector('.quadrant-grid-container');
  const windowWidth = window.innerWidth;

  if (windowWidth >= 1600) {
    container.style.gridTemplateColumns = 'repeat(6, 1fr)';
  } else if (windowWidth >= 1400) {
      container.style.gridTemplateColumns = 'repeat(5, 1fr)';
  } else if (windowWidth >= 1200) {
      container.style.gridTemplateColumns = 'repeat(4, 1fr)';
  } else if (windowWidth >= 992) {
      container.style.gridTemplateColumns = 'repeat(3, 1fr)';
  } else if (windowWidth >= 768) {
      container.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else if (windowWidth >= 576) {
      container.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else {
      container.style.gridTemplateColumns = 'repeat(1, 1fr)';
  }
}
// Quadrant Widget Load Images
function initializeQuadrant() {
  const ugcTiles = sdk.tiles.getEnabledTiles();
  const startIndex = groupCount * imagesPerGroup; 
  const endIndex = Math.min(startIndex + imagesPerGroup, ugcTiles.length);

  for (let i = startIndex; i < endIndex; i += imagesPerGroup) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'group-container';

      if (i + 4 < endIndex) {
          const bigDiv = document.createElement('div');
          bigDiv.className = 'grid-item large';

          const tileImageWrapper = document.createElement('div');
          tileImageWrapper.className = 'tile-image-wrapper';

          const bigImg = document.createElement('img');
          bigImg.src = ugcTiles[i + 4].image;
          
          const bigOverlay = document.createElement('div');
          bigOverlay.className = 'tile-info-overlay';
          bigOverlay.innerHTML = `<h3>${ugcTiles[i + 4].name}</h3><p>${ugcTiles[i + 4].message}</p>`;
          
          tileImageWrapper.appendChild(bigImg);
          bigDiv.appendChild(tileImageWrapper);
          bigDiv.appendChild(bigOverlay);

          if (groupCount % 2 === 1) { // Odd index: Insert big image at the bottom
              for (let j = 0; j < 4; j++) {
                  if (i + j < endIndex) {
                      const smallDiv = document.createElement('div');
                      smallDiv.className = 'grid-item';

                      const tileImageWrapper = document.createElement('div');
                      tileImageWrapper.className = 'tile-image-wrapper';
                      
                      const smallImg = document.createElement('img');
                      smallImg.src = ugcTiles[i + j].image;
                      
                      const smallOverlay = document.createElement('div');
                      smallOverlay.className = 'tile-info-overlay';
                      smallOverlay.innerHTML = `<h3>${ugcTiles[i + j].name}</h3><p>${ugcTiles[i + j].message}</p>`;
                      
                      tileImageWrapper.appendChild(smallImg);
                      smallDiv.appendChild(tileImageWrapper);
                      smallDiv.appendChild(smallOverlay);

                      groupDiv.appendChild(smallDiv);
                  }
              }
              groupDiv.appendChild(bigDiv);
          } else { // Even index: Insert big image at the top
              groupDiv.appendChild(bigDiv);
              for (let j = 0; j < 4; j++) {
                  if (i + j < endIndex) {
                      const smallDiv = document.createElement('div');
                      smallDiv.className = 'grid-item';

                      const tileImageWrapper = document.createElement('div');
                      tileImageWrapper.className = 'tile-image-wrapper';
                      
                      const smallImg = document.createElement('img');
                      smallImg.src = ugcTiles[i + j].image;
                      
                      const smallOverlay = document.createElement('div');
                      smallOverlay.className = 'tile-info-overlay';
                      smallOverlay.innerHTML = `<h3>${ugcTiles[i + j].name}</h3><p>${ugcTiles[i + j].message}</p>`;
                      
                      tileImageWrapper.appendChild(smallImg);
                      smallDiv.appendChild(tileImageWrapper);
                      smallDiv.appendChild(smallOverlay);

                      groupDiv.appendChild(smallDiv);
                  }
              }
          }
      }

      container.appendChild(groupDiv);
      groupCount++;
      if (groupCount >= ugcTiles.length / imagesPerGroup) {
          sdk.querySelector('.load-more-button').style.display = 'none';
          break;
      }
  }
}

sdk.tiles.setLoadMode('page');

// Action
sdk.addEventListener('load', () => {
  // const autoRefreshTime = 60000;

  // Glide Initial setup
  const tilesObjects = sdk?.tiles?.getEnabledTiles() || {};
  const tilesLength = tilesObjects.length;
  const showWidget = true; // tilesObjects && tilesLength > widgetSettings.minimal_tiles;
  console.log('Widget showWidget', showWidget, tilesLength);
  // if (showWidget) {
    setTimeout(() => {
      for (let i = 0; i < groupsToShowInitially; i++) {
        console.log('initializeQuadrant loop start on load');
        initializeQuadrant();
      }
    }, 500);
  // }

  // Update Glide on window resize
  window.addEventListener('resize', function () {
    // if (showWidget) {
      for (let i = 0; i < groupsToShowInitially; i++) {
        console.log('initializeQuadrant loop start on load');
        initializeQuadrant();
      }
      updateGridColumns();
    // }
  });
  sdk.querySelector('.load-more-button').addEventListener('click', () => {
    for (let i = 0; i < groupsToShowInitially; i++) {
      initializeQuadrant();
    }
  });
});

if (widgetSettings.click_through_url === '[EXPAND]') {
  // Components
  sdk.addLoadedComponents([
    "expanded-tile",
    "cross-sellers",
  ]);
  if (widgetSettings.expanded_tile_show_products) {
    sdk.addLoadedComponents([
      "products",
    ]);
  }
  if (widgetSettings.expanded_tile_show_add_to_cart) {
    sdk.addLoadedComponents([
      "add-to-cart",
    ]);
  }
  // Click Event
  sdk.addEventListener('tileExpand', () => {
    // Define a function to get tile data by tile ID.
    const getTileDataById = (tiles, tileId) => {
      return tiles.find((tile) => tile.id === tileId);
    };

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

    // This function sets up click event listeners on your page for the previous and next tiles
    function handleShowTileEvents(currentTile, enabledTiles, type) {
      // Obtain prevTileData and nextTileData using our previously defined functions
      const prevTileId = getPreviousTileId(currentTile, enabledTiles);
      const nextTileId = getNextTileId(currentTile, enabledTiles);
      const tileId = type === 'previous' ? prevTileId : nextTileId;
      const tileData = {
        tileData: enabledTiles.find((tile) => tile.id === tileId),
        widgetId: sdk.placement.getWidgetId(),
        filterId: sdk.placement.getWidgetContainer().widgetOptions?.filterId,
      };
      sdk.triggerEvent('tileExpandClose');
      sdk.triggerEvent('tileExpand', tileData);
    }
    // Example of how you might call this function:
    // Assuming currentTile and enabledTiles are defined and contain the correct information
    setTimeout(() => {
      // Retrieve the current tile and enabled tiles only once
      const currentTile = sdk.tiles.getTile();
      const enabledTiles = sdk.tiles.getEnabledTiles().filter(item => item.media === 'video' || item.media === 'image');
      const currentIndex = enabledTiles.findIndex(
        (tile) => tile.id === currentTile.id
      );
      const expandedTile = sdk.querySelector('expanded-tile');
      const expandedTileShadowRoot = expandedTile.shadowRoot;
      const prevButtonSelector =
        expandedTileShadowRoot.querySelector('.tile-arrows-left');
      const nextButtonSelector =
        expandedTileShadowRoot.querySelector('.tile-arrows-right');

      prevButtonSelector.addEventListener('click', (e) => {
        const type = e.target.classList.contains('tile-arrows-left')
          ? 'previous'
          : 'next';
        handleShowTileEvents(currentTile, enabledTiles, type);
      });
      nextButtonSelector.addEventListener('click', (e) => {
        const type = e.target.classList.contains('tile-arrows-left')
          ? 'previous'
          : 'next';
        handleShowTileEvents(currentTile, enabledTiles, type);
      });
    }, 500);
  });
} else if (widgetSettings.click_through_url === '[ORIGINAL_URL]' || urlPattern.test(widgetSettings.click_through_url)) {
  initializeTileClickEventListeners(widgetSettings);
}

// Function to handle tile click events
function handleTileClick(e, widgetUrl) {
  const clickedTile = e.target.closest('.ugc-tile');
  
  // Check if we found a parent tile element
  if (clickedTile) {
    const tileId = clickedTile.getAttribute('data-id');
    const tileData = ugcTiles[tileId];
    
    // Check if we have data for this tile
    if (tileData) {
      // Determine which link to open based on widget URL or tile specific data
      const tileLink = widgetUrl || tileData.original_url || tileData.original_link;
      
      // Open the link in a new tab
      window.open(tileLink, '_blank');
    }
  }
}

// Initialize the click event listeners once
function initializeTileClickEventListeners(widgetSettings) {
  sdk.querySelectorAll('.ugc-tile').forEach(tile => {
    tile.onclick = (e) => {
      
      // `widgetSettings.click_through_url` determines whether to use the widget-specific URL or tile data
      handleTileClick(e, urlPattern.test(widgetSettings.click_through_url) ? widgetSettings.click_through_url : null);
    };
  });
}

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
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: transparent;
  }
  .exit {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
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
    text-align: left;
    width: 100%;
    word-break: break-word;
  }
  html {
    background: #${widgetSettings.widget_background};
  }
  .ugc-tile {
    width: ${widgetSettings.max_tile_width ? widgetSettings.max_tile_width : '300' }px;
    background: #${widgetSettings.text_tile_background};
    margin-left: ${widgetSettings.margin}px !important;
    margin-right: ${widgetSettings.margin}px !important;
  }
  .caption {
    font-size: ${widgetSettings.text_tile_font_size}px;
    color: #${widgetSettings.text_tile_font_color};
  }
  .content-inner-wrapper a {
    color: #${widgetSettings.text_tile_link_color};
  }
  .user-name {
    font-size: ${widgetSettings.text_tile_user_name_font_size}px;
    color: #${widgetSettings.text_tile_user_name_font_color};
  }
  .user-handle {
    font-size: ${widgetSettings.text_tile_user_handle_font_size}px;
    color: #${widgetSettings.text_tile_user_handle_font_color};
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
  .quadrant-grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 100%;
    margin-bottom: 20px;
  }
  .group-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 30px;
    height: 800px;
  }
  .grid-item {
    position: relative;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    overflow: hidden;
    height: 200px;
  }
  .grid-item img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
    bottom: 0;
    height: 100%;
    left: 0;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }
  .grid-item:hover img {
    transform: scale(1.1);
  }
  .tile-info-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .grid-item:hover .tile-info-overlay {
    opacity: 1;
  }
  .grid-item:hover .tile-info-overlay p {
    padding: 0 10px;
  }
  .grid-item.large {
    grid-column: span 2;
    height: 400px;
  }
  .load-more-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  /* Mobile Responsiveness */
  @media (max-width: 600px) {
    .quadrant-grid-container {
        width: 100%;
        padding: 0 10px;
        grid-template-columns: repeat(1, 1fr);
    }
    .group-container {
        grid-template-columns: 1fr;
    }
    .grid-item.large {
        grid-column: span 1;
    }
  }
  `,
  'expanded-tile'
);

sdk.addCSSToComponent(
  `
    .stacklapopup-products-item-title-wrap {
      text-decoration: none;
    }
    .stacklapopup-products-item-title {
      color: #000;
      text-transform: uppercase;
      font-size: 18px;
      font-weight: bold;
      line-height: 1.2;
      text-transform: uppercase;
    }
    .stacklapopup-products-item-price {
      font-size: 14px;
      font-weight: normal;
      color: #000;
      margin-bottom: 5px;
    }
    .stacklapopup-products-item-description {
      color: #282828;
      font-size: 14px;
      font-weight: 400;
    }
    .stacklapopup-shopspot-cart,
    .stacklapopup-products-item-button {
      color: #${widgetSettings.shopspot_btn_font_color};
      background-color: #${widgetSettings.shopspot_btn_background};
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
  'ugc-products'
);

// Template
const customExpandedTileTemplate = (sdk) => {
  const tile = sdk.tiles.getTile();

  const shopspotEnabled =
    sdk.isComponentLoaded('shopspots') && widgetSettings.expanded_tile_show_shopspots;
  const productsEnabled =
    sdk.isComponentLoaded('products') && widgetSettings.expanded_tile_show_products;
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
                            : ''
                        }
                        ${
                          shopspotEnabled
                            ? `<shopspot-icon parent="${parent}"/></shopspot-icon>`
                            : ''
                        }
                        ${
                          tile.image
                            ? `<img class="image-element" src="${tile.image}" />`
                            : ''
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
                                    : ''
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
                                    : ''
                                }
                            </div>
                        </div>
                        <div class="tile-timestamp">${tile.source_created_at && widgetSettings.expanded_tile_show_timestamp ? window.StacklaTileDecorator._getTimephrase(tile.source_created_at) : ''}</div>
                        <div class="caption">
                            <p class="caption-paragraph">${
                              tile.message &&
                              widgetSettings.expanded_tile_show_caption
                                ? tile.message
                                : ''
                            }</p>
                            ${
                              widgetSettings.expanded_tile_show_sharing
                               ? `<!-- AddToAny BEGIN -->
                               <div class="ugc-inline-share-buttons">
                                 <a href="https://www.addtoany.com/add_to/facebook?linkurl=${tile.original_url}&amp;linkname=${tile.name}" target="_blank"><img src="https://static.addtoany.com/buttons/facebook.svg" width="32" height="32" style="background-color:#333"></a>
                                 <a href="https://www.addtoany.com/add_to/x?linkurl=${tile.original_url}&amp;linkname=${tile.name}" target="_blank"><img src="https://static.addtoany.com/buttons/x.svg" width="32" height="32" style="background-color:#333"></a>
                                 <a href="https://www.addtoany.com/add_to/pinterest?linkurl=${tile.original_url}&amp;linkname=${tile.name}" target="_blank"><img src="https://static.addtoany.com/buttons/pinterest.svg" width="32" height="32" style="background-color:#333"></a>
                                 <a href="https://www.addtoany.com/add_to/linkedin?linkurl=${tile.original_url}&amp;linkname=${tile.name}" target="_blank"><img src="https://static.addtoany.com/buttons/linkedin.svg" width="32" height="32" style="background-color:#333"></a>
                                 <a href="https://www.addtoany.com/add_to/email?linkurl=${tile.original_url}&amp;linkname=${tile.name}" target="_blank"><img src="https://static.addtoany.com/buttons/email.svg" width="32" height="32" style="background-color:#333"></a>
                               </div>
                               <!-- AddToAny END -->`
                               : ""
                            }
                            ${
                              productsEnabled
                                ? `<ugc-products parent="${parent}">`
                                : ''
                            }
                        </div>
                        <div class="sharethis-inline-share-buttons"></div>
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
sdk.addTemplateToComponent(customExpandedTileTemplate, 'expanded-tile');