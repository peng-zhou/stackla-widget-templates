import { loadAllUnloadedTiles } from "@stackla/widget-utils/dist/libs/extensions/swiper/loader.extension"
import { loadWidgetSettings } from "./widget.settings"
import { loadCustomisation } from "./widget.templates"

loadCustomisation()
void loadWidgetSettings()
loadAllUnloadedTiles()
