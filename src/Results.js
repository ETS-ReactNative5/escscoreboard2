import React, { Component } from "react";
import countries, {
  audioMap,
  countryNameMap,
  edition_id,
  get_countries,
  magic_code,
  num_of_qualifiers, videomap,
} from "./constants";
import { envelopeImg, getFlagForCountry } from "./images";
import ReactPlayer from "react-player";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      displayed: [],
      strings: Array.from({ length: num_of_qualifiers }, () => "???"),
      completed_videos: [],
    };
    this.getResults();
  }

  array_contains(array, num) {
    for (var i = 0; i < array.length; i++) {
      if (num === array[i]) {
        return true;
      }
    }
    return false;
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  getResults() {
    console.log("ddddaaaa");
    fetch(
      "https://django-cloudrun-4fdxp3ewaq-ew.a.run.app/result/" +
        edition_id() +
        "/"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          result: data["results"],
          fetched: true,
          qualifiers: this.shuffle(data["results"].slice(0, num_of_qualifiers)),
        });
        console.log(data);
      });
  }

  displayQualifier() {
    if (this.state["displayed"].length === num_of_qualifiers) {
      return;
    }
    var qualifiers = this.state["qualifiers"];
    console.log(qualifiers)
    var num = Math.floor(Math.random() * num_of_qualifiers);
    var displayed = this.state["displayed"];
    while (
      this.array_contains(this.state["displayed"], qualifiers[num]) === true
    ) {
      num = Math.floor(Math.random() * num_of_qualifiers);
    }
    displayed.push(qualifiers[num]);
    var strings = this.state["strings"];
    const entry = qualifiers[num]["entry"];
    strings[num] = entry;
    var audio = new Audio(process.env.PUBLIC_URL + "/audio/" + audioMap[entry]);
    audio.play();
    this.setState({ displayed: displayed, strings: strings });
  }

  all_countries() {
    return get_countries()
      .map((value, index) => {
        const qualified = this.array_contains(this.state["strings"], value);
        let classname = "country country--small";
        if (qualified === true) {
          classname = "country country--small country--qualified";
        }
        return (
          <div className={classname}>
            <span className="country__flag">
              <img src={getFlagForCountry(value)} />
            </span>
            <span className="country__name">{countryNameMap[value]}</span>
          </div>
        );
      });
  }

  ett_resultat() {
    let resultclass = "results";
    if (this.state["displayed"].length === num_of_qualifiers) {
      resultclass += " results--done";
    }
    return (
      <div className={resultclass}>
        <div className="results__left">
          <div className="results__video">Next qualifier is...</div>
          <div className="results__countries">{this.all_countries()}</div>
        </div>
        <div className="results__right">
          <div className="results__qualifiers">
            {this.state["strings"].map((value, index) => {
              let clname = "country";
              if (value === "???") {
                clname = "country country--unknown";
              }
              return (
                <span>
                  <div className={"qualifier"}>
                    {value === "???"
                      ? ""
                      : !this.state["completed_videos"].includes(value) && (
                          <ReactPlayer
                            className="qualifier__revealed"
                            url={
                              process.env.PUBLIC_URL +
                              "/video/" + videomap[value]
                            } //audioMap[value]}
                            controls={false}
                            playing={true}
                            onEnded={(element) => {
                              let completed = this.state["completed_videos"];
                              completed.push(value);
                              this.setState({ completed_videos: completed });
                            }}
                          />
                        )}
                  </div>
                  <div className={clname} key={"q" + index}>
                    <span className="country__flag">
                      <img src={getFlagForCountry(value)} />
                    </span>
                    <span className="country__name">
                      {countryNameMap[value]}
                    </span>
                  </div>
                </span>
              );
            })}
          </div>
          <button onClick={this.displayQualifier.bind(this)}>
            Next Qualifier
          </button>
        </div>
      </div>
    );
  }

  whatever() {
    if (this.state["fetched"] === false) {
      return "I don't have them";
    } else {
      console.log(this.state["results"]);
      return this.ett_resultat();
    }
  }

  check_code() {
    if (this.state["code"].toLowerCase() === magic_code) {
      this.setState({ unlocked: true });
    }
  }

  block_entry() {
    return (
      <div className="votingPassword">
        <input
          type={"text"}
          value={""}
          onChange={(event) => {
            this.setState({ code: event.target.value });
          }}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              this.check_code();
            }
          }}
        />
        <button onClick={this.check_code.bind(this)}>Enter</button>
      </div>
    );
  }

  render() {
    return <div>{this.whatever()}</div>;
  }
}
