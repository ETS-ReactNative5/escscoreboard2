import React, { useEffect, useState } from "react";
import { postLogin } from "./api";
import { authHeaders, getToken } from "./utils";
import { useHistory } from "react-router";
import { baseUrl } from "../constants";
import { Link } from "react-router-dom";

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (errorMessage !== "") {
      setErrorMessage("");
    }

    if (!username || !password) {
      setErrorMessage("Email and password are mandatory");
    } else {
      const success = await postLogin({ email: username, password: password });
      if (success === true) {
        setShouldRedirect(true);
      }
    }
  };
  useEffect(() => {
    fetch(baseUrl + "api/user/", { headers: authHeaders })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then((data) => {
        setShouldRedirect(true);
      })
      .catch(() => {});
  }, []);
  if (shouldRedirect === true && getToken() !== null) {
    window.location.href = "/profile";
  }

  return (
    <div class="auth">
      <img src="/img/logo.png" />
      <form className="form">
        <div className="form__element">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form__element">
          <label className="form__label">Password</label>
          <input
            type="password"
            className="form__input"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button
          className="btn btn--primary"
          onClick={async (e) => await handleSubmitClick(e)}
        >
          Login
        </button>
        {errorMessage}
        <div className="register">
          <span class="auth__question">Don't have an account?</span>
          <Link to={`register`}>
            <button className="btn btn--secondary">Register</button>
          </Link>
          <br/>
          <span className="auth__question">Forgot your password?</span>
          <Link to={`/forgot-password`}>
            <button className="btn btn--secondary">Reset</button>
          </Link>

        </div>
      </form>
    </div>
  );
}
