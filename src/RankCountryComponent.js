import React, { Component } from "react";
import { getFlagForCountry } from "./images";
import { countryNameMap, get_edition_for_country } from "./constants";

export default class RankCountryComponent extends Component {
  flagOrRanking() {
    if (this.props.currentRank > 0 && this.props.currentRank <= 10) {
      return (
        <span className={"country__current-rank"}>
          {this.props.currentRank}
        </span>
      );
    }
  }

  render() {
    let class_name =
      this.props.currentRank === 1
        ? "country country--3"
        : this.props.gotLastVote
        ? "country country--2"
        : this.props.inCurrentVotes
        ? "country country--1"
        : "country";

    class_name =
      class_name + " country--" + get_edition_for_country(this.props.country);

    return (
      <div className={class_name}>
        {this.flagOrRanking()}
        <span className={"country__flag"}>
          <img alt="" src={getFlagForCountry(this.props.country)} />
        </span>
        <span className={"country__name"}>
          {countryNameMap[this.props.country.toLowerCase()]}
        </span>
        <span className={"country__rank"}>{this.props.rank}</span>
        <span className={"country__average"}>
          {this.props.use12P
            ? this.props.twelvePointRank
            : this.props.averageRank.toFixed(2)}
        </span>
      </div>
    );
  }
}
