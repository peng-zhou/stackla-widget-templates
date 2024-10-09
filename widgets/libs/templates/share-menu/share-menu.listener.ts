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
  const shareExitButton = shareMenuWrapper.querySelector<HTMLElement>(".share-modal-exit")
  const panelOverlay = tile.querySelector<HTMLElement>(".panel-overlay")
  const panelRightWrapper = tile.querySelector<HTMLElement>(".panel-right-wrapper")
  const navigationParent = tile.parentElement?.parentElement?.parentElement
  const navigationPrevButton = navigationParent?.querySelector<HTMLElement>(".swiper-expanded-button-prev")
  const navigationNextButton = navigationParent?.querySelector<HTMLElement>(".swiper-expanded-button-next")
  const exitTileButton = navigationParent?.querySelector<HTMLElement>(".exit")

  if (shareExitButton) {
    shareExitButton.addEventListener("click", shareExitButtonEvent => {
      shareExitButtonEvent.preventDefault()
      shareExitButtonEvent.stopPropagation()
      shareMenuWrapper.style.display = "none"
      panelOverlay?.classList.remove("active")
      navigationNextButton?.classList.remove("swiper-button-disabled")
      navigationPrevButton?.classList.remove("swiper-button-disabled")

      if (panelRightWrapper) {
        panelRightWrapper.removeAttribute("style")
      }
      if (exitTileButton) {
        exitTileButton.removeAttribute("style")
      }
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
    const panelRightWrapper = tile.querySelector<HTMLElement>(".panel-right-wrapper")
    const navigationParent = tile.parentElement?.parentElement?.parentElement
    const navigationPrevButton = navigationParent?.querySelector<HTMLElement>(".swiper-expanded-button-prev")
    const navigationNextButton = navigationParent?.querySelector<HTMLElement>(".swiper-expanded-button-next")
    const exitTileButton = navigationParent?.querySelector<HTMLElement>(".exit")

    if (!wrapper) {
      throw new Error("Share menu wrapper not found")
    }
    wrapper.style.display = "block"
    panelOverlay?.classList.add("active")
    navigationNextButton?.classList.add("swiper-button-disabled")
    navigationPrevButton?.classList.add("swiper-button-disabled")

    if (panelRightWrapper) {
      panelRightWrapper.style.overflow = "unset"
    }
    if (exitTileButton) {
      exitTileButton.style.opacity = "0.4"
    }
    addShareMenuListeners(wrapper, tile)
  })
}
