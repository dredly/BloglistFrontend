import { Form, Container, Button } from "react-bootstrap";

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <Container>
      <h2>Login to application</h2>
      <Form className="med-width" onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="usernameInput">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordInput">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" id="loginButton">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
