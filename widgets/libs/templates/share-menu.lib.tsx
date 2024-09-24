import { Tile } from "@stackla/ugc-widgets"
import { createElement } from "jsx-html"

export function ShareMenu({ tile, component }: { tile: Tile; component: Element }) {
  function toggleModalVisibility(show: boolean) {
    const modalWrapper = component.querySelector(".share-socials-popup-wrapper")
    if (modalWrapper instanceof HTMLElement) {
      modalWrapper.style.display = show ? "block" : "none"
    }
  }

  async function copyToClipboard() {
    const copyText = component.shadowRoot?.querySelector(".share-url")
    if (copyText instanceof HTMLInputElement) {
      try {
        await navigator.clipboard.writeText(copyText.value)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to copy text: ", err)
      }
    }
  }

  return (
    <div>
      <div class="share-socials-popup-wrapper" style={{ display: "none" }}>
        <div class="share-socials-popup">
          <a
            class="exit"
            href="#"
            onClick={e => {
              e.preventDefault()
              toggleModalVisibility(false)
            }}>
            <span class="widget-icon close-white"></span>
          </a>
          <div class="popup-text">Share Now</div>
          <div class="ugc-inline-share-buttons">
            <MenuLink icon="facebook" tile={tile} />
            <MenuLink icon="instagram" tile={tile} />
            <MenuLink icon="x" tile={tile} />
            <MenuLink icon="pinterest" tile={tile} />
            <MenuLink icon="linkedin" tile={tile} />
            <MenuLink icon="email" tile={tile} />
          </div>
          <div class="url-copy">
            <input class="share-url" type="text" id="share-url" value={tile.original_url} readonly />
            <button class="copy-button" data-action="copy" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuLink({ tile, icon }: { tile: Tile; icon: string }) {
  const url = new URL(`https://www.addtoany.com/add_to/${icon}`)
  url.searchParams.append("linkurl", tile.original_url)
  tile.name && url.searchParams.append("linkname", tile.name)
  const href = url.href

  return <a href={href} target="_blank" className={`widget-icon icon-${icon}-share`} />
}
