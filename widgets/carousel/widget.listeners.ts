import { Sdk } from "@stackla/types";
import { initializeGlide } from "./widget.extensions";
import { handleTileClick } from "./widget.handlers";
import { loadTileExpandArrows } from "./widget.features";

declare const sdk: Sdk;

export function registerLoadListener(widgetSettings) {
    const arrows = sdk.querySelector('.glide__arrows');

    sdk.addEventListener('load', () => {
        sdk.querySelector('.ugc-tiles').classList.add('glide__slides');
        sdk.querySelector('#tiles').style.display = '';
        const showWidget = true;
        if (showWidget) {
            initializeGlide(widgetSettings);
        }
      
        window.addEventListener('resize', function () {
          if (showWidget) {
            initializeGlide(widgetSettings);
          }
        });
        arrows.style.display = 'inline-block';
      });
}


export function registerTileClickEventListeners(widgetSettings) {
    const urlPattern = /^https?:\/\/.+/;
    sdk.querySelectorAll('.ugc-tile').forEach((tile : HTMLElement) => {
      tile.onclick = (e) => {
          handleTileClick(e, urlPattern.test(widgetSettings.click_through_url) ? widgetSettings.click_through_url : null);
      };
    });
}

export function registerTileExpandListener() {
    sdk.addEventListener('tileExpand', () => {
        loadTileExpandArrows();
    });
}

export function registerTileClosedListener() {
    sdk.addEventListener('expandedTileClose', () => {
        const arrows = sdk.querySelector('.tile-arrows');
        arrows.style.display = 'block';
    });
}