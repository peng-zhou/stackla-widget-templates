// clipboard copy polyfill

export function useClipboard() {
  const writeText = (text: string) => {
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(text)
    }
    // compatibility with older browsers
    return new Promise<void>(resolve => {
      document.execCommand("copy")
      resolve()
    })
  }

  return {
    writeText
  }
}
