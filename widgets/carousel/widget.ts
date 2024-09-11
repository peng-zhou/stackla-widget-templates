import { loadCustomisation } from "./widget.templates"
import { loadSettings } from "./widget.settings"
import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk
loadSettings()
loadCustomisation()
