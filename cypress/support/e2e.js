// Disabling lint for this file because it is a test helper file particular to Cypress and we don't want to enforce linting rules on it
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

import { addCompareSnapshotCommand } from "cypress-visual-regression/dist/command"

export const WIDGET_ID = "ugc-widget-668ca52ada8fb"

function getUgcTileSelectorByWidgetType(widgetType) {
  switch (widgetType) {
    case "quadrant":
      return ".ugc-tile.processed"
    default:
      return ".ugc-tile"
  }
}

addCompareSnapshotCommand({
  capture: "viewport",
  errorThreshold: 0.08
})

Cypress.Commands.add("before", () => {})

Cypress.Commands.add("waitAndDisableImages", () => {
  cy.wait(8000)

  cy.window().then(window => {
    const tiles = window.ugc.getWidgetBySelector().sdk.querySelectorAll(".tile")
    tiles.forEach(tile => {
      tile.style = ""
      tile.style.border = "1px solid red"
    })

    const images = window.ugc.getWidgetBySelector().sdk.querySelectorAll(".ugc-tile img")
    images.forEach(image => {
      image.style.visibility = "hidden"
    })
  })
})

Cypress.Commands.add("visitWidget", widgetType => {
  cy.intercept(
    "POST",
    "http://localhost:4002/development/widgets/668ca52ada8fb/draft?wid=668ca52ada8fb&limit=25&page=1"
  ).as("getWidget")

  cy.intercept(
    "GET",
    "http://localhost:4002/development/widgets/668ca52ada8fb/tiles?wid=668ca52ada8fb&limit=25&page=1"
  ).as("getTiles")

  cy.visit(`http://localhost:4002/preview?widgetType=${widgetType}`)

  cy.wait("@getWidget")

  cy.get(WIDGET_ID)
    .shadow()
    .find(getUgcTileSelectorByWidgetType(widgetType), { timeout: 10000 })
    .first()
    .should("be.visible", { timeout: 10000 })

  cy.waitAndDisableImages()
})

Cypress.Commands.add("widgetSnapshot", widgetType => {
  cy.snapshot(`${widgetType}-widget`)
})

Cypress.Commands.add("getFirstTile", widgetType => {
  return cy.get(WIDGET_ID).shadow().find(getUgcTileSelectorByWidgetType(widgetType)).first()
})

Cypress.Commands.add("snapshot", name => {
  cy.compareSnapshot(name)
})

Cypress.Commands.add("getProductComponent", expandedTile => {
  return expandedTile.shadow().find("ugc-products")
})

Cypress.Commands.add("shouldExpandedTile", widgetType => {
  cy.getExpandedTile().should("exist")

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(4000)

  cy.getFirstTile(widgetType).click()

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(4000)

  cy.getExpandedTile().should("exist")

  // Set visibility to hidden for all images
  cy.getExpandedTile().find(".image-element").should("exist").invoke("css", "visibility", "hidden")

  cy.wait(1000)

  cy.get(WIDGET_ID).shadow().find(".expanded-tile-overlay").should("exist").invoke("css", "background-color", "#000")

  // eslint-disable-next-line cypress/no-unnecessary-waiting
})

Cypress.Commands.add("expandedTileSnapshot", widgetType => {
  cy.wait(4000)

  cy.getExpandedTile()
    .find(".ugc-tile[data-id='65e16a0b5d7e676caec68f03']")
    .first()
    .should("exist")
    .compareSnapshot(`${widgetType}-tile`)
})

Cypress.Commands.add("getExpandedTile", () => {
  return cy.get(WIDGET_ID).shadow().find("expanded-tiles")
})

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
