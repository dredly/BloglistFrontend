describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Root User',
			username: 'root',
			password: 'miguel'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('username')
		cy.contains('password')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('root')
			cy.get('#password').type('miguel')
			cy.get('#loginButton').click()

			cy.contains('Root User logged in')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('root')
			cy.get('#password').type('wrong')
			cy.get('#loginButton').click()

			cy.get('.error')
				.should('contain', 'Wrong credentials')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'Root User logged in')
		})
	})
})