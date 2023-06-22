export default {
  login: ({ email, password }) => {
    cy.get('#login-button').should('have.text', 'Увійти');
    cy.get('#login-button').click();
    cy.get('#loginModal').within(() => {
      cy.get('[name=email]').type(email);
      cy.get('[name=password]').type(password);
    });
    cy.get('#loginModal').find('form').submit();
  },
  logout: () => {
    cy.get('#login-button').click();
    cy.get('#login-button').should('have.text', 'Увійти');
  },
};
