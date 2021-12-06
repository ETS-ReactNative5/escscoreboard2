import React, { useState } from "react";
import {baseUrl} from "../constants";
import {jsonHeaders, setHasUserBeenLoggedIn, storeRefreshToken, storeToken} from "./utils";

export default function PasswordReset(props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        console.log(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
            if(pair[0] === variable){return pair[1];}
        }
        return false;
    }

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
        window.location.href = "/profile";
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
