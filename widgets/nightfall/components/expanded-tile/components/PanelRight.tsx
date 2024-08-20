import UserInfo from "./UserInfo"
import Timestamp from "./Timestamp"
import Caption from "./Caption"
import Footer from "./Footer"
import { createElement } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { Tile } from "@stackla/ugc-widgets"

export default (tile: Tile) => (
  <div class="panel-right">
    <div class="panel-right-wrapper">
      <div class="content-wrapper">
        <div class="content-inner-wrapper">
          <UserInfo tile={tile} />
          <Timestamp tile={tile} />
          <Caption tile={tile} />
          <Footer tile={tile} />
        </div>
      </div>
    </div>
  </div>
)
