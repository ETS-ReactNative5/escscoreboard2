
import React, {useEffect, useState} from 'react';
import {postLogin} from "./api";
import {authHeaders, getToken} from "./utils";
import {useHistory} from "react-router";

export default function LoginForm(props) {

    const history = useHistory();

    const redirectToRegister = () =>{
        let path = `register`;
        history.push(path);
    }

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
    if (shouldRedirect === true && getToken() !== null){
        window.location.href = '/profile';
    }

    return(
        <div style={{"position": "fixed", "top": "50%", "left": "50%" , "transform": "translate(-50%, -50%)"
        }}>
            <form>
                <div style={{display: 'flex', 'flex-direction':'column', "justify-content": "space-between"}}>
                    <img src={"https://scontent-mad1-1.xx.fbcdn.net/v/t1.15752-9/253320266_1240276056456288_7360099326448372741_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=QJzhllAkBSIAX9LNdCe&_nc_ht=scontent-mad1-1.xx&oh=e66e93303422be74950927e83bc29f2b&oe=61C58A49"} height={150}/>
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter username"
                           value={username}
                           onChange={(event) => {setUsername(event.target.value)}}
                    />
                    {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>*/}
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
                <br/>
                Don't have an account?
                <button onClick={() => redirectToRegister()}>Register</button>
            </form>
        </div>
    )
}
