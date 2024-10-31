import { UserContentTemplate as template } from "./user-content.template"
import userContentStyles from "./user-content.scss"

export default class UserContentComponent extends HTMLElement {
  static observedAttributes = ["avatar", "user", "original-url", "message", "source-created-at"]

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    const avatar = this.getAttribute("avatar")
    const user = this.getAttribute("user")
    const originalUrl = this.getAttribute("original-url") || "#"
    const message = this.getAttribute("message") || ""
    const sourceCreatedAt = Number(this.getAttribute("source-created-at"))

    this.shadowRoot?.appendChild(
      template({
        avatar,
        user,
        originalUrl,
        message,
        sourceCreatedAt
      })
    )
    const cssStyleSheet = new CSSStyleSheet()
    cssStyleSheet.replaceSync(userContentStyles)
    this.shadowRoot?.adoptedStyleSheets.push(cssStyleSheet)
  }

  disconnectedCallback() {
    this.shadowRoot?.replaceChildren()
  }
}

customElements.define("user-content", UserContentComponent)
