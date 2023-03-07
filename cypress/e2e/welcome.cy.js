// describe('language-changing', () => {
//   it('checks if language is changing', () => {
//     cy.visit('http://localhost:5173/');
//
//     const langChangerButton = cy.get('#dropButton');
//     langChangerButton.should('have.text', 'Українська');
//     langChangerButton.click()
//
//     cy.contains('English').click()
//     langChangerButton.should('have.text', 'English');
//   });
// });

describe("search-input", () => {
  it("checks if search input is accessible and working", () => {
    cy.visit("http://localhost:5173/");

    const searchInput = cy.get("input");

    searchInput.type("Вінниця");
    searchInput.invoke("val").should("eq", "Вінниця");

    // checking if the autocomplete feature is working
    // currently this test has no point, coz pac-container is hidden in dom all the time
    // check for the queries?
    cy.get(".pac-container");

    const closeButton = cy.get("#close-button");
    closeButton.click();

    searchInput.should("be.empty");
  });
});

describe("google-autocomplete", () => {
  it("checks if the autocomplete suggestion is clickable and redirects successfully", () => {
    cy.visit("http://localhost:5173/");

    const searchInput = cy.get("input");

    searchInput.type("Вінниця");
    searchInput.invoke("val").should("eq", "Вінниця");

    // checking if the autocomplete feature is working
    cy.get(".pac-container");
    cy.get(".pac-item-query").first().click();

    cy.url().should("eq", "http://localhost:5173/main/overview");
  });
});
