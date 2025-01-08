import { Sdk } from "types"

declare const sdk: Sdk

type Key = keyof typeof slidesPerViewByDimension

const slidesPerViewByDimension = {
  // widescreen monitors
  "2000-small": 25,
  "2000-medium": 15,
  "2000-large": 12,

  // desktop monitors
  "1500-small": 20,
  "1500-medium": 13,
  "1500-large": 9,

  // mini desktop landscape modes
  "1300-small": 14,
  "1300-medium": 10,
  "1300-large": 7,

  // mini desktop pcs or Ipad pros
  "993-small": 11,
  "993-medium": 7,
  "993-large": 5,

  // mid size screens
  "800-small": 11,
  "800-medium": 7,
  "800-large": 5,

  // tablet screens
  "500-small": 9,
  "500-medium": 6,
  "500-large": 4,

  // max pro or ultra mobile devices
  "400-small": 6,
  "400-medium": 3,
  "400-large": 2,

  // regular mobile devices
  "300-small": 5,
  "300-medium": 3,
  "300-large": 2
}

export function getSlidesPerView(dimen: number) {
  const {
    enable_custom_tiles_per_page: isCustomTilesPerPageEnabled,
    tiles_per_page: tilesPerPage,
    inline_tile_size: tileSize
  } = sdk.getStyleConfig()

  if (isCustomTilesPerPageEnabled && tilesPerPage) {
    return parseInt(tilesPerPage)
  }

  const key = `${dimen}-${tileSize}` as Key

  if (key in slidesPerViewByDimension) {
    return slidesPerViewByDimension[key]
  }
  return "auto"
}
