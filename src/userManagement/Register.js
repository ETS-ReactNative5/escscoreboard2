
import React, {useState} from 'react';
import submitRegistration from "./api";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

export default function RegistrationForm(props) {

    const history = useHistory();

    const redirectToLogin = () =>{
        let path = `login`;
        history.push(path);
    }

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleSubmitClick = async (e) => {
            e.preventDefault();

        if (errorMessage !== ""){
            setErrorMessage("")
        }

        if (!email || !password){
            setErrorMessage("Email and password are mandatory")
            return
        }
        else if (password !== confirmPassword){
            setErrorMessage("Passwords don't match")
            return
        }
        else{
        const success = await submitRegistration({email: email, password:password, username: username})
            if (success === true){
                console.log("success " + success)
                setShouldRedirect(true)
            }
        }
    }

    if (shouldRedirect){
        window.location.href = '/profile';
    }

    return(
        <div style={{"position": "fixed", "top": "50%", "left": "50%" , "transform": "translate(-50%, -50%)"
        }}>
            <form>
                <div style={{display: 'flex', 'flex-direction':'column', "justify-content": "space-between"}}>
                    <img src={"https://scontent-mad1-1.xx.fbcdn.net/v/t1.15752-9/253320266_1240276056456288_7360099326448372741_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=QJzhllAkBSIAX9LNdCe&_nc_ht=scontent-mad1-1.xx&oh=e66e93303422be74950927e83bc29f2b&oe=61C58A49"} height={150}/>
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
                    <br/>
                    Already have an account?
                    <Link to={`login`} activeClassName="current"><button>Login</button></Link>
                </div>
            </form>
        </div>
    )
}
