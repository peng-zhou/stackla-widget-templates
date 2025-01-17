/* eslint-disable cypress/no-unnecessary-waiting */
Cypress.Commands.add("shouldLoadShareMenu", widgetType => {
  cy.getFirstTile(widgetType).should("exist").click({ force: true })

  cy.wait(1000)

  cy.getExpandedTile().find(".share-button").first().should("exist").click({ force: true })

  cy.getExpandedTile()
    .find(".share-socials-popup-wrapper")
    .find(".url-copy")
    .should("exist")
    .find(".copy-button")
    .first()
    .should("exist")
    .click({ force: true })

  cy.getExpandedTile()
    .find(".share-socials-popup-wrapper")
    .first()
    .should("exist")
    .find(".share-modal-exit")
    .should("exist")
    .click({ force: true })

  cy.getExpandedTile().find(".share-socials-popup-wrapper").first().should("not.be.visible")
})
