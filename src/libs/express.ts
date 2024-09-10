import express from "express"
import "hbs"
import { WidgetRequest } from "@stackla/ugc-widgets"
import cors from "cors"
import path from "path"
import { readFileSync } from "fs"
import * as Handlebars from 'hbs'
import tiles from "../../tests/fixtures/tiles.fixtures"
import fs from "fs"
import { getAndRenderTiles, renderHTMLWithTemplates } from "./tile.handlers"
import { loadStaticFileRoutes } from "./static-files"

export interface IDraftRequest {
  custom_templates: {
    layout: {
      template: string
    }
    tile: {
      template: string
    }
  },
  custom_css: string
  custom_js: string
}


const expressApp = express()
expressApp.use((_req, res, next) => {
  res.set("Cache-Control", "public, max-age=300")
  next()
})
expressApp.use(express.static("dist/widgets", { redirect: false }))
expressApp.engine('hbs', Handlebars.__express)
expressApp.set('view engine', 'hbs')
expressApp.use(cors())

const stripSymbols = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "")
const stripSymbolsThatAreNotDash = (str: string) => str.replace(/[^a-zA-Z0-9-]/g, "")

loadStaticFileRoutes(expressApp);

expressApp.post('/widgets/668ca52ada8fb/draft', async (req, res) => {
  const body = JSON.parse(req.body);
  const draft = body.draft as IDraftRequest;
  const html = await renderHTMLWithTemplates(draft);
  const customCss = draft.custom_css;
  const customJs = draft.custom_js;

  res.send({
    html,
    customCSS: customCss,
    customJS: customJs,
    "widgetOptions": {
        "widgetConfig": {
            "lightbox": {
                "apply_custom_sharing_title_on_miss_title": false,
                "disable_short_url": false,
                "fallback_share_image": "",
                "layout": "portrait",
                "post_comments": false,
                "sharing_text": "",
                "sharing_title": "",
                "show_additional_info": true,
                "show_caption": true,
                "show_timestamp": true,
                "show_comments": true,
                "show_dislikes": true,
                "show_likes": true,
                "show_nav": true,
                "show_sharing": true,
                "show_shopspots": true,
                "show_products": true,
                "show_tags": true,
                "show_votes": true,
                "show_cross_sellers": false,
                "show_add_to_cart": true
            },
            "tile_options": {
                "show_comments": true,
                "show_dislikes": true,
                "show_likes": true,
                "show_nav": true,
                "show_sharing": true,
                "show_shopspots": true,
                "show_tags": true,
                "show_votes": true
            },
            "claim_config": {
                "show_claim_button": false,
                "show_claim_button_on_tags": []
            }
        },
        "widgetStyle": {
            "auto_refresh": "1",
            "click_through_url": "[EXPAND]",
            "enable_custom_tiles_per_page": false,
            "load_more_type": "static",
            "enable_typekit": false,
            "margin": 10,
            "name": "NextGen Widget Sample 3.0",
            "parent_page_secret_key": "",
            "polling_frequency": 30,
            "rows_per_page": 3,
            "show_powered_by_stackla": true,
            "shopspot_btn_background": "0198CF",
            "shopspot_btn_font_color": "ffffff",
            "shopspot_icon": "",
            "style": "base_carousel_v3",
            "text_tile_background": "ffffff",
            "text_tile_font_color": "666666",
            "text_tile_font_size": 24,
            "text_tile_user_handle_font_color": "333333",
            "text_tile_user_handle_font_size": 18,
            "text_tile_user_name_font_color": "333333",
            "text_tile_user_name_font_size": 18,
            "text_tile_link_color": "00abf0",
            "tiles_per_page": 15,
            "minimal_tiles": 1,
            "type": "fluid",
            "widget_background": "",
            "widget_height": 210,
            "widget_loading_image": "//assetscdn.stackla.com/media/images/widget/ajax-loader.gif",
            "unavailable_products_behaviour": "always_show",
            "dynamic_filter": "none",
            "dynamic_filter_fallback": {
                "category": false,
                "brand": false,
                "custom": 0
            }
        },
        "guid": "668ca52ada8fb",
        "filterId": 10695,
        "plugins": {
            "googleAnalytics": {
                "id": 3307,
                "config": {
                    "events": {
                        "load": true,
                        "tileExpand": true,
                        "pinClick": true,
                        "userClick": true,
                        "shareClick": true,
                        "moreLoad": true,
                        "shopspotFlyoutExpand": true,
                        "productActionClick": true,
                        "impression": true,
                        "tileHover": true,
                        "emailTileLoad": true,
                        "emailTileClick": true,
                        "likeClick": true,
                        "dislikeClick": true,
                        "voteClick": false
                    },
                    "nonInteractionEvents": {
                        "load": false,
                        "tileExpand": false,
                        "pinClick": false,
                        "userClick": false,
                        "shareClick": false,
                        "moreLoad": false,
                        "shopspotFlyoutExpand": false,
                        "productActionClick": false,
                        "impression": false,
                        "tileHover": false,
                        "emailTileLoad": false,
                        "emailTileClick": false,
                        "likeClick": false,
                        "dislikeClick": false,
                        "voteClick": false
                    },
                    "categoryName": "",
                    "enabledCustomCategoryName": false,
                    "eventLabel": "default",
                    "accountId": "254530664",
                    "trackingId": "G-XSBBDRKE04",
                    "viewId": "G-XSBBDRKE04",
                    "widgets": {
                        "66bad1333d71e": {
                            "propertyId": null,
                            "events": null,
                            "nonInteractionEvents": null,
                            "categoryName": "",
                            "enabledCustomCategoryName": false,
                            "eventLabel": "default",
                            "trackingId": null,
                            "isOverridden": false,
                            "isDisabled": false,
                            "isActive": true,
                            "widgetName": "Nightfall test",
                            "widgetId": 64181,
                            "accountId": null,
                            "dataStreamId": null,
                            "domainName": null,
                            "trackingStatus": true
                        },
                        "66b5940e9dbba": {
                            "propertyId": null,
                            "events": null,
                            "nonInteractionEvents": null,
                            "categoryName": "",
                            "enabledCustomCategoryName": false,
                            "eventLabel": "default",
                            "trackingId": null,
                            "isOverridden": false,
                            "isDisabled": false,
                            "isActive": true,
                            "widgetName": "0Carousel",
                            "widgetId": 64179,
                            "accountId": null,
                            "dataStreamId": null,
                            "domainName": null,
                            "trackingStatus": true
                        },
                        "66b460aa4f91e": {
                            "propertyId": null,
                            "events": null,
                            "nonInteractionEvents": null,
                            "categoryName": "",
                            "enabledCustomCategoryName": false,
                            "eventLabel": "default",
                            "trackingId": null,
                            "isOverridden": false,
                            "isDisabled": false,
                            "isActive": true,
                            "widgetName": null,
                            "widgetId": null,
                            "accountId": null,
                            "dataStreamId": null,
                            "domainName": null,
                            "trackingStatus": false
                        }
                    },
                    "connectionInfo": [],
                    "analyticsVersion": "v4",
                    "trackingStatus": true,
                    "acknowledgedEmailTrackingIds": {
                        "349987181": true
                    },
                    "activated": true,
                    "connectedAt": "1723765750000",
                    "propertyId": "349987181",
                    "dataStreamId": "4433178738"
                },
                "stackId": 1451
            }
        }
    },
    "stackId": 1451,
    "merchantId": "shopify-64671154416",
    "tileCount": 2177,
    "enabled": 1
})
});

