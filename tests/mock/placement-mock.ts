import Placement from "../../ui/core/services/placement/placement"
import { ITransformedWidgetRequest } from "../../ui/core/interfaces/widget-request"
import type { WidgetResponse } from "@stackla/widget-utils"

export const defaultWidgetOptions = {
  wid: "62eb2697a8db6",
  filter_id: 2
}

export const getWidgetContainerOptions = (wid: string): WidgetResponse => ({
  html: '<div id="html">This is my html</div>',
  customCSS: ".class{test}",
  customJS: 'alert("test")',
  enabled: true,
  title: "Test",
  filterId: 2,
  widgetOptions: {
    enabled: true,
    config: {
      lightbox: {
        apply_custom_sharing_title_on_miss_title: false,
        disable_short_url: false,
        fallback_share_image: "",
        layout: "",
        post_comments: true,
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
        show_add_to_cart: true
      },
      tile_options: {
        show_comments: true,
        show_dislikes: true,
        show_likes: true,
        show_nav: true,
        show_sharing: true,
        show_shopspots: true,
        show_tags: true,
        show_votes: true,
        show_timestamp: true,
        show_caption: true,
        show_products: true,
        show_add_to_cart: true
      }
    },
    style: {
      name: "Blank Canvas test",
      style: "base_blankcanvas",
      tiles_per_page: "30",
      type: "fluid",
      dynamic_filter: "none",
      dynamic_filter_fallback: { category: false, brand: false, custom: 0 },
      auto_refresh: "",
      click_through_url: "",
      enable_custom_tiles_per_page: false,
      load_more_type: "",
      margin: "",
      plugin_instance_id: "",
      polling_frequency: "",
      rows_per_page: "",
      shopspot_btn_background: "",
      shopspot_btn_font_color: "",
      shopspot_btn_font_size: "",
      shopspot_icon: "",
      text_tile_background: "",
      text_tile_font_color: "",
      text_tile_font_size: "",
      text_tile_user_handle_font_color: "",
      text_tile_user_handle_font_size: "",
      text_tile_user_name_font_color: "",
      text_tile_user_name_font_size: "",
      text_tile_link_color: "",
      tile_background: "",
      minimal_tiles: "",
      widget_background: "",
      widget_height: "",
      widget_loading_image: "",
      unavailable_products_behaviour: "",
      inline_tile_size: "",
      inline_tile_border_radius: "",
      expanded_tile_border_radius: ""
    },
    guid: wid,
    filter_id: "10695"
  },
  stackId: 1451,
  merchantId: "1234",
  tileCount: 0
})

export type PlacementMockProps = {
  widgetContainer?: WidgetResponse
  widgetOptions?: ITransformedWidgetRequest
}

const defaultPlacementMockProps = {
  widgetOptions: defaultWidgetOptions,
  widgetContainer: getWidgetContainerOptions(defaultWidgetOptions.wid)
}

export default function (
  selector: string = "body",
  {
    widgetContainer = getWidgetContainerOptions(defaultWidgetOptions.wid),
    widgetOptions = defaultWidgetOptions
  }: PlacementMockProps = defaultPlacementMockProps
) {
  const placement = new Placement(selector, widgetContainer, widgetOptions)
  window.ugc = {}
  window.ugc.sdk = {}
  window.ugc.sdk.placement = placement
  return placement
}
