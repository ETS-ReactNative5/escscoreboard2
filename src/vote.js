import React, { Component, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import countries, {
  all_voters,
  baseUrl,
  countryNameMap,
  edition_id,
  get_countries,
  magic_code,
} from "./constants";
import { getFlagForCountry, getFlagForCountryNew } from "./images";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { authHeaders } from "./userManagement/utils";
import { toast } from "react-toastify";

function handleErrors(response) {
  if (!response.ok) {
    throw Error("Did you pick a name?");
  }
  return response;
}

export function EurovisionVote() {
  const [songs, setSongs] = useState([]);

  const fetchsongs = () => {
    fetch(baseUrl + "songs/", { headers: authHeaders })
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
        // the response should be a list of {"id" "artist" "title"}
        setSongs(data);
      });
  };
  useEffect(() => fetchsongs(), []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log(items);
    setSongs(items);
  };

  const votingButtonComponent = (entry, index) => {
    return (
      <div className="event draggable">
        <img
          src={getFlagForCountryNew(entry.country)}
          className="event__flag"
        />
        <div className="event__details">
          <span className={"country__name"}>
            {entry.artist} - {entry.title}
          </span>
          <span className={"country__rank"}>#{index + 1} </span>
        </div>
      </div>
    );
  };

  const sendVote = () => {
    const votes = songs.map((value, index) => {
      return { rank: index + 1, code: value };
    });
    const finalVotes = votes.map((vote) => {
      return { rank: vote.rank, entry: vote.code.id };
    });

    fetch(baseUrl + "vote_eurovision/", {
      method: "post",
      headers: authHeaders,
      body: JSON.stringify(finalVotes),
    })
      .then(handleErrors)
      .then((response) => {
        toast("All good");
      })
      .catch((error) => {
        toast("baad");
      });
  };
  //
  // _onSelect(event) {
  //   console.log(event);
  //   this.setState({ currentVoter: event.value });
  // }

  // check_code(){
  //   if(this.state["code"] === magic_code){
  //     this.setState({"unlocked": true})
  //   }
  // }

  // block_entry(){
  //   return (
  //       <div className="votingPassword">
  //         <input type={"text"} value={this.state["code"]} onChange={event =>
  //         {
  //           this.setState({"code": event.target.value})
  //         }}
  //                onKeyUp={ event => {
  //                  if (event.keyCode === 13) {
  //                    this.check_code()
  //                  }
  //                }}/>
  //         <button onClick={this.check_code.bind(this)}>Enter</button>
  //       </div>
  //   )
  // }

  // const namePicker = () => {
  //     {/*<h2>Select your name</h2>*/}
  //     {/*<Dropdown*/}
  //     {/*    options={this.state["voter_list"]}*/}
  //     {/*    onChange={this._onSelect.bind(this)}*/}
  //     {/*    placeholder="What's your name?"*/}
  //     {/*/>*/}
  //    return (
  //        ""   )
  // }

  const ballot = () => {
    const edition = "esc2022";
    const name = `votingPanel votingPanel--${edition}`;
    return (
      <div className={name}>
        <h3>Ranking</h3>
        {/*{namePicker()}*/}
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId="votes">
            {(provided) => (
              <div
                className="votes"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {songs.map((value, index) => {
                  return (
                    <Draggable
                      key={value.id}
                      draggableId={"" + value.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="vote"
                        >
                          {votingButtonComponent(value, index)}
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button className="btn btn--primary" onClick={() => sendVote()}>
          Submit
        </button>
      </div>
    );
  };

  const to_render = ballot();
  return to_render;
}
