import { getFlagForCountryNew } from "../images";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants";
import { authHeaders } from "./utils";

export default function Leaderboard(props) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myId, setmyId] = useState([]);
  const [totalUsers, setTotalUsers] = useState("");
  const [myRank, setMyRank] = useState(0);
  const [myScore, setMyScore] = useState(0);

  const fetchLeaderboard = () => {
    const path = props.full
      ? "leaderboard/?full_leaderboard=true"
      : "leaderboard/";
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
        setmyId(data.myId);
        setMyRank(data.my_ranking);
        setMyScore(data.my_score);
        setTotalUsers(data.total_users);
      });
  };
  useEffect(() => fetchLeaderboard(), []);

  const goToProfile = () => {
    window.location.href = "/profile";
  };

  return (
    <div>
      <div className="ribbon">
        <div className="container">
          <div className="ribbon__notice">
            {"You have " +
              myScore +
              " points and you're currently placed #" +
              myRank +
              " out of " +
              totalUsers +
              " players."}
          </div>
          <div className="ribbon__user">
            <div className="ribbon__action ribbon__action--user">{name}</div>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <aside className="sidebar">
          <img src="/img/logo.png" />
          <button className="btn btn--primary" onClick={goToProfile}>
            {"Go to Predictions"}
          </button>
        </aside>
        <div className="leaderboard">
          <h3 className="heading heading--leaderboard">Leaderboard</h3>
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
    </div>
  );
}
