const store = () => cy.window().its("app.$store");

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

    cy.window().should("have.property", "app");
    console.log(cy.window());

    const searchInput = cy.get("input");

    searchInput.type("Hostomel");
    searchInput.invoke("val").should("eq", "Hostomel");

    // checking if the autocomplete feature is working
    cy.get(".pac-container");
    cy.get(".pac-item-query").first().click();
    cy.url().should("contain", "http://localhost:5173/main/overview");
  });
});
