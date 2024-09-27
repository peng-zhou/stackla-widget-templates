import { useClipboard } from "@libs/clipboard-polyfills"

export async function copyToClipboard(inputElement: HTMLInputElement) {
  try {
    const writeText = useClipboard()
    await writeText(inputElement)
    const buttonElement = inputElement.closest(".url-copy")?.querySelector<HTMLElement>(".copy-button")
    if (buttonElement) {
      buttonElement.textContent = "Copied"
      setInterval(() => {
        buttonElement.textContent = "Copy"
      }, 2000)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to copy text: ", err)
  }
}

function addShareMenuListeners(shareMenuWrapper: HTMLElement, tile: Element) {
  // Exit button listener
  const exitButton = shareMenuWrapper.querySelector<HTMLElement>(".exit")
  const panelOverlay = tile.querySelector<HTMLElement>(".panel-overlay")
  if (exitButton) {
    exitButton.addEventListener("click", exitButtonEvent => {
      exitButtonEvent.preventDefault()
      exitButtonEvent.stopPropagation()
      shareMenuWrapper.style.display = "none"
      panelOverlay?.classList.remove("active")
    })
  }

  // copy to clipboard listener
  const clipboardElement = shareMenuWrapper.querySelector<HTMLElement>(".url-copy .copy-button")
  const shareUrlElement = shareMenuWrapper.querySelector<HTMLInputElement>(".url-copy .share-url")

  if (shareUrlElement && clipboardElement) {
    clipboardElement.addEventListener("click", () => copyToClipboard(shareUrlElement))
  }
}

export function registerExpandedTileShareMenuListeners(shareButtonElement: HTMLElement, tile: Element) {
  shareButtonElement.addEventListener("click", (shareButtonEvent: MouseEvent) => {
    shareButtonEvent.preventDefault()
    shareButtonEvent.stopPropagation()
    const wrapper = tile.querySelector<HTMLElement>(".share-socials-popup-wrapper")
    const panelOverlay = tile.querySelector<HTMLElement>(".panel-overlay")
    if (!wrapper) {
      throw new Error("Share menu wrapper not found")
    }
    wrapper.style.display = "block"
    panelOverlay?.classList.add("active")
    addShareMenuListeners(wrapper, tile)
  })
}
