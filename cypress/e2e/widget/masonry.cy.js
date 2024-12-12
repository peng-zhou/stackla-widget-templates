const WIDGET_TYPE = "masonry"

describe("Should test the masonry", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", () => {
      return false
    })
    cy.visitWidget(WIDGET_TYPE)
    cy.before()
  })

  it("Should show widget contents", () => {
    cy.widgetSnapshot(WIDGET_TYPE)
  })

  it("Should expand tile", () => {
    cy.shouldExpandedTile(WIDGET_TYPE)
    cy.expandedTileSnapshot(WIDGET_TYPE)
  })

  it("Should load share icons", () => {
    cy.shouldLoadShareMenu(WIDGET_TYPE)
  })
})
