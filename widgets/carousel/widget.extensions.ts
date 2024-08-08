import type { Sdk } from "@stackla/ugc-widgets"
import { IWidgetSettings } from "../../types/IWidgetSettings"
import Glide from "@glidejs/glide"
import { getConfig } from "./widget.config"
import { waitForElm } from "widgets/libs/widget.features"

declare const sdk: Sdk

export function initializeGlideListeners() {
  const widgetContainer = sdk.placement.getWidgetContainer()
  const widgetSettings = getConfig(widgetContainer)

  const tiles = sdk.querySelector("#tiles")

  if (!tiles) {
    throw new Error("Failed to find tiles or arrow UI element")
  }

  tiles.classList.add("glide__slides")
  tiles.style.display = ""
  initializeInlineGlide(widgetSettings)

  window.addEventListener("resize", function () {
    initializeInlineGlide(widgetSettings)
  })

  const arrows = sdk.querySelector(".glide__arrows")
  if (!arrows) {
    throw new Error("Failed to find arrows UI element")
  }

  arrows.style.display = "inline-block"
}

function initializeInlineGlide(widgetSettings: IWidgetSettings) {
  const widgetSelector = sdk.placement.querySelector(".glide")

  if (!widgetSelector) {
    throw new Error("Failed to find widget UI element. Failed to initialise Glide")
  }

  const tileWidth = 240
  const screenSize = window.innerWidth
  const perView = !widgetSettings.enable_custom_tiles_per_page
    ? Math.floor(screenSize / tileWidth)
    : widgetSettings.tiles_per_page

  initializeGlide(widgetSelector, perView, "slider")
}

function initializeGlide(widgetSelector: HTMLElement, perView: number, type: "slider" | "carousel") {
  const glide = new Glide(widgetSelector, {
    type,
    startAt: 0,
    perView: perView,
    peek: 0
  })

  glide.on("mount.after", function () {
    const leftArrow = sdk.placement.querySelector<HTMLButtonElement>(".glide__arrow--left")
    if (!leftArrow) {
      throw new Error("Failed to find left arrow UI element")
    }

    if (glide.index === 0) {
      leftArrow.disabled = true
    }
  })

  glide.on("run", function () {
    const prevButton = sdk.placement.querySelector<HTMLButtonElement>(".glide__arrow--left")
    const nextButton = sdk.placement.querySelector<HTMLButtonElement>(".glide__arrow--right")

    if (!prevButton || !nextButton) {
      throw new Error("Failed to find arrow UI elements")
    }

    prevButton.disabled = false
    nextButton.disabled = false

    if (glide.index === 0) {
      prevButton.disabled = true
    }
  })

  glide.mount()
}

export function onTileExpand() {
  const arrows = sdk.querySelector(".glide__arrows")
  if (!arrows) {
    throw new Error("Failed to find glide arrows UI element")
  }
  arrows.style.display = "none"

  const expandedTile = sdk.querySelector("expanded-tile")

  if (!expandedTile?.shadowRoot) {
    throw new Error("The expanded tile element not found")
  }

  expandedTile.closest("div.expanded-tile-container")?.classList.add("expanded-tile-overlay")

  waitForElm(expandedTile.shadowRoot, [".expanded-glide"], () => {
    if (!expandedTile?.shadowRoot) {
      throw new Error("The expanded tile element not found")
    }
    const widgetSelector = expandedTile.shadowRoot.querySelector<HTMLElement>(".expanded-glide")

    if (!widgetSelector) {
      throw new Error("Failed to find widget UI element. Failed to initialise Glide")
    }
    initializeGlide(widgetSelector, 1, "carousel")
  })
}

export function onTileClosed() {
  const arrows = sdk.querySelector(".glide__arrows")
  if (!arrows) {
    throw new Error("Failed to find glide arrows UI element")
  }
  arrows.style.display = "block"

  const expandedTile = sdk.querySelector("expanded-tile")

  expandedTile?.closest("div.expanded-tile-container")?.classList.remove("expanded-tile-overlay")
}
