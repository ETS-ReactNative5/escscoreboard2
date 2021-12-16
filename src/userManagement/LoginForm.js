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
      const status = await postLogin({ email: username, password: password });
      if (status >= 200 && status <= 299) {
        setShouldRedirect(true);
      } else if (status === 401) {
        setErrorMessage("Username or password incorrect");
      } else {
        setErrorMessage("Something went wrong: Error code " + status);
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
      .catch((status) => {});
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
        <div className="message message--error">{errorMessage}</div>
        <div className="register">
          <div class="auth__question">
            Don't have an account?
            <Link to={`register`} className="btn btn--secondary">
              Register
            </Link>
          </div>
          <div className="auth__question">
            Forgot your details?
            <Link to={`/forgot-password`} className="link link--underlined">Reset your password</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
