describe('Login', () => {
  before(async () => {
    this.users = await cy.fixture('users.json');
  });

  it('Check the validity of users credentials', () => {
    cy.visit('/');
    Object.values(this.users).forEach((user) => {
      cy.login(user);
      cy.logout();
    });
  });
});
