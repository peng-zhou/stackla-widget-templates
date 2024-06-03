const settings = {
  minimal_tiles: 5,
  auto_refresh: true, // to-do
  unavailable_products_behaviour: 5, // to-do: php legacy template
  enable_custom_tiles_per_page: true, // to-do: php legacy template
  tiles_per_page: 5,

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
  max_tile_width: '365',
  margin: "10", // 10px
  click_through_url_select: "[EXPAND]", // [EXPAND] || [ORIGINAL_URL] || [NONE] || [CUSTOM]
  click_through_url: "",
  load_more_type: "", // button || scroll
  external_js: "", // to-do: php legacy template
  show_claim_button: "", // to-do: php legacy template
  enable_doublecolumnspan: "", // 

  // CTA Settings
  shopspot_btn_background: "0198CF",
  shopspot_btn_font_color: "fff",
  shopspot_icon: "", // to-do: not working on PROD
  shopspot_icon_width: "", // to-do: not working on PROD
  shopspot_icon_height: "", // to-do: not working on PROD
  shopspot_icon_size: "", // to-do: not working on PROD

  // Inline Tile Settings
  show_caption: true, // config[tile_options][show_caption]
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
  "add-to-cart",
  "cross-sellers",
  "https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js",
  "https://assetscdn.stackla.com/media/js/common/stackla_tile_decorator.js",
]);
const tilesWrapper = sdk.querySelector(".track");
const EVENT_LOAD_MORE = "moreLoad";
const EVENT_LOAD_LESS = "lessLoad";
const loadMoreButton = sdk.querySelector("#load-more");
const postLoad = sdk.querySelector("#postload");
const preLoad = sdk.querySelector("#preload");
const buttons = sdk.querySelector("#buttons");
const widget = sdk.placement.getShadowRoot();

sdk.tiles.setVisibleTilesCount(10);
sdk.tiles.setLoadMode("all");
sdk.tiles.hideBrokenTiles = true;
sdk.tiles.preloadImages = true;

function loadMore() {
  sdk.triggerEvent(EVENT_LOAD_MORE);

  if (!sdk.tiles.hasMorePages()) {
    loadMoreButton.style.display = "none";
  }
}

loadMoreButton.onclick = loadMore;

sdk.addEventListener("load", () => {
  sdk.masonry = new Masonry(sdk.querySelector(".ugc-tiles"), {
    itemSelector: ".ugc-tile",
    gutter: 20,
  });
});

sdk.addEventListener("tilesUpdated", () => {
  if (!sdk.masonry) {
    return;
  }

  sdk.masonry.layout();
});

sdk.addEventListener("moreLoad", () => {
  sdk.masonry.reloadItems();
});

// Click Event
sdk.addEventListener("tileExpand", () => {
  tilesWrapper.style.display = "none";
});

sdk.addEventListener("expandedTileClose", () => {
  tilesWrapper.style.display = "block";
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