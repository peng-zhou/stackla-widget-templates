export default class TileTemplateDecorator {
  static makeImagesLazy(html: string) {
    return html.replace(/<img/g, '<img loading="lazy"')
  }

  static wrapWithTileIdentifier(tileTemplate: string) {
    return `<div style="display: none;" class="ugc-tile" data-id="{{id}}" data-media="{{media}}">${tileTemplate}</div>`
  }

  static decorate(html: string): string {
    const decorators = [TileTemplateDecorator.makeImagesLazy, TileTemplateDecorator.wrapWithTileIdentifier]

    decorators.forEach(decorator => {
      html = decorator(html)
    })

    return html
  }
}
