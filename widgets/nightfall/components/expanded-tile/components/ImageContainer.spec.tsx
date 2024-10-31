import { createElement, createFragment } from "jsx-html"
import tiles from "../../../../../tests/fixtures/tiles"
import ImageContainer, { Shopspots } from "./ImageContainer"

const mockSdk = {
  isComponentLoaded: jest.fn(),
  getNodeId: jest.fn(),
  getExpandedTileConfig: jest.fn(() => ({ show_shopspots: true }))
}

mockSdk.isComponentLoaded.mockReturnValue(true)

// @ts-expect-error global properties are not typed
global.sdk = mockSdk

describe("Test shopspot logic", () => {
  test("returns shopspot components when shopspot is enabled", () => {
    mockSdk.getExpandedTileConfig.mockReturnValue({ show_shopspots: true })
    const shopspots = <Shopspots />

    expect(shopspots).not.toBeInstanceOf(DocumentFragment)
  })

  test("returns empty fragment when shopspot is disabled", () => {
    mockSdk.getExpandedTileConfig.mockReturnValue({ show_shopspots: false })
    const shopspots = <Shopspots />

    expect(shopspots).toBeInstanceOf(DocumentFragment)
  })
})

describe("ImageContainer", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("should render image element when tile has image", () => {
    mockSdk.getExpandedTileConfig.mockReturnValue({ show_shopspots: true })

    const imageContainer = <ImageContainer tile={tiles[0]} />

    const expected = (
      <>
        <div class="image-wrapper">
          <div class="image-wrapper-inner">
            <div class="image">
              <div>
                <shopspot-flyout parent="undefined"></shopspot-flyout>
                <shopspot-icon parent="undefined"></shopspot-icon>
              </div>
              <img
                alt="UGC Image"
                class="image-element"
                src="https://media-library.stackla.com/20/fixtures/2024-06/666f8566f7e6e366ff94950c/e0ef24c0-2c41-11ef-af7f-2b848b315e63.jpg?format=webp"
              />
            </div>
          </div>
        </div>
        <div>
          <span class="source">
            <i class="fs fs-instagram"></i>
          </span>
        </div>
      </>
    )

    expect(imageContainer.outerHTML).toBe(expected.outerHTML)
  })

  it("should render shopspot components when shopspot is enabled", () => {
    const expandedTileSettings = { show_shopspots: true }
    mockSdk.getExpandedTileConfig.mockReturnValue(expandedTileSettings)

    const imageContainer = <ImageContainer tile={tiles[0]} />

    mockSdk.isComponentLoaded.mockReturnValue(true)

    document.body.appendChild(imageContainer)

    expect(document.body.querySelector("shopspot-flyout")).not.toBeNull()
  })

  it("does not render shopspot components when shopspot is disabled", () => {
    const expandedTileSettings = { show_shopspots: false }
    mockSdk.getExpandedTileConfig.mockReturnValue(expandedTileSettings)
    const imageContainer = <ImageContainer tile={tiles[0]} />

    mockSdk.isComponentLoaded.mockReturnValue(false)

    document.body.appendChild(imageContainer)

    expect(document.body.querySelector("shopspot-flyout")).toBeNull()
  })
})
