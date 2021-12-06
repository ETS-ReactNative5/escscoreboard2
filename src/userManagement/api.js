import {getJWTHeaders, jsonHeaders, setHasUserBeenLoggedIn, storeRefreshToken, storeToken} from "./utils";
import React from 'react';
import {baseUrl} from "../constants";

export default async function submitRegistration(data){
    return fetch(baseUrl + "api/auth/register/", {
        method: "post",
        body: JSON.stringify(data),
        headers: jsonHeaders,
    }).then((response) => {
            const { status } = response
            const isValid = status === 201
            console.log("status " +response.status)

            let loginError
            if (status === 400) {
                loginError = 'Invalid Credentials'
            } else if (status === 405) {
                loginError = 'method'
            } else if (/^5\d\d$/.test(status.toString())) {
                loginError = 'Internal error'
            } else if (status === 409) {
                loginError = 'User already exists'
                window.location.assign("login")
            }else if (status !== 201){
                loginError = "wrong status code " + status
            }
            const data = response.json()
            return isValid ? data : Promise.reject(loginError)
        })
        .then(
            (data) => {
                console.log("response is " + data)
                // const r = response.json()
                console.log(data.token)
                storeToken(data.token)
                storeRefreshToken(data.refresh || '')
                setHasUserBeenLoggedIn()
                return true
            }
        )
        .catch((error) => {
            alert(error);
            console.log(error)
            return false
        })
}

export const postLogin = (data) => {
    const url = baseUrl + 'api/auth/login/'

    const finalOptions = {
        headers: jsonHeaders,
        method: 'POST',
        body: JSON.stringify(data),
    }

    return fetch(url, finalOptions)
        .then((response) => {
            const { status } = response
            const isValid = status >= 200 && status <= 299
            return isValid ? response : Promise.reject(status)
        })
        .then(
            (response) => {
                storeToken(response.access)
                storeRefreshToken(response.refresh || '')
                setHasUserBeenLoggedIn()
                return response.status
            }
        ).catch(
            (status) => {
                console.log(status)
                return status
            }
        )

}

export const getUser = () => {
    const url = baseUrl + 'users/me/'
    const headers = getJWTHeaders()
    return fetch(url, {headers:headers}).then((response) => {return response.username})
}