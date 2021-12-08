import React, { useState } from "react";
import {baseUrl} from "../constants";
import {jsonHeaders, setHasUserBeenLoggedIn, storeRefreshToken, storeToken} from "./utils";
import getQueryVariable from "../utils";

export default function PasswordReset(props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const postResetPassword = (data) => {
        const url = baseUrl + 'password_reset/confirm/'
        const finalOptions = {
            headers: jsonHeaders,
            method: 'POST',
            body: JSON.stringify(data),
        }

        return fetch(url, finalOptions)
            .then((response) => {
                const { status } = response
                const isValid = status >= 200 && status <= 299
                return {"isValid": isValid, "response": response}
                // return isValid ? response : Promise.reject(loginError)
            })
            .then(async (r) => {
                const parsedResponse = await r.response.json()
                if (r.isValid === false){
                    setErrorMessage(parsedResponse.password[0])
                    return Promise.reject("failed")
                }
            })
            .then(
                (response) => {
                    return true
                }
            ).catch(
                (e) => {
                    console.log(e)
                    return false
                }
            )
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const token = getQueryVariable("token")
        if (errorMessage !== "") {
            setErrorMessage("");
        }

        if (!password) {
            setErrorMessage("Password is mandatory");
            return;
        } else if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        } else if (password.length <8){
            setErrorMessage("Minimum password length is 8 characters")
        } else {
            const success = await postResetPassword({
                password: password,
                token: token,
            });
            if (success === true) {
                setShouldRedirect(true);
            }
        }
    };

    if (shouldRedirect) {
        window.location.href = "/login";
    }

    return (
        <div className="auth">
            <img src="/img/logo.png" />
            <form className="form">
                <div className="form__element">
                    <label className="form__label">New Password</label>
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
                    Reset my password
                </button>
                <br/>
                {errorMessage}
            </form>
        </div>
    );
}
