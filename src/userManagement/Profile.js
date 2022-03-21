import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { authHeaders, clearToken, jsonHeaders } from "./utils";
import { getFlagForCountryNew } from "../images";
import { baseUrl, countryListAlpha2 } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EurovisionVote } from "../vote";

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
  const [page, setPage] = useState("prediction");
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchuser = () => {
    setIsLoading(true);
    fetch(baseUrl + "api/user/", { headers: authHeaders })
      .then((response) => {
        setIsLoading(false);
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
        setIsSuperuser(data[0].is_superuser);
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
    let classname = "event";
    if (!nf.open) {
      classname = "event event--closed";
    } else if (!nf.entries.length) {
      classname = "event event--unavailable";
    }
    return (
      <div key={nf.id} className={classname}>
        <div className="event__details">
          <img src={getFlagForCountryNew(nf.country)} className="event__flag" />
          <div className="event__title">{nf.nf}</div>
          {nf.open ? (
            ""
          ) : (
            <div className="event__points">{nf.points} points</div>
          )}
          <div className="event__date">{nf.final_date}</div>
        </div>
        <select
          required
          className="event__selection"
          onChange={(event) => {
            const selectedEntry = event.target.value;
            console.log(selectedEntry);
            finalVotes.find((x) => x.show_id === nf.id).entry_id =
              parseInt(selectedEntry) || -1;
            console.log(finalVotes);
          }}
          disabled={!nf.open}
        >
          <option key={null} value="" selected={currentVote === -1}>
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
        toast.success("You have successfully submitted your predictions!");
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

  const NFPrediction = () => {
    return (
      <div className="prediction">
        <h3 className="heading heading--open">Open Predictions</h3>
        {ballot
          .sort((nf1, nf2) => {
            if (nf1.final_date < nf2.final_date) return -1;
            if (nf2.final_date < nf1.final_date) return 1;
            return 0;
          })
          .map((nf) => {
            if (!nf.open) {
              return;
            }
            if (nf.entries.length === 0) return undefined;
            return countryBox(nf);
          })}
        <button className="btn btn--primary" onClick={submitVote}>
          Submit Your Prediction
        </button>
        <h3 className="heading heading--closed">
          {ballot.find((nf) => !nf.open) ? "Closed Predictions" : ""}
        </h3>
        {ballot
          .sort((nf1, nf2) => {
            if (nf1.final_date < nf2.final_date) return 1;
            if (nf2.final_date < nf1.final_date) return -1;
            return 0;
          })
          .map((nf) => {
            if (nf.open) {
              return;
            }
            if (nf.entries.length === 0) return undefined;
            return countryBox(nf);
          })}
        <h3 className="heading heading--unavailable">
          Predictions Not Available Yet
        </h3>
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
      </div>
    );
  };

  const goToFull = (e) => {
    e.preventDefault();
    window.location.href = "/leaderboard";
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
            <button
              className="ribbon__action ribbon__action--log-out"
              onClick={async (e) => await logout(e)}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className={"loading"}>Loading...</div>
      ) : (
        <div className="dashboard">
          <aside className="sidebar">
            <img src="/img/logo.png" />
            <div className="profile">
              <h3 className="heading heading--profile">Your Profile</h3>
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
                          <option
                            key={countrycode}
                            value={countrycode}
                            selected
                          >
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
                  Update Your Profile
                </button>
              </form>
            </div>
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
                    if (entry.id === id) {
                      className = "user user--highlighted";
                      name = currentName;
                      country = currentCountry;
                      score = myScore;
                      rank = myRank;
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
                <button
                  className={"btn btn--secondary"}
                  onClick={(e) => goToFull(e)}
                >
                  Full Leaderboard
                </button>
              </div>
            </div>
          </aside>
          <div className="events">
            {isSuperuser ? (
              <nav className="navigation">
                <button
                  className={
                    page === "prediction"
                      ? "btn btn--primary"
                      : "btn btn--secondary"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("prediction");
                  }}
                >
                  Prediction
                </button>
                <button
                  className={
                    page === "eurovision"
                      ? "btn btn--primary"
                      : "btn btn--secondary"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("eurovision");
                  }}
                >
                  XTRA VOTE - ESC 2022
                </button>
              </nav>
            ) : (
              <div></div>
            )}
            {page === "prediction" ? <NFPrediction /> : ""}
            {page === "eurovision" ? <EurovisionVote /> : ""}
            <ToastContainer />
          </div>
        </div>
      )}
      <footer className="footer">
        <nav>
          <ul>
            <li>
              <a href="https://escxtra.com" target="_blank">
                Go to ESCXTRA
              </a>
            </li>
            <li>
              <a
                href="https://escxtra.com/2021/12/07/how-to-play-eurovision-prediction-2022/"
                target="_blank"
              >
                How to Play
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Profile;
