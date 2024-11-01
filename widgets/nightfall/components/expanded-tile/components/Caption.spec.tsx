import Caption, { isCaptionEnabled } from "./Caption"
import { Tile, createElement } from "@stackla/widget-utils"
import tiles from "../../../../../tests/fixtures/tiles"

const defaultExpandedTileSettings = {
  show_caption: true
}

const mockSdk = {
  isComponentLoaded: jest.fn(),
  getNodeId: jest.fn(),
  placement: {
    getWidgetContainer: () => {
      return {
        widgetOptions: {
          widgetStyle: {},
          widgetConfig: {}
        },
        enabled: true
      }
    }
  },
  getExpandedTileConfig: jest.fn(() => defaultExpandedTileSettings)
}

// @ts-expect-error global properties are not typed
global.sdk = mockSdk

describe("isCaptionEnabled", () => {
  it("should return true when tile has a message and show_caption is true", () => {
    const tile = { message: "Sample caption" } as Tile
    const widgetSettings = { ...defaultExpandedTileSettings, show_caption: true }
    mockSdk.getExpandedTileConfig.mockReturnValue(widgetSettings)

    expect(isCaptionEnabled(tile)).toBe(true)
  })

  it("should return false when tile has a message but show_caption is false", () => {
    const tile = { message: "Sample caption" } as Tile
    const widgetSettings = { ...defaultExpandedTileSettings, show_caption: false }
    mockSdk.getExpandedTileConfig.mockReturnValue(widgetSettings)
    expect(isCaptionEnabled(tile)).toBe(false)
  })

  it("should return false when tile does not have a message but show_caption is true", () => {
    const tile = { message: "" } as Tile
    const widgetSettings = { ...defaultExpandedTileSettings, show_caption: true }
    mockSdk.getExpandedTileConfig.mockReturnValue(widgetSettings)
    expect(isCaptionEnabled(tile)).toBe(false)
  })

  it("should return false when tile does not have a message and show_caption is false", () => {
    const tile = { message: "" } as Tile
    const widgetSettings = { ...defaultExpandedTileSettings, show_caption: false }
    mockSdk.getExpandedTileConfig.mockReturnValue(widgetSettings)
    expect(isCaptionEnabled(tile)).toBe(false)
  })
})

describe("Caption Component", () => {
  const tile = { message: "Sample caption" } as Tile
  const widgetSettings = { ...defaultExpandedTileSettings, show_caption: true }

  mockSdk.getExpandedTileConfig.mockReturnValue(widgetSettings)

  beforeEach(() => {
    mockSdk.isComponentLoaded.mockReturnValue(true)
    mockSdk.getNodeId.mockReturnValue("parent-id")

    window.document.body.innerHTML = ""
  })

  it("should render vital components", () => {
    mockSdk.getExpandedTileConfig.mockReturnValue(widgetSettings)
    const caption = <Caption tile={tile} />
    expect(caption.toString()).toBe(
      `<div class="caption"><p class="caption-paragraph">Sample caption</p><div class="tile-timestamp"></div><ugc-products parent="parent-id"></ugc-products></div>`
    )
  })

  it("should not render caption when disabled", () => {
    mockSdk.getExpandedTileConfig.mockReturnValue({ ...defaultExpandedTileSettings, show_caption: false })

    const caption = <Caption tile={tile} />
    expect(caption.toString()).toBe(
      `<div class="caption"><p class="caption-paragraph"></p><div class="tile-timestamp"></div><ugc-products parent="parent-id"></ugc-products></div>`
    )
  })

  it("should render tags from tile", () => {
    const tile = tiles[0]
    const caption = <Caption tile={tile} />
    const expectedLink1 = (
      <a href="http://localhost:4002/products/asus-tuf-f15-15-6-fhd-144hz-gaming-laptop-1tbgeforce-rtx-3050">
        Kathmandu 1
      </a>
    )
    const expectedLink2 = (
      <a href="http://localhost:4002/products/samsung-98-qn90d-neo-qled-4k-smart-tv-2024">Kathmandu 2</a>
    )

    expect(caption.innerHTML).toContain(expectedLink1.outerHTML)
    expect(caption.innerHTML).toContain(expectedLink2.outerHTML)
  })

  it("should not render ugc-products component when products are disabled", () => {
    mockSdk.isComponentLoaded.mockReturnValue(false)
    mockSdk.getExpandedTileConfig.mockReturnValue(widgetSettings)
    const caption = <Caption tile={tile} />
    const expected = (
      <div class="caption">
        <p class="caption-paragraph">Sample caption</p>
        <div class="tile-timestamp"></div>
      </div>
    )
    expect(caption.innerHTML).toBe(expected.innerHTML)
  })
})
