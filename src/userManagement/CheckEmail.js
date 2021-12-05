import React from "react";

export default function CheckYourEmail(){

    const redirectToLogin = () => {
        window.location.href  = `login`;
    };
    return (
        <span className="auth__question">
            Password reset initiated successfully, check your email (don't forget the spam folder!)
            <br/>
            <button
                className="btn btn--primary"
                onClick={async () => await redirectToLogin()}
            >
                Login
            </button>
        </span>
    )
}