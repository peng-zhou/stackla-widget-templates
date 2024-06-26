export function getConfig(widgetContainer : WidgetContainer) {
    const {
        enabled,
        widgetOptions
    } = widgetContainer;
    
    const {
        widgetStyle,
        widgetConfig
      } = widgetOptions;

    return {
        enabled: enabled,
        name: widgetStyle.name,
        minimal_tiles: widgetStyle.minimal_tiles,
        auto_refresh: widgetStyle.auto_refresh,
        unavailable_products_behaviour: widgetStyle.unavailable_products_behaviour,
        enable_custom_tiles_per_page: widgetStyle.enable_custom_tiles_per_page,
        rows_per_page: widgetStyle.rows_per_page,
        tiles_per_page: widgetStyle.tiles_per_page,
        widget_background: widgetStyle.widget_background,
        text_tile_background: widgetStyle.text_tile_background,
        text_tile_font_size: widgetStyle.text_tile_font_size,
        text_tile_font_color: widgetStyle.text_tile_font_color,
        text_tile_link_color: widgetStyle.text_tile_link_color,
        text_tile_user_name_font_size: widgetStyle.text_tile_user_name_font_size,
        text_tile_user_name_font_color: widgetStyle.text_tile_user_name_font_color,
        text_tile_user_handle_font_size: widgetStyle.text_tile_user_handle_font_size,
        text_tile_user_handle_font_color: widgetStyle.text_tile_user_handle_font_color,
        enable_typekit: widgetStyle.enable_typekit,
        max_tile_width: widgetStyle.max_tile_width,
        margin: widgetStyle.margin, 
        click_through_url: widgetStyle.click_through_url,
        load_more_type: widgetStyle.load_more_type,
        show_claim_button: widgetConfig.claim_config.show_claim_button, 
        enable_doublecolumnspan: widgetStyle.enable_doublecolumnspan,
        shopspot_btn_background: widgetStyle.shopspot_btn_background,
        shopspot_btn_font_color: widgetStyle.shopspot_btn_font_color,
        shopspot_icon: widgetStyle.shopspot_icon, 
        shopspot_icon_width: widgetStyle.shopspot_icon_width,
        shopspot_icon_height: widgetStyle.shopspot_icon_height,
        shopspot_icon_size: widgetStyle.shopspot_icon_size,
        show_caption: widgetConfig.tile_options.show_caption,
        inline_tile_show_shopspots: widgetConfig.tile_options.show_shopspots,
        expanded_tile_show_sharing: widgetConfig.lightbox.show_sharing, 
        expanded_tile_show_products: widgetConfig.lightbox.show_products,
        expanded_tile_show_caption: widgetConfig.lightbox.show_caption,
        expanded_tile_show_shopspots: widgetConfig.lightbox.show_shopspots,
        expanded_tile_show_timestamp: widgetConfig.lightbox.show_timestamp,
        expanded_tile_show_add_to_cart: widgetConfig.lightbox.show_add_to_cart,
      };
}