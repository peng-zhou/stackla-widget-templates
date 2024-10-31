import { ISdk } from "@stackla/public-types"
import { waitForElement } from "widgets/libs/widget.utils"
declare const sdk: ISdk

export async function onTileClose() {
  await waitForElement(".ugc-tiles", 3000)
  const ugcTiles = sdk.querySelector(".ugc-tiles")

  if (!ugcTiles) {
    throw new Error("Failed to find tiles wrapper")
  }

  ugcTiles.style.display = "flex"
}
