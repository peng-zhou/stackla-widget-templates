import { createElement, ISdk, loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import "./direct-uploader.component"

declare const sdk: ISdk

const style = document.createElement("style")

sdk.placement.getShadowRoot().appendChild(style)

loadWidget({
  type: "direct-uploader",
  extensions: {},
  features: {
    handleLoadMore: false
  },
  callbacks: {
    onLoad: [() => createSubmitMoreContentBtn()],
    onTilesUpdated: [() => createSubmitMoreContentBtn()]
  },
  templates: {
    "expanded-tiles": {
      styles: [
        {
          css: shopspotStyle,
          global: true
        }
      ]
    }
  }
})

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
