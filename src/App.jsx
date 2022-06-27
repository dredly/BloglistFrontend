import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { changeUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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

  return (
    <Router>
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
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<BlogList />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
