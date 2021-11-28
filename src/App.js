import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Setup from "./Setup";
import Scoreboard from "./Scoreboard";
import Vote from "./vote";
import Results from "./Results";
import Ranker from "./ranker";
import RegistrationForm from "./userManagement/Register";
import LoginForm from "./userManagement/LoginForm";
import Profile from "./userManagement/Profile";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/register">
                        <RegistrationForm />
                    </Route>
                    <Route path="/scoreboard">
                        <Scoreboard />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/vote">
                        <Vote />
                    </Route>
                    <Route path="/result">
                        <Results />
                    </Route>
                    <Route path="/sort">
                        <Ranker />
                    </Route>
                    <Route exact path="/login" component={LoginForm} />
                    {/*<ProtectedRoute exact path="/" component={Profile} />*/}
                    {/*<Route path="/">*/}
                    {/*    <Setup />*/}
                    {/*</Route>*/}
                </Switch>
            </div>
        </Router>
    );
}

function Users() {
    return <h2>Users</h2>;
}
