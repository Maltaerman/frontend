import WelcomeScreen from "../../src/components/WelcomeScreen/WelcomeScreen.vue";

it("welcome screen should exist", () => {
  let inp = cy.get("input");
  inp.type("Hostomel");
  inp.trigger("keydown", {
    key: "Enter",
  });
});
