import { loadAllUnloadedTiles } from "@stackla/widget-utils/dist/libs/extensions/swiper/loader.extension"
import { loadSettings } from "./widget.settings"
import { loadCustomisation } from "./widget.templates"
import { getQuadrantTiles } from "./quadrant.lib"

loadCustomisation()
loadSettings()
loadAllUnloadedTiles()
getQuadrantTiles()
