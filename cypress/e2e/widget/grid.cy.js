describe("Should test the grid", () => {
  it("Should pass default tests", () => {
    cy.widgetTests("grid")
  })

  it("Should display timephrase in the tile", () => {
    cy.visitWidget("grid")

    cy.getFirstTile().find(".tile-timephrase").should("exist").invoke("text").should("not.be.empty")
  })
})
