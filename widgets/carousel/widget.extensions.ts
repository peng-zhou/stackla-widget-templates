import { Sdk } from "@stackla/types";
import { IWidgetSettings } from "../../types/IWidgetSettings";
import Glide from "@glidejs/glide";

declare const sdk: Sdk;

export function initializeGlide(widgetSettings: IWidgetSettings) {
  const widgetSelector = sdk.placement.querySelector(".glide");

  if (!widgetSelector) {
    throw new Error(
      "Failed to find widget UI element. Failed to initialise Glide",
    );
  }

  const tileWidth = 240;
  const screenSize = window.innerWidth;
  const perView = !widgetSettings.enable_custom_tiles_per_page
    ? Math.floor(screenSize / tileWidth)
    : widgetSettings.tiles_per_page;

  const glide = new Glide(widgetSelector, {
    type: "slider",
    startAt: 0,
    perView: perView,
    breakpoints: {
      768: {
        perView: 1,
      },
    },
  });

  glide.on("mount.after", function () {
    const leftArrow = sdk.placement.querySelector<HTMLButtonElement>(
      ".glide__arrow--left",
    );
    if (!leftArrow) {
      throw new Error("Failed to find left arrow UI element");
    }

    if (glide.index === 0) {
      leftArrow.disabled = true;
    }
  });

  glide.on("run", function () {
    const prevButton = sdk.placement.querySelector<HTMLButtonElement>(
      ".glide__arrow--left",
    );
    const nextButton = sdk.placement.querySelector<HTMLButtonElement>(
      ".glide__arrow--right",
    );

    if (!prevButton || !nextButton) {
      throw new Error("Failed to find arrow UI elements");
    }

    prevButton.disabled = false;
    nextButton.disabled = false;

    if (glide.index === 0) {
      prevButton.disabled = true;
    }
  });

  glide.mount();
}
