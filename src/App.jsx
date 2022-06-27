import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, addNewBlog } from "./reducers/blogReducer";
import { changeUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user.current);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON);
      dispatch(changeUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, [dispatch]);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogListUser",
        JSON.stringify(loggedInUser)
      );
      blogService.setToken(loggedInUser.token);
      dispatch(changeUser(loggedInUser));
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
    dispatch(changeUser(null));
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

  const handleNewBlog = (evt, blogObj) => {
    evt.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(addNewBlog(blogObj));
      dispatch(
        setNotification(
          {
            content: `A new blog - ${blogObj.title} - added`,
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
          {blogs.map((blog, idx) => (
            <div key={blog.id} className={`blog${idx}`}>
              <Blog blog={blog} currentUser={user} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
