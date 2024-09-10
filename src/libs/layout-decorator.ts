// TODO - share libs with node-content-v2 nestjs

export default class LayoutTemplateDecorator {
  static wrapLayoutWithTilesIdentifier(tileTemplate: string) {
    // Find the mustache loop for {{#tiles}} and wrap the layout template with a div with class ugc-tiles
    const mustacheLoop = /{{#tiles}}/g
    const match = mustacheLoop.exec(tileTemplate)

    if (match) {
      const index = match.index
      const prefix = tileTemplate.slice(0, index)
      const suffix = tileTemplate.slice(index)
      const wrappedLayout = LayoutTemplateDecorator.wrapWithTilesIdentifier(suffix)
      return `${prefix}${wrappedLayout}`
    }

    return tileTemplate
  }

  private static wrapWithTilesIdentifier(layoutTemplate: string) {
    return `<div class="ugc-tiles">${layoutTemplate}</div>`
  }

  static decorate(html: string): string {
    const decorators = [LayoutTemplateDecorator.wrapLayoutWithTilesIdentifier]

    decorators.forEach(decorator => {
      html = decorator(html)
    })

    return html
  }
}
