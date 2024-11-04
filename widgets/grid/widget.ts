import { loadAllUnloadedTiles } from "@stackla/widget-utils/dist/libs/extensions/swiper/loader.extension"
import { loadSettings } from "./widget.settings"
import { loadTemplates } from "./widget.templates"

loadTemplates()
loadSettings()
loadAllUnloadedTiles()
