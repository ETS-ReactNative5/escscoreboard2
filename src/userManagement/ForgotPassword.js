import React, { useState } from "react";
import {baseUrl} from "../constants";
import {jsonHeaders, setHasUserBeenLoggedIn, storeRefreshToken, storeToken} from "./utils";

export default function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const postResetPassword = (data) => {
        const url = baseUrl + 'password_reset/'
        const finalOptions = {
            headers: jsonHeaders,
            method: 'POST',
            body: JSON.stringify(data),
        }

        return fetch(url, finalOptions)
            .then((response) => {
                const { status } = response
                const isValid = status >= 200 && status <= 299

                let loginError
                if (status === 400) {
                    loginError = 'credentials'
                } else if (status === 405) {
                    loginError = 'method'
                } else if (/^5\d\d$/.test(status.toString())) {
                    loginError = 'internal'
                }

                return isValid ? response : Promise.reject(loginError)
            })
            .then(async (response) => {
                const parsedResponse = await response.json()
                if (parsedResponse.redirectVerifyUrl) {
                    window.location.assign(parsedResponse.redirectVerifyUrl)
                }
                return parsedResponse
            })
            .then(
                (response) => {
                    storeToken(response.access)
                    storeRefreshToken(response.refresh || '')
                    setHasUserBeenLoggedIn()
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

        if (errorMessage !== "") {
            setErrorMessage("");
        }

        if (!email) {
            setErrorMessage("Email is mandatory");
            return;
        } else {
            const success = await postResetPassword({
                email: email
            });
            if (success === true) {
                console.log("success " + success);
                setShouldRedirect(true);
            }
        }
    };

    if (shouldRedirect) {
        window.location.href = "/reset-confirm";
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
                <button
                    className="btn btn--primary"
                    onClick={async (e) => await handleSubmitClick(e)}
                >
                    Send Password Reset Email
                </button>
            </form>
        </div>
    );
}
