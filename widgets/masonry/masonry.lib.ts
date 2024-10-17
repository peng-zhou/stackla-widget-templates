import { Sdk } from "@stackla/ugc-widgets"
import { refreshMasonryLayout } from "@widgets/libs/extensions/masonry.extension"

declare const sdk: Sdk

export const preloadTileBackgroundImages = async (): Promise<void> => {
  const ugcTiles = sdk.querySelectorAll<HTMLElement>(".grid-item .tile[data-background-image]") ?? [];
  
  await Promise.all(Array.from(ugcTiles).map((tile: HTMLElement) => {
    return new Promise<void>((resolve, reject) => {
      const image = tile.getAttribute('data-background-image');
      
      if (!image) {
        resolve();
        return;
      }

      const preload = new Image();
      preload.src = image;
      
      preload.onload = () => {
        tile.removeAttribute('data-background-image');
        tile.style.backgroundImage = `url(${image})`;
        resolve();
      };

      preload.onerror = () => {
        const parent = tile.parentElement;
        if (parent) {
          parent.remove();
        }
        refreshMasonryLayout(true);
        console.error(`Failed to load image ${image}`);
        reject(new Error(`Failed to load image ${image}`));
      };
    });
  }));
};

export const resizeAllUgcTiles = (() => {
  let rows = 1;
  let totalWidth = 0;

  return function() {
    const ugcTiles = Array.from(sdk.querySelectorAll<HTMLElement>(".grid-item") ?? []).filter(tile => tile.getAttribute('width-set') !== 'true');

    if (!ugcTiles || ugcTiles.length === 0) {
      return;
    }

    const screenWidth = window.innerWidth;
    let possibleWidths: number[];
    let minWidth = 250; 
    let maxWidth = 350;

    if (screenWidth >= 1200) {
      minWidth = 250;
      maxWidth = 350;
    } else if (screenWidth >= 768) {
      minWidth = 200;
      maxWidth = 300;
    } else {
      minWidth = 150;
      maxWidth = 250;
    }

    const generateWidthBasedOnScreen = (minWidth: number, maxWidth: number) => {
      const numberOfWidths = Math.floor(screenWidth / minWidth);

      const widthsArray = Array.from({ length: numberOfWidths }, (_, index) => {
          return minWidth + index * 50;
      });

      const validWidths = widthsArray.filter(width => width <= maxWidth);

      return validWidths;
    }

    ugcTiles.forEach((tile: HTMLElement) => {
      let widths = generateWidthBasedOnScreen(minWidth, maxWidth);
      let randomWidth = widths[Math.floor(Math.random() * widths.length)] - 50;
      const rowWidth = sdk.querySelector("#nosto-ugc-container")?.clientWidth! - 80
      
      if (totalWidth !== 0 && randomWidth + totalWidth >= rowWidth) {
        const mutatedRandomWidth = rowWidth - totalWidth;
        if (mutatedRandomWidth > 0 && mutatedRandomWidth >= 100) {
          randomWidth = mutatedRandomWidth;
        }
        totalWidth = 0;
        rows++;
      } else {
        totalWidth += randomWidth;
      }

      tile.style.width = `${randomWidth}px`;
      tile.setAttribute('width-set', 'true');
      tile.setAttribute('row', `${rows}`);

      refreshMasonryLayout(false);
      
      possibleWidths = widths.filter(width => width !== randomWidth);
    });
  };
})();
