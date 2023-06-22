describe('search-input', () => {
  it('checks if search input is accessible and working', () => {
    cy.visit('/');

    cy.get('input').type('Вінниця');
    cy.get('input').invoke('val').should('eq', 'Вінниця');

    // checking if the autocomplete feature is working
    // currently this test has no point, coz pac-container is hidden in dom all the time
    // check for the queries?
    cy.get('.pac-container');

    cy.get('#close-button').click();

    cy.get('input').should('be.empty');
  });
});

describe('google-autocomplete', () => {
  it('checks if the autocomplete suggestion is clickable and redirects successfully', () => {
    cy.visit('/');

    cy.window().should('have.property', 'app');

    cy.get('input').type('Hostomel');
    cy.get('input').invoke('val').should('eq', 'Hostomel');

    // checking if the autocomplete feature is working
    cy.get('.pac-container');
    cy.get('.pac-item-query').first().click();
    cy.url().should('contain', 'http://localhost:5173/main/overview');
  });
});
