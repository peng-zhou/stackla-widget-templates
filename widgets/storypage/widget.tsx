import { ISdk, loadWidget } from "@stackla/widget-utils"
import "./direct-uploader.component"
import { calculateTilesToShow, registerResizeObserver, tileSettings } from "./direct-uploader.lib"
import { createElement } from "@stackla/widget-utils/jsx"

declare const sdk: ISdk

loadWidget({
  features: {
    handleLoadMore: false,
    tileSizeSettings: tileSettings,
    limitTilesPerPage: false
  },
  callbacks: {
    onLoad: [() => registerResizeObserver()],
    onTilesUpdate: [() => createSubmitMoreContentBtn()],
    onTileBgImageError: [calculateTilesToShow]
  }
})

createSubmitMoreContentBtn()

function createSubmitMoreContentBtn() {
  const submitMoreContentBtn = (
    <div id="submit-more-content-btn">
      <span class="icon-upload"></span>
      <span>Submit your content</span>
    </div>
  )

  const existingBtn = sdk.querySelector("#submit-more-content-btn")
  existingBtn?.remove()

  sdk.querySelector(".ugc-tiles").appendChild(submitMoreContentBtn)
}
