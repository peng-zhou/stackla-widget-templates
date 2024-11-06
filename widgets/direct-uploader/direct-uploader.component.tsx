import { ISdk, createElement } from "@stackla/widget-utils"

declare const sdk: ISdk
declare const WIDGET_ENDPOINT: string
declare const DIRECT_UPLOAD_ENDPOINT: string

const createDUIFrame = (guid: string) => {
  const directUploaderSource = `${DIRECT_UPLOAD_ENDPOINT}/widget/show?v=1&plugin_id=${guid}`

  return <iframe src={directUploaderSource} width="100%" height="100%" frameborder="0"></iframe>
}

const defaultTemplate = (
  <a class="exit" href="#">
    <span class="widget-icon close-white"></span>
  </a>
)

class DirectUploaderWidget extends HTMLElement {
  constructor() {
    super()

    this.appendChild(defaultTemplate)
  }

  async connectedCallback() {
    const widgetId = sdk.placement.getWidgetId()
    const settings = sdk.getStyleConfig()
    const { plugin_instance_id } = settings

    const widgetEndpoint = `${WIDGET_ENDPOINT}/widgets/${widgetId}/direct-uploader/${plugin_instance_id}`

    try {
      const response = await fetch(widgetEndpoint)
      const { guid } = await response.json()

      this.appendChild(createDUIFrame(guid))
    } catch (error) {
      console.error(`Failed to fetch direct uploader widget: ${error}`)
    }
  }
}

customElements.define("direct-uploader", DirectUploaderWidget)
