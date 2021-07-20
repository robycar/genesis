import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      // history.push("/dashboard/testcase");
    }
  }, []);
  async function login() {
    console.warn(username, password);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    let result = await fetch(
      `http://localhost:9081/api/auth/login`,
      requestOptions
    );

    result = await result.json();
    console.log(result);
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/dashboard/testcase");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          placeholder="user"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
