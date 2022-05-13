/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState({})

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async evt => {
		evt.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBlogListUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setMessage({
				content: 'Successful login',
				messageType: 'success'
			})
			setTimeout(() => {
				setMessage({})
			}, 3000)
		} catch (exception) {
			setMessage({
				content: 'Wrong credentials',
				messageType: 'error'
			})
			setTimeout(() => {
				setMessage({})
			}, 3000)
		}
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.removeItem('loggedBlogListUser')
	}

	const handleNewBlog = async (evt, blogObj) => {
		evt.preventDefault()
		blogFormRef.current.toggleVisibility()
		try {
			const returnedBlog = await blogService.create(blogObj)
			setBlogs(blogs.concat(returnedBlog))
			setMessage({
				content: `A new blog - ${returnedBlog.title} - added`,
				messageType: 'success'
			})
			setTimeout(() => {
				setMessage({})
			}, 3000)
		} catch (err) {
			setMessage({
				content: err.response.data.error,
				messageType: 'error'
			})
			setTimeout(() => {
				setMessage({})
			}, 3000)
		}
	}

	const likeBlog = async blog => {
		const id = blog.id
		console.log(id)
		const returnedBlog = await blogService.update(id, { ...blog, likes: blog.likes + 1 })
		const returnedBlogUser = await userService.getOne(returnedBlog.user)
		returnedBlog.user = returnedBlogUser
		setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
	}

	const deleteBlog = async blogId => {
		if (window.confirm('Are you sure you want to delete this?')) {
			try {
				await blogService.deleteBlog(blogId)
				setBlogs(blogs.filter(b => b.id !== blogId))
				setMessage({
					content: 'Successfully deleted',
					messageType: 'success'
				})
				setTimeout(() => {
					setMessage({})
				}, 3000)
			} catch (err) {
				setMessage({
					content: err.response.data.error,
					messageType: 'error'
				})
				setTimeout(() => {
					setMessage({})
				}, 3000)
			}
		}
	}

	const loginForm = () => (
		<>
			<h2>Login to application</h2>
			<form onSubmit={handleLogin}>
				<div>
          username
					<input
						type="text"
						value={username}
						name="Username"
						id="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
          password
					<input
						type="password"
						value={password}
						name="Password"
						id="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit" id="loginButton">Login</button>
			</form>
		</>

	)

	return (
		<div>
			<Notification message={message} />
			{user === null && loginForm()}
			{user !== null &&
			<>
				<h2>blogs</h2>
        		<p>{user.name} logged in.
        			<button onClick={handleLogout}>Log out</button>
        		</p>
        		<Togglable buttonLabel='add a new blog' ref={blogFormRef}>
        			<NewBlogForm handleNew={handleNewBlog}/>
        		</Togglable>
        		{blogs.sort((a, b) => b.likes - a.likes).map((blog, idx) =>
					<div key={blog.id} className={`blog${idx}`}>
						<Blog blog={blog} handleLike={likeBlog} handleDelete={deleteBlog} currentUser={user} />
					</div>
        		)}
			</>}
		</div>
	)
}

export default App
