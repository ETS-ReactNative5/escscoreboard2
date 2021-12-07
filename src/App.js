import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegistrationForm from "./userManagement/Register";
import LoginForm from "./userManagement/LoginForm";
import Profile from "./userManagement/Profile";
import PasswordReset from "./userManagement/PasswordReset";
import CheckYourEmail from "./userManagement/CheckEmail";
import ForgotPassword from "./userManagement/ForgotPassword";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <RegistrationForm />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/reset-confirm" component={CheckYourEmail} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password" component={PasswordReset} />
        <Route path="/" component={LoginForm} />
      </Switch>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
