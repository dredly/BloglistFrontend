import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(
        setNotification(
          {
            content: "Login successful",
            messageType: "success",
          },
          3000
        )
      );
    } catch (exception) {
      dispatch(
        setNotification(
          {
            content: "Wrong credentials",
            messageType: "error",
          },
          3000
        )
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    dispatch(
      setNotification(
        {
          content: "Logged out",
          messageType: "success",
        },
        3000
      )
    );
    window.localStorage.removeItem("loggedBlogListUser");
  };

  const handleNewBlog = async (evt, blogObj) => {
    evt.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(blogObj);
      setBlogs(blogs.concat(returnedBlog));
      dispatch(
        setNotification(
          {
            content: `A new blog - ${returnedBlog.title} - added`,
            messageType: "success",
          },
          3000
        )
      );
    } catch (err) {
      dispatch(
        setNotification(
          {
            content: err.response.data.error,
            messageType: "error",
          },
          3000
        )
      );
    }
  };

  const likeBlog = async (blog) => {
    const id = blog.id;
    const returnedBlog = await blogService.update(id, {
      ...blog,
      likes: blog.likes + 1,
    });
    const returnedBlogUser = await userService.getOne(returnedBlog.user);
    returnedBlog.user = returnedBlogUser;
    setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)));
  };

  const deleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await blogService.deleteBlog(blogId);
        setBlogs(blogs.filter((b) => b.id !== blogId));
        dispatch(
          setNotification(
            {
              content: "Successfully deleted",
              messageType: "success",
            },
            3000
          )
        );
      } catch (err) {
        dispatch(
          setNotification({
            content: err.response.data.error,
            messageType: "error",
          })
        );
      }
    }
  };

  return (
    <div>
      <Notification />
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user !== null && (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in.
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable buttonLabel="add a new blog" ref={blogFormRef}>
            <NewBlogForm handleNew={handleNewBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, idx) => (
              <div key={blog.id} className={`blog${idx}`}>
                <Blog
                  blog={blog}
                  handleLike={likeBlog}
                  handleDelete={deleteBlog}
                  currentUser={user}
                />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default App;
