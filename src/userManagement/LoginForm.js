
import React, {useEffect, useState} from 'react';
import {getUser, postLogin} from "./api";
import {authHeaders, getToken} from "./utils";

export default function LoginForm(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        if (errorMessage !== ""){
            setErrorMessage("")
        }

        if (!username || !password){
            setErrorMessage("Email and password are mandatory")
        }
        else{
            const success = await postLogin({email: username, password: password})
            if (success === true){
                setShouldRedirect(true)
            }
        }
    }
    useEffect(() => {
        fetch("http://localhost:8000/api/user/", {headers: authHeaders})
            .then((response) => {
                if (response.status === 200){
                    return response.json()
                }
                return Promise.reject(response.status)
            }).then((data) => {
                setShouldRedirect(true)
        }).catch(() => {})
    }, [])
    if (shouldRedirect === true ){
        window.location.href = '/profile';
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter username"
                           value={username}
                           onChange={(event) => {setUsername(event.target.value)}}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={password}
                           onChange={(event) => {setPassword(event.target.value)}}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={async (e) => await handleSubmitClick(e)}
                >
                    Login
                </button>
                {errorMessage}
            </form>
        </div>
    )
}
