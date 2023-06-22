describe('language-changing', () => {
  it('checks if language is changing', () => {
    cy.visit('/');

    cy.get('#dropButton').should('have.text', 'Українська');
    cy.get('#dropButton').click();

    cy.contains('English').click();
    cy.get('#dropButton').should('have.text', 'English');
  });
});
