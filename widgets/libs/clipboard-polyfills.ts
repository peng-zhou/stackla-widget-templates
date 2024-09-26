// clipboard copy polyfill

export function useClipboard() {
  if (navigator.clipboard) {
    return (text: string) => {
      return navigator.clipboard.writeText(text)
    }
  }

  // compatibility with older browsers
  return () =>
    new Promise<void>(resolve => {
      document.execCommand("copy")
      resolve()
    })
}
