import { loadAllUnloadedTiles } from "@widgets/libs/extensions/swiper/loader.extension"
import { loadWidgetSettings } from "./widget.settings"
import { loadCustomisation } from "./widget.templates"
import { getQuadrantTiles } from "./quadrant.lib"

loadCustomisation()
loadWidgetSettings()
loadAllUnloadedTiles()
getQuadrantTiles()
