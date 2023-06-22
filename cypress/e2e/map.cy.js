describe('overview autocomplete', () => {
  it('checks if google autocomplete is working on the overview page', () => {
    cy.visit('/main/overview');
    cy.get('input').type(
      'Зодчих 19, Zodchykh Street, Вінниця, Vinnytsia Oblast, Ukraine',
    );
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input').click().type('{enter}');
  });
});
