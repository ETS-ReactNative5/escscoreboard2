import React, {Component} from "react";
import countries, {countryNameMap} from "./constants";
import {getFlagForCountry} from "./images";

export default class Ranker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: countries,
            i: 0,
            j: 1,
            sorted: false
        }
    }

    render() {
        if (this.state.sorted){
            return (
                <div>{this.state.countries}</div>
            )
        }
        const countryA = this.state.countries[this.state.i]
        const countryB = this.state.countries[this.state.j]
        return (
            <div>
                <button
                 onClick={
                     () => {
                         let j = this.state.j + 1
                         let i = this.state.i
                         let sorted = this.state.sorted
                         if(j === this.state.countries.length){
                             i += 1
                             j = i + 1
                         }
                         if(i === this.state.countries.length){
                             sorted = true
                         }
                         this.setState({
                             i: i,
                             j: j,
                             sorted: sorted
                         })
                     }
                 }
                >
                    <div className={"country country--small"}>
                        <span className={"country__flag"}>
                          <img src={getFlagForCountry(countryA)} />
                        </span>
                        <span className={"country__name"}>
                          {countryNameMap[countryA.toLowerCase()]}
                        </span>
                    </div>
                </button>
                <button
                    onClick={
                        () => {
                            let tmpcountries = this.state.countries
                            tmpcountries[this.state.i] = countryB
                            tmpcountries[this.state.j] = countryA
                            console.log(tmpcountries)

                            let j = this.state.j + 1
                            let i = this.state.i
                            let sorted = this.state.sorted
                            if(j === this.state.countries.length){
                                i = i + 1
                                j = i + 1
                            }
                            if(i === this.state.countries.length){
                                sorted = true
                            }
                            this.setState({
                                countries: tmpcountries,
                                i: i,
                                j: j,
                                sorted:sorted
                            })
                        }
                    }
                >
                    <div className={"country country--small"}>
                        <span className={"country__flag"}>
                          <img src={getFlagForCountry(countryB)} />
                        </span>
                        <span className={"country__name"}>
                          {countryNameMap[countryB.toLowerCase()]}
                        </span>
                    </div>
                </button>
            </div>
        )
    }

}