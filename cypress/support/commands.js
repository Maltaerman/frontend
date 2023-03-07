import { mount } from "cypress/vue";
import i18n from "../../src/libs/i18n/index.js";

Cypress.Commands.add("mount", (component, options = {}) => {
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];

  options.global.plugins.push({
    install(app) {
      app.use(i18n);
    },
  });

  return mount(component, options);
});

Cypress.Commands.add("login", (user) => {
  cy.get("#loginButton").click();
  cy.get("#loginModal").within(() => {
    cy.get("[name=email]").clear().type(user.email);
    cy.get("[name=password]").clear().type(user.password);
  });
  cy.get("#loginModal").find("#loginButton").click();
  cy.get("#loginModal").should("not.exist");
  cy.get("#loginButton").should("not.exist");
  cy.get("#logoutButton").should("exist");
});

Cypress.Commands.add("logout", () => {
  cy.get("#logoutButton").click();
  cy.get("#logoutButton").should("not.exist");
  cy.get("#loginButton").should("exist");
});
