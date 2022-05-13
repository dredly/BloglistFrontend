Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username, password
	}).then(response => {
		localStorage.setItem('loggedBlogListUser', JSON.stringify(response.body))
		cy.visit('http://localhost:3000')
	})
})
