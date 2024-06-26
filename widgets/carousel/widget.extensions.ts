import { Sdk } from "@stackla/types";

declare const sdk: Sdk;

// TODO - Declare type
declare const Glide;

export function initializeGlide(widgetSettings) {
    const tileWidth = 240;
    const screenSize = window.innerWidth;
    const perView = !widgetSettings.enable_custom_tiles_per_page
      ? Math.floor(screenSize / tileWidth)
      : widgetSettings.tiles_per_page;
  
    const glide = new Glide(sdk.placement.querySelector('.glide'), {
      type: 'slider',
      startAt: 0,
      perView: perView,
      breakpoints: {
        768: {
          perView: 1,
        },
      },
    });
  
    glide.on('mount.after', function () {
      if (glide.index === 0) {
        sdk.placement.querySelector('.glide__arrow--left').disabled = true;
      }
    });
  
    glide.on('run', function () {
      const prevButton = sdk.placement.querySelector('.glide__arrow--left');
      const nextButton = sdk.placement.querySelector('.glide__arrow--right');
  
      prevButton.disabled = false;
      nextButton.disabled = false;
  
      if (glide.index === 0) {
        prevButton.disabled = true;
      }
  
      if (glide.index === glide.length - 1) {
        nextButton.disabled = true;
      }
    });
  
    glide.mount();
  }