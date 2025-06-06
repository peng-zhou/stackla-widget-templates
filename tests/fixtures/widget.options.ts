import { SharedWidgetOptions } from "@stackla/widget-utils"

const widgetOptions: SharedWidgetOptions["widgetOptions"] = {
  enabled: true,
  config: {
    lightbox: {
      apply_custom_sharing_title_on_miss_title: false,
      disable_short_url: false,
      fallback_share_image: "",
      layout: "portrait",
      post_comments: false,
      sharing_text: "",
      sharing_title: "",
      show_additional_info: true,
      show_caption: true,
      show_timestamp: true,
      show_comments: true,
      show_dislikes: true,
      show_likes: true,
      show_nav: true,
      show_sharing: true,
      show_shopspots: true,
      show_products: true,
      show_tags: true,
      show_votes: true,
      show_cross_sellers: true,
      show_add_to_cart: true,
      show_carousel_grouping: false
    },
    tile_options: {
      show_comments: true,
      show_dislikes: true,
      show_likes: true,
      show_nav: true,
      show_sharing: true,
      show_shopspots: true,
      show_timestamp: true,
      show_tags: true,
      show_votes: true,
      show_caption: true,
      show_products: true,
      show_add_to_cart: true,
      auto_play_video: false,
      show_inline_tiles: false,
      show_carousel: false
    },
    claim_config: {
      show_claim_button: false,
      show_claim_button_on_tags: []
    }
  },
  style: {
    auto_refresh: "1",
    click_through_url: "[EXPAND]",
    enable_custom_tiles_per_page: true,
    load_more_type: "button",
    margin: "10",
    name: "NextGen Widget Sample 3.0",
    polling_frequency: "30",
    cta_btn_background: "000000",
    cta_btn_font_color: "ffffff",
    shopspot_icon: "",
    style: "base_carousel_v3",
    text_tile_background: "ffffff",
    text_tile_font_color: "000000",
    text_tile_font_size: "12",
    text_tile_user_handle_font_color: "636062",
    text_tile_user_handle_font_size: "10",
    text_tile_user_name_font_color: "000000",
    text_tile_user_name_font_size: "14",
    text_tile_link_color: "00abf0",
    tile_background: "D6D4D5",
    tiles_per_page: "15",
    minimal_tiles: "1",
    type: "fluid",
    widget_background: "FBF9FB",
    widget_height: "210",
    widget_loading_image: "//assetscdn.stackla.com/media/images/widget/ajax-loader.gif",
    unavailable_products_behaviour: "always_show",
    dynamic_filter: "none",
    dynamic_filter_fallback: {
      category: false,
      brand: false,
      custom: 0
    },
    expanded_tile_border_radius: "5",
    plugin_instance_id: "0",
    shopspot_btn_font_size: "12",
    inline_tile_size: "medium",
    inline_tile_border_radius: "5",
    inline_tile_margin: "10",
    tile_tag_background: "D6D4D5",
    map_content_feed_filter_id: "",
    map_content_feed_filter_name: "",
    // Unfortunately these are legacy options that were not cased correctly in backend config (circa 2020)
    displayMode: "",
    isScrollZoomDisabled: false,
    providerApiKey: "",
    providerLayer: "",
    connectedContentWidgetId: "",
    defaultBounds: "",
    rows_per_page: "",
    text_caption_paragraph_font_size: "",
    pinColor: "",
    pinTextColor: ""
  },
  guid: "668ca52ada8fb",
  filter_id: "10695"
  // TODO: Fix types in widget utils
  // plugins: {
  //   googleAnalytics: {
  //     id: 3307,
  //     config: {
  //       events: {
  //         load: true,
  //         tileExpand: true,
  //         pinClick: true,
  //         userClick: true,
  //         shareClick: true,
  //         moreLoad: true,
  //         shopspotFlyoutExpand: true,
  //         productActionClick: true,
  //         impression: true,
  //         tileHover: true,
  //         emailTileLoad: true,
  //         emailTileClick: true,
  //         likeClick: true,
  //         dislikeClick: true,
  //         voteClick: false
  //       },
  //       nonInteractionEvents: {
  //         load: false,
  //         tileExpand: false,
  //         pinClick: false,
  //         userClick: false,
  //         shareClick: false,
  //         moreLoad: false,
  //         shopspotFlyoutExpand: false,
  //         productActionClick: false,
  //         impression: false,
  //         tileHover: false,
  //         emailTileLoad: false,
  //         emailTileClick: false,
  //         likeClick: false,
  //         dislikeClick: false,
  //         voteClick: false
  //       },
  //       categoryName: "",
  //       enabledCustomCategoryName: false,
  //       eventLabel: "default",
  //       accountId: "254530664",
  //       trackingId: "G-XSBBDRKE04",
  //       viewId: "G-XSBBDRKE04",
  //       widgets: {
  //         "66bad1333d71e": {
  //           propertyId: null,
  //           events: null,
  //           nonInteractionEvents: null,
  //           categoryName: "",
  //           enabledCustomCategoryName: false,
  //           eventLabel: "default",
  //           trackingId: null,
  //           isOverridden: false,
  //           isDisabled: false,
  //           isActive: true,
  //           widgetName: "Nightfall test",
  //           widgetId: 64181,
  //           accountId: null,
  //           dataStreamId: null,
  //           domainName: null,
  //           trackingStatus: true
  //         },
  //         "66b5940e9dbba": {
  //           propertyId: null,
  //           events: null,
  //           nonInteractionEvents: null,
  //           categoryName: "",
  //           enabledCustomCategoryName: false,
  //           eventLabel: "default",
  //           trackingId: null,
  //           isOverridden: false,
  //           isDisabled: false,
  //           isActive: true,
  //           widgetName: "0Carousel",
  //           widgetId: 64179,
  //           accountId: null,
  //           dataStreamId: null,
  //           domainName: null,
  //           trackingStatus: true
  //         },
  //         "66b460aa4f91e": {
  //           propertyId: null,
  //           events: null,
  //           nonInteractionEvents: null,
  //           categoryName: "",
  //           enabledCustomCategoryName: false,
  //           eventLabel: "default",
  //           trackingId: null,
  //           isOverridden: false,
  //           isDisabled: false,
  //           isActive: true,
  //           widgetName: null,
  //           widgetId: null,
  //           accountId: null,
  //           dataStreamId: null,
  //           domainName: null,
  //           trackingStatus: false
  //         }
  //       },
  //       connectionInfo: [],
  //       analyticsVersion: "v4",
  //       trackingStatus: true,
  //       acknowledgedEmailTrackingIds: {
  //         "349987181": true
  //       },
  //       activated: true,
  //       connectedAt: "1723765750000",
  //       propertyId: "349987181",
  //       dataStreamId: "4433178738"
  //     },
  //     stackId: 1451
  //   }
  // }
}

export default widgetOptions
