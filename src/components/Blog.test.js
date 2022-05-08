import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> component displays title and author by default, but not likes and url', () => {
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
	render(<Blog
		blog={testBlog}
		handleLike={handleLike}
		handleDelete={handleDelete}
		currentUser={testUser}/>)
	screen.debug()
	const title = screen.getByText('Jest test is the best', { exact: false })
	const author = screen.getByText('Mr React', { exact: false })
	const likes = screen.getByText('5', { exact: false })
	const url = screen.getByText('react.js', { exact: false })
	expect(title).toBeVisible()
	expect(author).toBeVisible()
	expect(likes).not.toBeVisible()
	expect(url).not.toBeVisible()
})