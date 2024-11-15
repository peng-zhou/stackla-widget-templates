describe("Should test the carousel", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visitWidget("carousel")
  })

  it("Should show tile", () => {
      cy.shouldShowTile("carousel");
  });

  it('Should expand tile', () => {
     cy.shouldExpandedTile("carousel");
  });

  it("Should display timephrase in the tile", () => {
    cy.getFirstTile().find(".tile-timephrase").should("exist").invoke("text").should("not.be.empty")
  })
})
