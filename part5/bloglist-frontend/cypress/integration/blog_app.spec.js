describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:4000/api/testing/reset");
    const user = {
      username: "vinayak",
      password: "vinayak123",
    };
    cy.request("POST", "http://localhost:4000/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("login", function () {
    it("succeds when correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("vinayak");
      cy.get("#password").type("vinayak123");
      cy.get("#submit").click();
      cy.contains("vinayak logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("vinayak");
      cy.get("#password").type("vinayak1");
      cy.get("#submit").click();
      cy.contains("vinayak logged in").should("not.exist");
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains("login").click();
      cy.get("#username").type("vinayak");
      cy.get("#password").type("vinayak123");
      cy.get("#submit").click();
    })

    it('A blog can be created', function() {
      cy.contains("create new blog").click();
      cy.get("#title").type("test blog 1");
      cy.get("#author").type("test author 1");
      cy.get("#url").type("www.testurl1.in");
      cy.get("#submit").click();
      cy.contains("test blog 1")
    })
  })
});
