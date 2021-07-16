import React, { useState } from "react";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:9081/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Cache-Control": "no-cache",
      Host: "localhost:9081",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep - alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": 27,
      Authentication:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjYzNTcyMzYsImlhdCI6MTYyNjM1MzYzNiwidXNlcm5hbWUiOiJ0ZXN0In0.OXqSaEKHs8o_wHY2jxr5qQ-UbncfF-4kB2B-ZNkjdPBy4ozB1bJzi3cz8MQ84dMJ4tfYdFWICNn-pBW3bwl5IA",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    // mode: "no-cors",
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
