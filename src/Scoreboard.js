import React, { Component } from "react";
import "./App.css";
import NameComponent from "./NameComponent";
import ScoreboardComponent from "./ScoreboardComponent";
import {
  countryNameMap,
  rankToPointsMap,
  all_voters,
  get_countries, edition_id, num_of_qualifiers,
} from "./constants";
import FlipMove from "react-flip-move";
import { saveAs } from "file-saver";
import { getFlagForCountry } from "./images";
import queryString from "query-string";

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    let initial = {};
    let country_list = get_countries();
    let params = queryString.parse(location.search);
    console.log(params);
    if ("country_list" in params && params["country_list"].length > 0) {
      country_list = params["country_list"].toLowerCase().split(",");
    }
    let voter_list = all_voters;
    if ("voters" in params && params["voters"].length > 0) {
      voter_list = params["voters"].toLowerCase().split(",");
    }

    country_list.forEach((country) => {
      initial[country.toLowerCase()] = [];
    });
    //        initial = {"serbia": []}

    this.state = {
      overallRanking: initial,
      currentVoting: {},
      voters: [],
      currentVoter: "",
      twelves: false,
      count: country_list.length,
      remainingVoters: voter_list,
      completedVoters: 0,
      lastVotedCountry: "",
      country_list: country_list,
      fetched: false
    };
    // this.eventSource = new EventSource("http://localhost:5000/stream");
    this.getVotes()
  }


  getVotes() {
    fetch(
        "https://django-cloudrun-4fdxp3ewaq-ew.a.run.app/get_votes/" +
        edition_id() +
        "/"
    )
        .then((response) => response.json())
        .then((data) => {
          const results = data["results"]
          let useful = {}
          for (var voter in results) {
            const ranking = results[voter]
            let usersRanking = []
            for (let i=0; i<ranking.length; i++){
              if (ranking[i]["score"] <=10){
                continue;
              }
              usersRanking[ranking[i]["entry"]] = ranking[i]["score"]
            }
            useful[voter.toLowerCase()] = usersRanking
          }

          this.setState({
            result: useful,
            fetched: true,
          });
        });
  }

  audioStuff(data){

    if (data.country === "sweden" && data.new_rank <= 3) {
      var audio = new Audio(
          process.env.PUBLIC_URL + "/audio/fucking-sweden-maria.mp3"
      );
      audio.play();
    } else if (data.new_rank === this.state["country_list"].length) {
      if (this.state["currentVoter"] === "Marko") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/marko-trash.m4a"
        );
        audio.play();
      } else if (this.state["currentVoter"] === "Matteo") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/matteo-ROTTEN.m4a"
        );
        audio.play();
      } else if (this.state["currentVoter"] === "Nathan") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/Nathan-batshitvoting.m4a"
        );
        audio.play();
      } else if (this.state["currentVoter"] === "Pedro") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/pedro-torture.m4a"
        );
        audio.play();
      } else if (this.state["currentVoter"] === "Rodrigo") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/rodrigo-ihatethem.m4a"
        );
        audio.play();
      } else if (this.state["currentVoter"] === "Wiv") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/worst-entry-ever.m4a"
        );
        audio.play();
      } else if (this.state["currentVoter"] === "Philip") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/philip-itis.m4a"
        );
        audio.play();
      } else if (this.state["currentVoter"] === "Costa") {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/costa-jemini.m4a"
        );
        audio.play();
      } else if (this.state["remainingVoters"].length % 5 === 0) {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/all-so-shitty.m4a"
        );
        audio.play();
      } else if (this.state["remainingVoters"].length % 5 === 1) {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/i-need-more-wine.m4a"
        );
        audio.play();
      } else if (this.state["remainingVoters"].length % 5 === 2) {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/worst-entry-ever.m4a"
        );
        audio.play();
      } else if (this.state["remainingVoters"].length % 5 === 3) {
        var audio = new Audio(
            process.env.PUBLIC_URL + "/audio/pure-torture.m4a"
        );
        audio.play();
      } else if (this.state["remainingVoters"].length % 5 === 4) {
        var audio = new Audio(process.env.PUBLIC_URL + "/audio/its-dire.m4a");
        audio.play();
      }
    }
  }
  addVote(data) {
    // this.audioStuff(data)
    let currentVotes = this.state.currentVoting;
    let ranking = this.state.overallRanking;
    let countryVoteList = ranking[data.country];
    if (
      data.previous_rank &&
      countryVoteList.length &&
      data.previous_rank === countryVoteList[countryVoteList.length - 1]
    ) {
      countryVoteList.pop();
    }
    currentVotes[data.country] = data.new_rank;

    countryVoteList.push(data.new_rank);
    ranking[data.country] = countryVoteList;
    this.setState({
      currentVoting: currentVotes,
      overallRanking: ranking,
      lastVotedCountry: data.country,
    });
  }

  removeVote(data) {
    let currentVotes = this.state.currentVoting;
    let ranking = this.state.overallRanking;
    for (var country in currentVotes) {
      if (currentVotes[country] < currentVotes[data.country]) {
        const updatedTempVote = currentVotes[country] + 1;
        currentVotes[country] = updatedTempVote;
        let countryVoteList = ranking[country];
        countryVoteList.pop();
        countryVoteList.push(currentVotes[country]);
        ranking[country] = countryVoteList;
      }
    }
    delete currentVotes[data.country];
    let countryVoteList = ranking[data.country];
    countryVoteList.pop();
    ranking[data.country] = countryVoteList;
    this.setState({ currentVoting: currentVotes, overallRanking: ranking });
  }

  cancelCurrentVote() {
    let currentVotes = this.state.currentVoting;
    let ranking = this.state.overallRanking;
    for (const country in currentVotes) {
      ranking[country].pop();
    }
    this.setState({
      overallRanking: ranking,
      currentVoting: {},
      currentVoter: "Up next...",
    });
  }

  parseName(event) {
    this.setState({ currentVoter: event.name });
  }

  endvote() {
    if (
      Object.keys(this.state.currentVoting).length !==
        this.state.country_list.length ||
      this.state.currentVoter === "Up next..." ||
      this.state.currentVoter === ""
    ) {
      return;
    }
    let voters = this.state.voters;
    voters.push(this.state.currentVoter);
    let remaining = [];
    for (let i = 0; i < this.state.remainingVoters.length; i++) {
      if (this.state.remainingVoters[i] !== this.state.currentVoter) {
        remaining.push(this.state.remainingVoters[i]);
      }
    }

    this.setState({
      currentVoting: {},
      voters: voters,
      count: this.state.country_list.length,
      currentVoter: "Up next...",
      remainingVoters: remaining,
      completedVoters: this.state.completedVoters + 1,
      lastVotedCountry: "",
    });
  }

  // componentDidMount() {
  //   this.eventSource.addEventListener("name", (e) => {
  //     this.parseName(JSON.parse(e.data));
  //   });
  //   this.eventSource.addEventListener("vote", (e) => {
  //     this.addVote(JSON.parse(e.data));
  //   });
  //   this.eventSource.addEventListener("reset", (e) => {
  //     this.endvote();
  //   });
  //   this.eventSource.addEventListener("cancel", (e) => {
  //     this.cancelCurrentVote();
  //   });
  // }

  getRanking() {
    let ranking = [];
    for (var country in this.state.overallRanking) {
      const arrayOfVotes = this.state.overallRanking[country];
      const sum = arrayOfVotes.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      let twelvePointSum = 0;
      arrayOfVotes.forEach((x) => (twelvePointSum += rankToPointsMap[x] || 0));
      const avg = sum / arrayOfVotes.length || 0;
      const gotVotesNow = arrayOfVotes.length > this.state.completedVoters;
      const lastVoted = this.state.lastVotedCountry === country;
      ranking.push({
        country: country,
        averageRank: avg,
        twelvePointRank: twelvePointSum,
        inCurrentVotes: gotVotesNow,
        lastVoted: lastVoted,
      });
    }
    return ranking;
  }

  addRandomVote() {
    const votes = this.state.currentVoting;
    const country = this.state.country_list[
      Math.floor(Math.random() * this.state.country_list.length)
    ].toLowerCase();
    const rank = Math.floor(Math.random() * this.state.country_list.length) + 1;
    this.addVote({ country: country, new_rank: rank });
    this.setState({ currentVoting: votes });
  }

  switchTwelveState() {
    this.setState({ twelves: !this.state.twelves });
  }

  popVote(event) {
    if (!event) return;
    this.removeVote({ country: event });
    this.state.count++;
  }

  pushVote(event) {
    if (!event) return;
    this.addVote({ country: event, new_rank: this.state.count });
    this.state.count--;
  }

  votingButtonComponent(country) {
    return (
      <div
        className={"country country--small"}
        onClick={(e) => this.pushVote(country)}
      >
        <span className={"country__flag"}>
          <img src={getFlagForCountry(country)} />
        </span>
        <span className={"country__name"}>
          {countryNameMap[country.toLowerCase()]}
        </span>
      </div>
    );
  }
  votingPanel(ranking) {
    var list = [];
    for (var i = 0; i < this.state.country_list.length; i++) {
      const country = this.state.country_list[i];
      if (!(country in this.state.currentVoting)) {
        list.push(country);
      }
    }
    return (
      <FlipMove enterLeaveAniation="elevator">
        {list.sort().map((value, index) => {
          return <span key={value}>{this.votingButtonComponent(value)}</span>;
        })}
      </FlipMove>
    );
  }

  sortDict(dict) {
    // Create items array
    var items = Object.keys(dict).map(function (key) {
      return [key, dict[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
      return first[1] - second[1];
    });
    return items;
  }

  ongoingRankCountryComponent(country, rank) {
    return (
      <div
        className={"country country--small"}
        onClick={(e) => this.popVote(country)}
      >
        <span className={"country__flag"}>
          <img src={getFlagForCountry(country)} />
        </span>
        <span className={"country__name"}>
          {countryNameMap[country.toLowerCase()]}
        </span>
        <span className={"country__rank"}>#{rank}</span>
      </div>
    );
  }

  ongoingRank() {
    const ranked = this.sortDict(this.state.currentVoting);
    // if (!ranked || !ranked.length){
    //     return "May we have your votes please?"
    // }
    return (
      <span>
        <FlipMove enterLeaveAnimation="elevator" duration={600} staggerDurationBy={50} staggerDelayBy={300}>
          {ranked.map((value, index) => {
            return (
              // <span key={value[0]}><button key={value[0]} value={value[0]}  onClick={ e => this.popVote(e.target.value)} ><OngoingRankCountryComponent country={value[0]} rank={value[1]}/></button></span>
              <span key={value[0]}>
                {this.ongoingRankCountryComponent(value[0], value[1])}
              </span>
            );
          })}
        </FlipMove>
        <button onClick={this.endvote.bind(this)}>Submit</button>
      </span>
    );
  }

  capitalizeWords(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    if (!this.state.fetched){
      return ("Wait a second")
    }
    return (
      <div className="App">
        <div className={"Voting"}>
          <div className={"Ranking"}>{this.ongoingRank()}</div>
          <div className={"Countries"}>{this.votingPanel()}</div>
          <button
            className={"save-button"}
            onClick={(e) => {
              let content = [];
              content.push("country,");
              content.push(this.state.voters);
              content.push("\n");

              for (var country in this.state.overallRanking) {
                var line = [this.capitalizeWords(country)];
                line.push(this.state.overallRanking[country]);
                line.push("\n");
                content.push(line);
              }
              saveAs(
                new Blob(content, { type: "text/csv;charset=utf-8" }),
                "test.txt"
              );
            }}
          >
            Save file
          </button>
        </div>
        <div className={"Scoreboard"}>
          <ScoreboardComponent
            ranking={this.getRanking()}
            twelvePointSystem={this.state.twelves}
            completedVoters={this.state.completedVoters}
            currentVoting={this.state.currentVoting}
          />
        </div>
        <NameComponent voterName={this.state.currentVoter} />
        <div className={"Voters"}>
          {this.state.remainingVoters.map((name) => {
            return (
              <button
                value={name}
                onClick={(e) => {
                  let newState = {}
                  newState["count"] = this.state.country_list.length

                  const currentVoting = this.state.currentVoting
                  this.cancelCurrentVote()

                  if (name.toLowerCase() in this.state.result) {
                    newState["currentVoting"] = this.state.result[name.toLowerCase()]
                    newState["count"] = 10
                    if (newState["currentVoter"] !== e.target.value) {
                      let ranking = this.state.overallRanking;
                      for (const country in newState["currentVoting"]) {
                        let countryVoteList = ranking[country];
                        const rank = newState["currentVoting"][country]
                        console.log(country)
                        countryVoteList.push(rank);
                        ranking[country] = countryVoteList;
                      }
                    }
                  }
                  newState["currentVoter"] = e.target.value
                  this.setState(newState)
                }}
              >
                {name}
              </button>
            )
          })}
          <button
            className={"Button Button--12"}
            onClick={this.switchTwelveState.bind(this)}
          >
            {this.state.twelves ? "Averages" : "12-points"}
          </button>
        </div>
      </div>
    );
  }
}

export default Scoreboard;
