/* eslint-disable cypress/no-unnecessary-waiting */
import { WIDGET_ID } from "./e2e"

Cypress.Commands.add("shouldExpandedTile", widgetType => {
  cy.getExpandedTile().should("exist")

  cy.wait(4000)

  cy.getFirstTile(widgetType).click()

  cy.wait(4000)

  cy.getExpandedTile().should("exist")

  // Set visibility to hidden for all images
  cy.getExpandedTile().find(".image-filter").should("exist").invoke("css", "visibility", "hidden")

  cy.wait(1000)

  cy.get("body").should("have.css", "overflow", "hidden")
})

Cypress.Commands.add("expandedTileSnapshot", widgetType => {
  cy.wait(4000)

  cy.getExpandedTile().find(".ugc-tile[data-id='65e16a0b5d7e676caec68f03']").first().should("exist")
  // Broken - To be fixed
  //.compareSnapshot(`${widgetType}-tile`)
})

Cypress.Commands.add("getExpandedTile", () => {
  return cy.get(WIDGET_ID).shadow().find("expanded-tiles")
})
