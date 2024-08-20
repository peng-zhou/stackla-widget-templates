import UserInfo from "./UserInfo"
import Timestamp from "./Timestamp"
import Caption from "./Caption"
import Footer from "./Footer"
import { createElement } from "@stackla/ugc-widgets/src/ui/core/utils/jsx-html"
import { ExpandedTileProps } from "widgets/nightfall/types/ExpandedTileProps"

export default ({ tile, widgetSettings }: ExpandedTileProps) => (
  <div class="panel-right">
    <div class="panel-right-wrapper">
      <div class="content-wrapper">
        <div class="content-inner-wrapper">
          <UserInfo tile={tile} widgetSettings={widgetSettings} />
          <Timestamp tile={tile} widgetSettings={widgetSettings} />
          <Caption tile={tile} widgetSettings={widgetSettings} />
          <Footer tile={tile} widgetSettings={widgetSettings} />
        </div>
      </div>
    </div>
  </div>
)
