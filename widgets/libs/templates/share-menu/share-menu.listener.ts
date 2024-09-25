async function copyToClipboard(copyElement: unknown) {
  if (copyElement instanceof HTMLInputElement) {
    try {
      await navigator.clipboard.writeText(copyElement.value)
      const statusElement = copyElement.closest(".url-copy")?.querySelector<HTMLElement>(".copy-status")
      if (statusElement) {
        statusElement.textContent = "Copied!"
        statusElement.style.display = "block"
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy text: ", err)
    }
  }
}

function addShareMenuListeners(shareMenuWrapper: HTMLElement) {
  // Exit button listener
  const exitButton = shareMenuWrapper.querySelector<HTMLElement>(".exit")
  if (exitButton) {
    exitButton.addEventListener("click", (exitButtonEvent: MouseEvent) => {
      exitButtonEvent.preventDefault()
      exitButtonEvent.stopPropagation()
      shareMenuWrapper.style.display = "none"
    })
  }

  // copy to clipboard listener
  const clipboardElement = shareMenuWrapper.querySelector<HTMLElement>(".url-copy .copy-button")
  const shareUrlElement = shareMenuWrapper.querySelector<HTMLInputElement>(".url-copy .share-url")

  if (shareUrlElement && clipboardElement) {
    clipboardElement.addEventListener("click", () => copyToClipboard(shareUrlElement))
  }
}

export function registerExpandedTileShareMenuListeners(shareButtonElement: HTMLElement) {
  shareButtonElement.addEventListener("click", (shareButtonEvent: MouseEvent) => {
    shareButtonEvent.preventDefault()
    shareButtonEvent.stopPropagation()
    const wrapper = shareButtonElement.querySelector<HTMLElement>(".share-socials-popup-wrapper")
    if (!wrapper) {
      throw new Error("Share menu wrapper not found")
    }
    wrapper.style.display = "block"

    addShareMenuListeners(wrapper)
  })
}
