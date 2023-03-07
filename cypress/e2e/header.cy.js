describe("language-changing", () => {
  it("checks if language is changing", () => {
    cy.visit("http://localhost:5173/");

    const langChangerButton = cy.get("#dropButton");
    langChangerButton.should("have.text", "Українська");
    langChangerButton.click();

    cy.contains("English").click();
    langChangerButton.should("have.text", "English");
  });
});

describe("login", () => {
  before(() => {
    cy.fixture("testUser.json").then((user) => {
      this.user = user;
    });
  });
  it("check if the login modal is displayed correctly and login is possible", () => {
    // cy.visit('http://localhost:5173/')
    cy.login(this.user);
  });
});

describe("logout", () => {
  it("checks if the user can logout successfully", () => {
    // cy.login(loginCreds);
    cy.logout();
  });
});
