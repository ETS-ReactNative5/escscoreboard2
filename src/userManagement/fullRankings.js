import {getFlagForCountryNew} from "../images";
import React, {useEffect, useState} from "react";
import {baseUrl} from "../constants";
import {authHeaders} from "./utils";

export default function Leaderboard(props) {
    const [leaderboard, setLeaderboard] = useState([])
    const [myId, setmyId] = useState([])
    const [totalUsers, setTotalUsers] = useState("");
    const [myRank, setMyRank] = useState(0);
    const [myScore, setMyScore] = useState(0);

    const fetchLeaderboard = () => {
        const path = props.full ? "leaderboard/?full_leaderboard=true" : "leaderboard/"
        fetch(baseUrl + path, { headers: authHeaders })
            .then((response) => {
                if (response.status === 403 || response.status === 401) {
                    window.location.href = "/login";
                }
                if (response.status === 200) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then((data) => {
                setLeaderboard(data.leaderboard);
                setmyId(data.myId)
                setMyRank(data[0].leaderboard.my_ranking);
                setMyScore(data[0].leaderboard.my_score);
                setTotalUsers(data[0].leaderboard.total_users);
            });
    };
    useEffect(() => fetchLeaderboard(), []);

    const goToProfile = () => {
        window.location.href = "/profile";

    }

    return (
        <div>
            <div className="ribbon">
                <div className="backbutton">
                    <button className="btn btn--primary" onClick={goToProfile}> {"< Back"}</button>
                </div>
                {"Welcome, " +
                    name +
                    "! You've got a total of " +
                    myScore +
                    " points. Your current rank is #" +
                    myRank +
                    " out of " +
                    totalUsers +
                    " players."}
            </div>
            <div className="leaderboard">
                <h3>Leaderboard</h3>
                <div className="leaderboard__list">
                    {leaderboard.length > 0 &&
                        leaderboard.map((entry) => {
                            let className = "leaderboard__item user";
                            let name = entry.first_name;
                            let score = entry.score;
                            let rank = entry.rank;
                            let country = entry.country;
                            if (entry.id === myId) {
                                className = "user user--highlighted";
                            }
                            return (
                                <div className={className}>
                                    <img
                                        className="user__flag"
                                        src={getFlagForCountryNew(country)}
                                    />
                                    <div className="user__rank">{"#" + rank + " "}</div>
                                    <div className="user__name">{name}</div>
                                    <div className="user__score">{score}</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>

    )
}