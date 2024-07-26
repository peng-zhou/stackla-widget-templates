function createHTMLElement(tagName: string, attributes: { [key: string]: string }) {
  const element = window.document.createElement(tagName)
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  return element
}

const elementsArray = [
  createHTMLElement("div", {
    class: "ugc-tile glide__slide--active",
    "data-id": "666f8566f7e6e366ff94950c",
    "data-media": "image"
  }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "666f85670a419d4141d93a72", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "666f85670a419d4141d93a73", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "664d3b886babcbcc9d1cd3c6", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "664d38b816b47ee23a87a906", "data-media": "video" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "663c6042b9efaa8aa8c83b58", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "663c5fc1fb4665d2c08fb5c6", "data-media": "video" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "663acab1b9efaa8aa8c04d3a", "data-media": "video" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "66385720b9efaa8aa8b3fb81", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "663446ee465f69fc54b9d979", "data-media": "video" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "662ef5aee597448d28a18eff", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "662ef5af78010b7d1341b451", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "662ef2dde597448d28a18eed", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "660c0fcb0bb2b1a5f8374838", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "65fbafbe07342cf97a9664aa", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "65f11b4c862b1b955ded771f", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "65e7ce8b4158f4dcca9faa73", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "65e7b26754828ba0581bfba6", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "65e7acc8829275b233b9d7df", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb01923ba2b0dc838235", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb03923ba2b0dc838250", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb02eb97b6b0db9f166b", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb03eb97b6b0db9f167a", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb02eb97b6b0db9f166d", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb02e223d5b0ea066bbc", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb01923ba2b0dc838237", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb019be806b0f4287437", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb03eb97b6b0db9f167d", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb019be806b0f4287439", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb02923ba2b0dc838246", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb01e223d5b0ea066bb1", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb02e223d5b0ea066bbb", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb01eb97b6b0db9f1661", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb02e223d5b0ea066bbf", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb01eb97b6b0db9f1662", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb039be806b0f428744b", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb01e223d5b0ea066bb4", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb02e223d5b0ea066bb6", "data-media": "image" }),
  createHTMLElement("div", { class: "ugc-tile", "data-id": "607fbb03923ba2b0dc83824d", "data-media": "image" })
]

export default elementsArray
