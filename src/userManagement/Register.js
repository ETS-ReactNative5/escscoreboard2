import React, { useEffect, useState } from "react";
import submitRegistration from "./api";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function RegistrationForm(props) {
  const history = useHistory();

  const redirectToLogin = () => {
    let path = `login`;
    history.push(path);
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    if (errorMessage !== "") {
      setErrorMessage("");
    }
    if (!emailValidation()) {
      setErrorMessage("Invalid email");
      return;
    }
    if (!email || !password) {
      setErrorMessage("Email and password are mandatory");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    } else if (password.length < 8) {
      setErrorMessage("Minimum password length is 8 characters");
    } else {
      const success = await submitRegistration({
        email: email,
        password: password,
        username: username,
      });
      if (success === true) {
        console.log("success " + success);
        setShouldRedirect(true);
      }
    }
  };
  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    console.log("email is " + email + " regex is " + regex.test(email));

    return email && regex.test(email);
  };

  if (shouldRedirect) {
    window.location.href = "/profile";
  }

  return (
    <div className="auth">
      <img src="/img/logo.png" />
      <form className="form">
        <div className="form__element">
          <label className="form__label">Email address</label>
          <input
            type="email"
            className="form__input"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form__element">
          <label className="form__label">Password</label>
          <input
            type="password"
            className="form__input"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="message message--info">Minimum of 8 characters</div>
        </div>
        <div className="form__element">
          <label className="form__label">Confirm Password</label>
          <input
            type="password"
            className="form__input"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </div>
        <button
          className="btn btn--primary"
          onClick={async (e) => await handleSubmitClick(e)}
        >
          Register
        </button>
        {errorMessage}
        <div class="login">
          <div className="auth__question">
            Already have an account?
            <Link
              to={`login`}
              activeClassName="current"
              className="btn btn--secondary"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
