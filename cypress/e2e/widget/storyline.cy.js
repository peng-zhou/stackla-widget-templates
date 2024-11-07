describe("Should test the direct-uploader", () => {
  it("Should pass default tests", () => {
    cy.widgetTests("storyline")
  })

  it("Should display timephrase in the tile", () => {
    cy.visitWidget("storyline")

    cy.getFirstTile().find(".tile-timephrase").should("exist").invoke("text").should("not.be.empty")
  })
})
