import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

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
          onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
          type="password" 
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
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
          <NewBlogForm handleNew={handleNewBlog}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App
