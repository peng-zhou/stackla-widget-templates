describe('Should test the carousel', () => {
    let widget = null;
    let shadowRoot = null;

    before(() => {
        cy.visit('http://127.0.0.1:4002/preview?widgetType=carousel');
        widget = cy.get('ugc-widget-668ca52ada8fb');
        shadowRoot = widget.shadow();
    })

    it('should show ugc-tile', () => {
        widget.should('exist');
        shadowRoot
            .find('.ugc-tile')
            .should('have.length', 100);
    })

    it('should expand tile when clicked', () => {
        shadowRoot
            .find('.ugc-tile')
            .first()
            .click();

        const expandedTile = shadowRoot.get('expanded-tile');

        expandedTile.should('exist')

        const expandedTileShadow = expandedTile.shadow();

        expandedTileShadow
            .find('img')
            .should('exist');

        expandedTileShadow.find('.stacklapopup-products-item-title').should('exist');

        expandedTileShadow
            .find('.stacklapopup-products-item-title')
            .invoke('text')
            .should('not.be.empty');
    });
});