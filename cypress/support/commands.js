Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then((response) => {
    localStorage.setItem("loggedBlogListUser", JSON.stringify(response.body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes = 0 }) => {
  const token = JSON.parse(localStorage.getItem("loggedBlogListUser")).token;
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  cy.visit("http://localhost:3000");
});
