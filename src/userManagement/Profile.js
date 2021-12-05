import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { authHeaders, clearToken, jsonHeaders } from "./utils";
import { getFlagForCountryNew } from "../images";
import { baseUrl, countryListAlpha2 } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [country, setCountry] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [currentName, setCurrentName] = useState(name);
  const [currentCountry, setCurrentCountry] = useState(country);
  const [ballot, setBallot] = useState([]);
  const [finalVotes, setFinalVotes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myRank, setMyRank] = useState(0);
  const [myScore, setMyScore] = useState(0);

  const fetchuser = () => {
    fetch(baseUrl + "api/user/", { headers: authHeaders })
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
        setName(data[0].first_name);
        setCurrentName(data[0].first_name);
        setCountry(data[0].country);
        setId(data[0].id);
        setCurrentCountry(data[0].country);
        setBallot(data[0].votes);
        const votes = data[0].votes.map((nf) => {
          const votedEntry = nf.entries.find((entry) => entry.voted === true);

          return {
            show_id: nf.id,
            entry_id: votedEntry ? votedEntry.id : -1,
          };
        });
        setFinalVotes(votes);
        setLeaderboard(data[0].leaderboard.leaderboard);
        setMyRank(data[0].leaderboard.my_ranking);
        setMyScore(data[0].leaderboard.my_score);
        setTotalUsers(data[0].leaderboard.total_users);
      });
  };
  useEffect(() => fetchuser(), []);

  const history = useHistory();

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const logout = async (e) => {
    // e.preventDefault()
    clearToken();
    redirectToLogin();
  };

  const countryBox = (nf) => {
    const nfvote = finalVotes.find((x) => x.show_id === nf.id);
    let currentVote = -1;
    if (nfvote) {
      currentVote = nfvote.entry_id;
    }
    return (
      <div key={nf.id} className="event">
        <img src={getFlagForCountryNew(nf.country)} className="event__flag" />
        <div className="event__title">
          {nf.nf}
          <span className="event__date">{nf.final_date}</span>
        </div>
        <select
          className="event__selection"
          onChange={(event) => {
            const selectedEntry = event.target.value;
            console.log(selectedEntry)
            finalVotes.find((x) => x.show_id === nf.id).entry_id =
              parseInt(selectedEntry) || -1;
            console.log(finalVotes);
          }}
          disabled={!nf.open}
        >
          <option key={null} value={null} selected={currentVote === -1}>
            Choose your prediction...
          </option>

          {nf.entries.map((entry) => {
            return (
              <option key={entry.id} value={entry.id} selected={entry.voted}>
                {entry.artist + " - " + entry.title}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const submitVote = async (e) => {
    e.preventDefault();
    await fetch(baseUrl + "cast_voting_ballot/", {
      headers: authHeaders,
      method: "POST",
      body: JSON.stringify(finalVotes),
    }).then((response) => {
      if (response.status === 200) {
        toast.success("You have successfully submited your predictions!");
      } else {
        toast.error("Something went wrong. Try again, or contact support.");
      }
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    setCountry(currentCountry);
    setName(currentName);
    const body = {
      first_name: currentName,
      country: currentCountry,
    };
    const finalOptions = {
      headers: authHeaders,
      method: "PATCH",
      body: JSON.stringify(body),
    };
    const url = baseUrl + "update_user/";
    await fetch(url, finalOptions)
      .then((response) => {
        if (response.status === 200) {
          setCountry(currentCountry);
          setName(currentName);
          toast.success("You have successfully updated your profile!");
        } else {
          toast.error("Something went wrong. Try again, or contact support.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // await fetchuser();
  };

  return (
    <div>
      <div className="ribbon">
        {"Welcome, " +
          name +
          "! You've got a total of " +
          myScore +
          " points. You're current rank is #" +
          myRank +
          " out of "+totalUsers+" players."}
      </div>
      <div className="dashboard">
        <div className="events">
          <h3>Open Predictions</h3>
          {ballot
            .sort((nf1, nf2) => {
              if (nf1.final_date < nf2.final_date) return -1;
              if (nf2.final_date < nf1.final_date) return 1;
              return 0;
            })
            .map((nf) => {
              if (nf.entries.length === 0) return undefined;
              return countryBox(nf);
            })}
          <button className="btn btn--primary" onClick={submitVote}>
            Submit Your Prediction
          </button>
          <h3>Predictions Not Available Yet</h3>
          {ballot
            .sort((nf1, nf2) => {
              if (nf1.final_date < nf2.final_date) return -1;
              if (nf2.final_date < nf1.final_date) return 1;
              return 0;
            })
            .map((nf) => {
              if (nf.entries.length > 0) return undefined;
              return countryBox(nf);
            })}
          <ToastContainer />
        </div>
        <aside className="sidebar">
          <img src="/img/logo.png"/>
          <div className="profile">
            <h3>Your Profile</h3>
            <form className="form">
              <div className="form__element">
                <label className="form__label">Name</label>
                <input
                  className="form__input"
                  type={"text"}
                  value={currentName}
                  onChange={(event) => setCurrentName(event.target.value)}
                />
              </div>
              <div className="form__element">
                <label className="form__label">Country</label>
                <select
                  className="form__input"
                  onChange={(e) => setCurrentCountry(e.target.value)}
                >
                  {Object.keys(countryListAlpha2).map((countrycode, id) => {
                    if (countrycode === currentCountry) {
                      return (
                        <option key={countrycode} value={countrycode} selected>
                          {countryListAlpha2[countrycode]}
                        </option>
                      );
                    }
                    return (
                      <option key={countrycode} value={countrycode}>
                        {countryListAlpha2[countrycode]}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button
                className="btn btn--primary"
                onClick={async (e) => await updateProfile(e)}
              >
                Update your profile
              </button>
              <button
                className="btn btn--secondary"
                onClick={async (e) => await logout(e)}
              >
                Logout
              </button>
            </form>
          </div>
          <div className="leaderboard">
            <h3>Leaderboard</h3>
            <div className="leaderboard__list">
              {leaderboard.length > 0 &&
                leaderboard.map((entry) => {
                  let className = "leaderboard__item user"
                  let name = entry.first_name
                  let score = entry.score
                  let rank = entry.rank
                  let country = entry.country
                  if(entry.id === id){
                    className = "user user--highlighted"
                    name = currentName
                    country = currentCountry
                    score = myScore
                    rank = myRank
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
              <div className="leaderboard__item user user--highlighted">
                <img
                  className="user__flag"
                  src={getFlagForCountryNew(country)}
                />
                <div className="user__rank">{"#" + myRank + " "}</div>
                <div className="user__name">{name}</div>
                <div className="user__score">{myScore}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
