import LocalizationDropDown from "../../src/components/Other/LocalizationDropDown.vue";

describe('localizationDropdown', () => {

  it('checks that the click expands dropdown', () => {
    cy.mount(LocalizationDropDown);
    cy.get('#current-language').contains('Українська');
    cy.get('#langList').should('have.class', 'h-0');
    cy.get('#dropButton').click();
    cy.get('#langList').should('have.class', 'h-[116px]');
    cy.get('#langList').find('div').contains('English').click();
    cy.get('#current-language').contains('English');
  });

})