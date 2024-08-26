import { Sdk } from "@stackla/ugc-widgets"

declare const sdk: Sdk

export function waitForElement(selector: string, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const interval = 100
    const timer = setInterval(() => {
      const element = sdk.querySelector(selector)
      if (element) {
        resolve(element)
        clearInterval(timer)
      }
    }, interval)
    setTimeout(() => {
      clearInterval(timer)
      reject(new Error(`Failed to find element with selector: ${selector}`))
    }, timeout)
  })
}
