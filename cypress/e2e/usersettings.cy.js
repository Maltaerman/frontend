/* eslint-disable cypress/unsafe-to-chain-command */
describe('user settings', () => {
  before(() => {
    cy.fixture('users.json').then(({ superAdmin }) => {
      this.user = superAdmin;
    });
  });

  it('check if the user can access settings tab and all the disabled elements are rendered correctly', () => {
    cy.visit('/');
    cy.login(this.user);

    cy.get('#settings').click();
    cy.get('body').find('#userSettings').should('be.visible');

    cy.get('#setting-mail').should('be.disabled');
    cy.get('#updateData').should('be.disabled');
  });

  it('check if the user can change his name', () => {
    const uuid = () => Cypress._.random(0, 100);
    const id = uuid();
    const testname = `testname${id}`;

    cy.get('#setting-name').clear().type(testname);
    cy.get('#updateData').should('not.be.disabled');
    cy.get('#updateData').click();
    cy.intercept('/http_client/v1/users/info', (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.eq(200);
      });
    });
    cy.get('#updateData').should('be.disabled');
  });

  it('checks if the password change works', () => {
    cy.get('#passChangeBlock').should('not.be.visible');
    cy.get('#updatePassword').click();
    cy.get('#passChangeBlock').should('be.visible');
    cy.get('#changePassButton').should('be.disabled');
    cy.get('#setting-pass').type(this.user.password);
    cy.get('#setting-new-pass').type(this.user.password);
    cy.get('#changePassButton')
      .should('not.be.disabled')
      .click()
      .should('be.disabled');
  });

  it('checks that the modal closes', () => {
    cy.get('#close-settings').click();
    cy.get('body').find('#userSettings').should('not.exist');
  });
});