expressApp.get("/widgets/668ca52ada8fb/tiles", async (req, res) => {
  res.send({
    tiles: tiles
  });
});

expressApp.get("/widgets/668ca52ada8fb/rendered/tiles", async (req, res) => {
  const widgetType = req.query.widgetType
  const rootDir = path.resolve(__dirname, `../../../../../dist/widgets/${widgetType}`)
  const layout = `${rootDir}/layout.hbs`
  const tile = `${rootDir}/tile.hbs`
  const css = `${rootDir}/widget.css`
  const js = `${rootDir}/widget.js`

  const layoutFileContents = readFileSync(layout, "utf8")
  const tileFileContents = readFileSync(tile, "utf8")
  const cssFileContents = readFileSync(css, "utf8")
  const jsFileContents = readFileSync(js, "utf8")

  const tileHtml = await getAndRenderTiles({
    custom_templates: {
      layout: {
        template: layoutFileContents
      },
      tile: {
        template: tileFileContents
      }
    },
    custom_css: cssFileContents,
    custom_js: jsFileContents
  });

  res.json(tileHtml);
});

// Register preview route
expressApp.get("/preview", (req, res) => {
  const widgetRequest = req.query as WidgetRequest
  const widgetType = req.query.widgetType
  if (!widgetType) {
    return res.status(400).send("widgetType is required")
  }

  const rootDir = path.resolve(__dirname, `../../../../../dist/widgets/${widgetType}`)

  const layout = `${rootDir}/layout.hbs`
  const tile = `${rootDir}/tile.hbs`
  const css = `${rootDir}/widget.css`
  const js = `${rootDir}/widget.js`

  const layoutFileContents = readFileSync(layout, "utf8")
  const tileFileContents = readFileSync(tile, "utf8")
  const cssFileContents = readFileSync(css, "utf8")
  const jsFileContents = readFileSync(js, "utf8")

  res.render("preview", {
    widgetRequest: JSON.stringify(widgetRequest),
    layoutCode: layoutFileContents,
    tileCode: tileFileContents,
    cssCode: cssFileContents,
    widgetType: widgetType,
    jsCode: jsFileContents
      .replace(/\\/g, "\\\\")
      .replace(/\"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
  })
})

expressApp.get("/autoload", (req, res) => {
  const { selector, widget, resource } = req.query as { selector: string, widget: string, resource: string }

  if (!selector) {
    return res.status(400).send("selector is required")
  }

  if (!widget) {
    return res.status(400).send("widget is required")
  }

  if (!resource) {
    return res.status(400).send("resource is required")
  }

  const resourceWithoutSymbols = stripSymbols(resource)
  const widgetTypeWithoutSymbols = stripSymbols(widget)
  const widgetSrc = `dist/widgets/${widgetTypeWithoutSymbols}/widget.${resourceWithoutSymbols}`
  const code = readFileSync(widgetSrc, "utf8")

  if (resourceWithoutSymbols === "css") {
    res.set("Content-Type", "text/css")
  }

  if (resourceWithoutSymbols === "js") {
    res.set("Content-Type", "text/javascript")
  }

  res.set("Cache-Control", "public, max-age=300")

  res.render("autoload", {
    selector: stripSymbolsThatAreNotDash(selector),
    code,
    isJsCode: resourceWithoutSymbols === "js"
  })
});

export default expressApp
