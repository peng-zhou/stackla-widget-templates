import Caption, { isCaptionEnabled } from "./Caption"
import { Tile } from "@stackla/ugc-widgets"
import { createElement } from "jsx-html"
import tiles from "../../../../../tests/fixtures/tiles.fixtures"
import { IWidgetSettings } from "types/IWidgetSettings"

jest.mock("@stackla/ugc-widgets", () => ({
  Sdk: {
    isComponentLoaded: jest.fn(),
    getNodeId: jest.fn()
  }
}))

const mockSdk = {
  isComponentLoaded: jest.fn(),
  getNodeId: jest.fn()
}

// @ts-expect-error global properties are not typed
global.sdk = mockSdk

describe("isCaptionEnabled", () => {
  test("returns true when tile has a message and show_caption is true", () => {
    const tile = { message: "Sample caption" } as Tile
    const widgetSettings = { expanded_tile_show_caption: true } as IWidgetSettings
    expect(isCaptionEnabled(tile, widgetSettings)).toBe(true)
  })

  test("returns false when tile has a message but show_caption is false", () => {
    const tile = { message: "Sample caption" } as Tile
    const widgetSettings = { expanded_tile_show_caption: false } as IWidgetSettings
    expect(isCaptionEnabled(tile, widgetSettings)).toBe(false)
  })

  test("returns false when tile does not have a message but show_caption is true", () => {
    const tile = { message: "" } as Tile
    const widgetSettings = { expanded_tile_show_caption: true } as IWidgetSettings
    expect(isCaptionEnabled(tile, widgetSettings)).toBe(false)
  })

  test("returns false when tile does not have a message and show_caption is false", () => {
    const tile = { message: "" } as Tile
    const widgetSettings = { expanded_tile_show_caption: false } as IWidgetSettings
    expect(isCaptionEnabled(tile, widgetSettings)).toBe(false)
  })
})

describe("Caption Component", () => {
  const tile = { message: "Sample caption" } as Tile
  const widgetSettings = { expanded_tile_show_caption: true } as IWidgetSettings

  beforeEach(() => {
    mockSdk.isComponentLoaded.mockReturnValue(true)
    mockSdk.getNodeId.mockReturnValue("parent-id")

    window.document.body.innerHTML = ""
  })

  test("renders vital components", () => {
    const caption = <Caption tile={tile} widgetSettings={widgetSettings} />
    expect(caption.toString()).toBe(
      `<div class="caption"><p class="caption-paragraph">Sample caption</p><ugc-products parent="parent-id"></ugc-products></div>`
    )
  })

  test("does not render caption when disabled", () => {
    const widgetSettings = { expanded_tile_show_caption: false } as IWidgetSettings
    const caption = <Caption tile={tile} widgetSettings={widgetSettings} />
    expect(caption.toString()).toBe(
      `<div class="caption"><p class="caption-paragraph"></p><ugc-products parent="parent-id"></ugc-products></div>`
    )
  })

  test("renders tags from tile", () => {
    const tile = tiles[0]
    const caption = <Caption tile={tile} widgetSettings={widgetSettings} />
    expect(caption.toString()).toContain(
      `<div class="caption"><p class="caption-paragraph"></p><div class="tags"><div class="tag"><span><a href="#">Double column span</a></span></div><div class="tag"><span><a href="#">Single column span</a></span></div><div class="tag"><span><a href="#">auto_twitter_user</a></span></div><div class="tag"><span><a href="https://www.topshop.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=33057&storeId=12556&productId=33834478&langId=-1&cmpId=615&viewAllFlag=false&sort_field=Relevance&beginIndex=1&pageSize=20&categoryId=3497014&parent_categoryId=204484">**Embroidered Watch</a></span></div><div class="tag"><span><a href="https://visual-ugc-staging.myshopify.com/products/lime-cardigannosto=ugc-widget-recommendation-1">Lime Cardigan</a></span></div><div class="tag"><span><a href="https://visual-ugc-staging.myshopify.com/products/sleeveless-cape-jacket-blacknosto=ugc-widget-recommendation-1">Sleeveless Cape Jacket</a></span></div><div class="tag"><span><a href="https://visual-ugc-staging.myshopify.com/products/s14-onl-li-5656-blacknosto=ugc-widget-recommendation-1">Delicious Camisole</a></span></div></div><ugc-products parent="parent-id"></ugc-products></div>`
    ) // getTagsFromTile
  })

  test("does not render ugc-products component when products are disabled", () => {
    mockSdk.isComponentLoaded.mockReturnValue(false)
    const caption = <Caption tile={tile} widgetSettings={widgetSettings} />
    expect(caption.toString()).toBe(`<div class="caption"><p class="caption-paragraph">Sample caption</p></div>`)
  })
})
