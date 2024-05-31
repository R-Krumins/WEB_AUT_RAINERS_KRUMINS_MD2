import cred from '../fixtures/demoCredentials.json'

const getCurrentDate = (dd) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return `${dd}/${mm}/${yyyy}`
}

describe("template spec", () => {

  const day = 30;
  const date = getCurrentDate(day);
  const comment = "CURA Healthcare Service";
  const checkBox = "Seoul CURA Healthcare Center";
  
  it("Make an Appointment", () => {
    cy.visit("https://katalon-demo-cura.herokuapp.com/");
    cy.get("#btn-make-appointment").click();

    cy.get("#txt-username").type(cred.username);
    cy.get("#txt-password").type(cred.password);
    cy.get("#btn-login").click();

    cy.get("#combo_facility").select(checkBox);
    cy.get("#chk_hospotal_readmission").check();
    cy.get("#radio_program_medicaid").check();

    cy.get(".input-group-addon").click();
    cy.get(".table-condensed tbody tr td.day").contains(day).click();
    cy.get("#txt_comment").focus().type(comment);
    cy.get("#btn-book-appointment").click();

    cy.get("#facility").should("have.text", checkBox);
    cy.get("#hospital_readmission").should("have.text", "Yes");
    cy.get("#program").should("have.text", "Medicaid");
    cy.get("#visit_date").should("have.text", date);
    cy.get("#comment").should("have.text", comment);
  })

  it("Validate Sidebar and History", () => {
    cy.visit("https://katalon-demo-cura.herokuapp.com/");
    cy.get("#btn-make-appointment").click();

    cy.get("#txt-username").type(cred.username);
    cy.get("#txt-password").type(cred.password);
    cy.get("#btn-login").click();

    cy.get("#menu-toggle").click();
    cy.get("#sidebar-wrapper").should("have.class", "active");
    cy.get(".sidebar-nav").contains("History").click();
    cy.get("#history div.container div div").contains("No appointment.");

  });
})