
import React, {useState} from 'react';
import submitRegistration from "./api";

export default function RegistrationForm(props) {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleSubmitClick = async (e) => {
            e.preventDefault();

        // if (errorMessage !== ""){
        //     setErrorMessage("")
        // }
        //
        // if (!email || !password){
        //     setErrorMessage("Email and password are mandatory")
        //     return
        // }
        // else if (password !== confirmPassword){
        //     setErrorMessage("Passwords don't match")
        //     return
        // }
        // else{
        const success = await submitRegistration({email: email, password:password, username: username})
            if (success === true){
                console.log("success " + success)
                setShouldRedirect(true)
            }
        // }
    }

    if (shouldRedirect){
        window.location.href = '/profile';
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           value={email}
                           onChange={(event) => {setEmail(event.target.value)}}
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
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           placeholder="Confirm Password"
                           value={confirmPassword}
                           onChange={(event) => {setConfirmPassword(event.target.value)}}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={async (e) => await handleSubmitClick(e)}
                >
                    Register
                </button>
                {errorMessage}
            </form>
        </div>
    )
}
