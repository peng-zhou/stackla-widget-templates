const { addCompareSnapshotCommand } = require('cypress-visual-regression/dist/command')

declare namespace Cypress {
    interface Chainable {
      visitWidget: (widgetType: string) => void
      getFirstTile: () => Chainable<JQuery>
      expandedTileTest: (expandedTile: Chainable<JQuery>) => void
      shouldShowTile: (widgetType: string) => void
      shouldExpandedTile: (widgetType: string) => void
      shouldLoadShareMenu: (widgetType: string) => void
      shouldLoadTileContent: (widgetType: string) => void,
      getWidget: () => Chainable<JQuery>,
      getWidgetShadow: () => Chainable<JQuery>,
      getProductComponent: (expandedTile: Chainable<JQuery>) => Chainable<JQuery>,
      snapshot: (name: string) => void
      compareSnapshot: (name: string, options?: Partial<Cypress.ScreenshotOptions>) => void
    }
  }

const WIDGET_ID = "ugc-widget-668ca52ada8fb"

cy.on('uncaught:exception', (err, runnable) => {
  return false
})

addCompareSnapshotCommand({
  capture: 'viewport',
  errorThreshold: 0.01,
});

Cypress.Commands.add("visitWidget", widgetType => {
  cy.visit(`http://localhost:4002/preview?widgetType=${widgetType}`)
})

Cypress.Commands.add("getFirstTile", () => {
  return cy.get(WIDGET_ID).shadow().find(".ugc-tile").first()
})

Cypress.Commands.add("shouldShowTile", widgetType => {
  cy.getFirstTile().should("exist")
  cy.getFirstTile().click();
  cy.wait(3000)
  cy.snapshot(`${widgetType}-tile`);
});

Cypress.Commands.add("snapshot", (name: string) => {
  cy.compareSnapshot(name)
});


Cypress.Commands.add("getProductComponent", expandedTile => {
  return expandedTile.shadow().find("ugc-products")
});

Cypress.Commands.add("expandedTileTest", expandedTile => {
  expandedTile.should("exist")

  const expandedTileShadow = expandedTile.shadow()
  
  cy.getFirstTile().click();

  cy.wait(3000)

  expandedTileShadow.find("img").should("exist")
})

Cypress.Commands.add('getWidget', () => {
  return cy.get(WIDGET_ID)
});

Cypress.Commands.add('getWidgetShadow', () => {
  return cy.getWidget().shadow()
});

Cypress.Commands.add("shouldExpandedTile", widgetType => {
  const shadowRoot = cy.getWidgetShadow()

  const expandedTile = shadowRoot.find("expanded-tiles")
  cy.expandedTileTest(expandedTile)
}
)

// TODO - FIX Share Menu
// Cypress.Commands.add("shouldLoadShareMenu", widgetType => {
//   const expandedTileShadow = cy.getWidgetShadow().find("expanded-tiles").shadow() 

//   const shareButton = expandedTileShadow.find(".share-button")
//   shareButton.should("exist")
//   shareButton.click();

//   const shareMenuWrapper = shareButton.find(".share-socials-popup-wrapper")
//   shareMenuWrapper.should("exist")

//   const urlCopyElement = shareMenuWrapper.find(".url-copy")
//   urlCopyElement.should("exist")
//   urlCopyElement.find(".url-controls .copy-button").should('exist').click()
//   urlCopyElement.find(".copy-button").contains("Copied")

//   shareMenuWrapper.find(".exit").should("exist").click()

//   shareButton.find(".share-socials-popup-wrapper").should("not.exist")
// });

