import { BaseConfig } from "types/IBaseConfig"
import getCSSVariables from "../libs/css-variables"

describe("getCSSVariables", () => {
  it("should return CSS variables string with provided settings", () => {
    const widgetSettings: BaseConfig = {
      widget_background: "ffffff",
      text_tile_background: "f0f0f0",
      text_tile_font_color: "333333",
      text_tile_link_color: "007acc",
      text_tile_user_name_font_color: "444444",
      text_tile_user_handle_font_color: "555555",
      text_tile_tag_font_color: "201C1F",
      shopspot_btn_background: "ff9900",
      shopspot_btn_font_color: "000000",
      max_tile_width: 500,
      margin: 10,
      text_tile_font_size: 14,
      text_tile_user_name_font_size: 16,
      text_tile_user_handle_font_size: 12,
      tags_gap: 4,
      show_caption: true,
      shopspot_icon: "http://example.com/icon.png",
      tiles_per_page: 4,
      enable_custom_tiles_per_page: false,
      click_through_url: undefined,
      auto_refresh: true,
      expanded_tile_show_add_to_cart: false,
      expanded_tile_show_products: false,
      expanded_tile_show_shopspots: false,
      expanded_tile_show_navigation_arrows: true,
      inline_tile_show_timestamps: false,
      tile_tag_background: "D6D4D5",
      tile_tag_inline_background: "00000066",
      cta_button_background_color: "000000",
      cta_button_font_color: "ffffff",
      cta_button_font_size: 14,
      expanded_tile_border_radius: 5
    }

    expect(getCSSVariables(widgetSettings)).toMatchSnapshot()
  })

  it("should return CSS variables string with default margin and show_caption as none", () => {
    const widgetSettings: BaseConfig = {
      widget_background: "ffffff",
      text_tile_background: "f0f0f0",
      text_tile_font_color: "333333",
      text_tile_link_color: "007acc",
      text_tile_user_name_font_color: "444444",
      text_tile_user_handle_font_color: "555555",
      text_tile_tag_font_color: "201C1F",
      shopspot_btn_background: "ff9900",
      shopspot_btn_font_color: "000000",
      max_tile_width: 500,
      text_tile_font_size: 14,
      text_tile_user_name_font_size: 16,
      tiles_per_page: 4,
      enable_custom_tiles_per_page: false,
      click_through_url: undefined,
      auto_refresh: true,
      expanded_tile_show_add_to_cart: false,
      expanded_tile_show_products: false,
      expanded_tile_show_shopspots: false,
      expanded_tile_show_navigation_arrows: true,
      inline_tile_show_timestamps: true,
      tile_tag_background: "D6D4D5",
      tile_tag_inline_background: "00000066",
      cta_button_background_color: "000000",
      cta_button_font_color: "ffffff",
      cta_button_font_size: 14,
      expanded_tile_border_radius: 5
    }

    expect(getCSSVariables(widgetSettings)).toMatchSnapshot()
  })
})
