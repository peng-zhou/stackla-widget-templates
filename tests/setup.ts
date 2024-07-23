import { Window } from "happy-dom"

export default () => {
  const window = new Window({ url: "https://localhost:4002" })
  const document = window.document
  document.body.innerHTML += '<div id="ugc-widget" data-wid="62eb2697a8db6"></div>'

  // @ts-expect-error TS2740
  global.window = window
  // @ts-expect-error
  global.document = document
}
