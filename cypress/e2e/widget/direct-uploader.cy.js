describe("Should test the direct-uploader", () => {
  it("Should pass default tests", () => {
    cy.widgetTests("direct-uploader")
  })

  it("Should display timephrase in the tile", () => {
    cy.visitWidget("direct-uploader")

    cy.getFirstTile().find(".tile-timephrase").should("exist").invoke("text").should("not.be.empty")
  })
})
