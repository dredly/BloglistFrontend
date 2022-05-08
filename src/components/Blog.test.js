import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let testContainer

beforeEach(() => {
	const testUser = {
		name: 'Joe',
		username: 'joem123'
	}
	const testBlog = {
		title: 'Jest test is the best',
		author: 'Mr React',
		url: 'react.js',
		likes: 5,
		user: testUser
	}
	const [handleLike, handleDelete] = [jest.fn(), jest.fn()]
	const { container } = render(<Blog
		blog={testBlog}
		handleLike={handleLike}
		handleDelete={handleDelete}
		currentUser={testUser}/>)
	testContainer = container
})

test('<Blog /> component displays title and author by default, but not likes and url', () => {
	const title = screen.getByText('Jest test is the best', { exact: false })
	const author = screen.getByText('Mr React', { exact: false })
	const likes = screen.getByText('5', { exact: false })
	const url = screen.getByText('react.js', { exact: false })
	expect(title).toBeVisible()
	expect(author).toBeVisible()
	expect(likes).not.toBeVisible()
	expect(url).not.toBeVisible()
})

test('url and number of likes are shown when user clicks on show details button', async () => {
	const showButton = testContainer.querySelector('.showButton')
	const user = userEvent.setup()

	await user.click(showButton)

	const likes = screen.getByText('5', { exact: false })
	const url = screen.getByText('react.js', { exact: false })

	expect(likes).toBeVisible()
	expect(url).toBeVisible()
})