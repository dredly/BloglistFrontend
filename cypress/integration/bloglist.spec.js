describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Root User",
      username: "root",
      password: "miguel",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("miguel");
      cy.get("#loginButton").click();

      cy.contains("Root User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("wrong");
      cy.get("#loginButton").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Root User logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "miguel" });
    });

    it("A blog can be created", function () {
      cy.contains("add a new blog").click();

      cy.get("#titleInput").type("Blog by Cypress");
      cy.get("#authorInput").type("Cypress Hill");
      cy.get("#urlInput").type("google.com");

      cy.get("#submitButton").click();
      cy.contains("Blog by Cypress");
    });

    describe("and a blog has already been created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test Blog",
          author: "Albert Einstein",
          url: "blog.com",
        });
      });

      it("The user can like the blog", function () {
        cy.contains("Test Blog").contains("view").click();
        cy.get(".likeButton").click();
        cy.contains("1 likes");
      });

      it("The user who created it can delete it", function () {
        cy.contains("Test Blog").contains("view").click();
        cy.get(".deleteButton").click();
        cy.contains("Successfully deleted");
        cy.get("html").should("not.contain", "Test Blog");
      });

      it("a different user who has not created it cannot delete it", function () {
        const otherUser = {
          name: "Other User",
          username: "other",
          password: "ou123",
        };
        cy.request("POST", "http://localhost:3003/api/users", otherUser);
        cy.visit("http://localhost:3000");
        cy.login({ username: "other", password: "ou123" });

        cy.contains("Test Blog").contains("view").click();
        cy.get(".deleteButton").should("not.be.visible");
      });
    });

    describe("and there are multiple blogs with different numbers of likes", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Most liked",
          author: "Albert Einstein",
          url: "blog.com",
          likes: 10,
        });
        cy.createBlog({
          title: "Second most liked",
          author: "Albert Einstein",
          url: "blog.com",
          likes: 8,
        });
        cy.createBlog({
          title: "Least liked",
          author: "Albert Einstein",
          url: "blog.com",
          likes: 1,
        });
        cy.createBlog({
          title: "Third most liked",
          author: "Albert Einstein",
          url: "blog.com",
          likes: 6,
        });
      });

      it("the blogs are ordered by number of likes, descending", function () {
        cy.get(".blog0").should("contain", "Most liked");
        cy.get(".blog1").should("contain", "Second most liked");
        cy.get(".blog3").should("contain", "Least liked");
      });
    });
  });
});
