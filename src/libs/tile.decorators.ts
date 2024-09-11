function makeImagesLazy(html: string) {
  return html.replace(/<img/g, '<img loading="lazy"')
}

function wrapWithTileIdentifier(tileTemplate: string) {
  return `<div style="display: none;" class="ugc-tile" data-id="{{id}}" data-media="{{media}}">${tileTemplate}</div>`
}

export function decorateTile(html: string): string {
    const decorators = [makeImagesLazy, wrapWithTileIdentifier]

    decorators.forEach(decorator => {
      html = decorator(html)
    })

    return html
}