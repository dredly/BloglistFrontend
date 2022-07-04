import { useState, useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { changeUser } from "./reducers/userReducer";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

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

  const userMatch = useMatch("/users/:id");
  const userId = userMatch ? userMatch.params.id : null;

  const blogMatch = useMatch("/blogs/:id");
  const blogId = blogMatch ? blogMatch.params.id : null;

  return (
    <>
      {user === null && (
        <>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
      )}
      {user !== null && (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>
                <Link to="/">blogs</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/users">users</Nav.Link>
                  <Navbar.Text>{user.name} logged in</Navbar.Text>
                  <Button
                    className="ms-3"
                    variant="secondary"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Notification />
          <h2>blog app</h2>
          <Routes>
            <Route path="/blogs/:id" element={<Blog id={blogId} />} />
            <Route path="/users/:id" element={<User id={userId} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<BlogList />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
