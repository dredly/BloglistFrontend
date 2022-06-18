import { useState } from "react";

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
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
        <button type="submit" id="loginButton">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
