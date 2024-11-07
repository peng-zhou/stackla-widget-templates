import { loadAllUnloadedTiles } from "@stackla/widget-utils/dist/libs/extensions/swiper/loader.extension"
import { loadWidget } from "@stackla/widget-utils"
import shopspotStyle from "./components/shopspot-icon/base.scss"
import "./direct-uploader.component"
import { loadDirectUploaderListeners, loadDirectUploaderTileButton } from "./direct-uploader.lib"

loadWidget({
  extensions: {},
  features: {
    handleLoadMore: false
  },
  callbacks: {
    onTilesUpdated: [
      () => {
        loadDirectUploaderTileButton()
      }
    ]
  },
  templates: {
    "expanded-tiles": {
      style: {
        css: shopspotStyle,
        global: true
      }
    }
  }
})
loadAllUnloadedTiles()
loadDirectUploaderListeners()
