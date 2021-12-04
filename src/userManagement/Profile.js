import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import {authHeaders, clearToken, jsonHeaders} from "./utils";
// import toast, { Toaster } from 'react-hot-toast';
import {getFlagForCountryNew} from "../images";
import {baseUrl, countryListAlpha2} from "../constants";

const Profile = () => {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [currentName, setCurrentName] = useState(name)
    const [currentCountry, setCurrentCountry] = useState(country)
    const [ballot, setBallot] = useState([])
    const [finalVotes, setFinalVotes] = useState([])
    const [leaderboard, setLeaderboard] = useState([])
    const [myRank, setMyRank] = useState(0)
    const [myScore, setMyScore] = useState(0)
    useEffect(() => {
        fetch(baseUrl + "api/user/", {headers: authHeaders})
            .then((response) => {
                if (response.status === 403 || response.status === 401){
                    window.location.href = '/login';
                }
                if (response.status === 200){
                    return response.json()
                }
                return Promise.reject(response.status)
            }).then((data) => {
                setName(data[0].first_name)
                setCurrentName(data[0].first_name)
                setCountry(data[0].country)
                setCurrentCountry(data[0].country)
                setBallot(data[0].votes)
                const votes = data[0].votes.map((nf)=>{
                    const votedEntry = nf.entries.find(entry => entry.voted === true)

                    return {
                        show_id:nf.id,
                        entry_id: votedEntry ? votedEntry.id : -1
                    }
                })
                setFinalVotes(votes)
                setLeaderboard(data[0].leaderboard.leaderboard)
                setMyRank(data[0].leaderboard.my_ranking)
                setMyScore(data[0].leaderboard.my_score)
            })
    }, [])

    const history = useHistory();

    const redirectToLogin = () =>{
        window.location.href = '/login'
    }

    const logout = async (e) => {
        // e.preventDefault()
        clearToken()
        redirectToLogin()
    }

    const countryBox = (nf) => {
        return (
            <div key={nf.id}>
                <img src={getFlagForCountryNew(nf.country)} height={20}/>
                <span> {nf.nf}</span>
                <select
                    onClick={(event) => {
                        const selectedEntry = event.target.value
                        finalVotes.find(x => x.show_id === nf.id).entry_id = parseInt(selectedEntry) || -1
                        console.log(finalVotes)
                    }}
                    disabled={!nf.open}
                >
                    {nf.entries.map((entry)=>
                    {
                        return (
                            <option key={entry.id} value={entry.id} selected={entry.voted}>
                                {entry.artist + " - " + entry.title}
                            </option>
                        )
                    })}
                </select>
                <br/>
                {nf.final_date}
            </div>
        )
    }

    const submitVote = async (e) => {
        e.preventDefault()
        await fetch(baseUrl + "cast_voting_ballot/", {headers: authHeaders, method: "POST", body: JSON.stringify(finalVotes)})
            .then((response) => {
                // if (response.status === 200) {
                //     toast.success('Success!')
                // }
                // else {
                //     toast.error('Something went wrong')
                // }
            })

    }

    const updateProfile = async (e) =>  {
        e.preventDefault()

        setCountry(currentCountry)
        setName(currentName)
        const body = {
            "first_name": currentName,
            "country": currentCountry
        }
        const finalOptions = {
            headers: authHeaders,
            method: 'PATCH',
            body: JSON.stringify(body),
        }
        const url = baseUrl + "update_user/"
        return await fetch(url, finalOptions).then((response) => {
            if (response.status === 200){
                setCountry(currentCountry)
                setName(currentName)
            }
        }).catch((e) => {console.log(e)})
    }

    return (
        <div style={{display: 'flex', 'flex-direction':'column'}}>
            <span style={{display: 'flex', 'flex-direction':'row', 'justify-content': "space-between"}}>
                <img src={"https://scontent-mad1-1.xx.fbcdn.net/v/t1.15752-9/253320266_1240276056456288_7360099326448372741_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=QJzhllAkBSIAX9LNdCe&_nc_ht=scontent-mad1-1.xx&oh=e66e93303422be74950927e83bc29f2b&oe=61C58A49"} height={150}/>
                <span style={{display: 'flex', 'flex-direction':'row', 'justify-content': "space-between"}}>
                    {"Hello "}
                    {name}
                    <br/>
                    <br/>
                    {"You've got a total of "+myScore+" points."}
                    <br/>
                    <br/>
                    {"You're ranked number "+myRank}
                    <span>
                    {"Update your profile"}
                    <form>
                        <input type={"text"} value={currentName} onChange={(event => setCurrentName(event.target.value))}/>
                        <select onClick={(e) => setCurrentCountry(e.target.value)}>
                            {Object.keys(countryListAlpha2).map(
                                (countrycode, id) => {
                                    if (countrycode === currentCountry){
                                        return(<option key={countrycode} value={countrycode} selected>{countryListAlpha2[countrycode]}</option>)

                                    }
                                    return(<option key={countrycode} value={countrycode} >{countryListAlpha2[countrycode]}</option>)
                                }
                            )}
                        </select>
                        <button onClick={async (e) => await updateProfile(e)}>Update your profile</button>
                    </form>

                    </span>
                </span>
                <span>
                    <button onClick={async (e) => await logout(e)}>Logout</button>
                </span>
            </span>
            <div style={{display: 'flex', 'flex-direction':'row', 'width': "100%", "justify-content": "space-around"}}>
                <span>
                    {ballot
                        .sort((nf1, nf2) => {
                            if(nf1.final_date < nf2.final_date) return -1
                            if(nf2.final_date < nf1.final_date) return 1
                            return 0
                        })
                        .map((nf) =>{
                            if (nf.entries.length === 0) return undefined
                            return countryBox(nf)
                    })}
                    <button onClick={submitVote}>
                        Cast your votes
                    </button>
                    <span>
                    {ballot
                        .sort((nf1, nf2) => {
                            if(nf1.final_date < nf2.final_date) return -1
                            if(nf2.final_date < nf1.final_date) return 1
                            return 0
                        })
                        .map((nf) =>{
                            if (nf.entries.length > 0) return undefined
                            return countryBox(nf)
                        })}
                    </span>
                    {/*<Toaster/>*/}
                </span>
                <span>
                    {leaderboard.length > 0 && leaderboard.map((entry) => {
                        return (<span>
                            <img src={getFlagForCountryNew(entry.country)} height={20}/>
                            {entry.rank}{". "}
                            {entry.first_name}{". "}
                            {entry.score}
                            <br/>
                        </span>  )
                    })}
                    <br/>.<br/>.<br/>.<br/>
                    <img src={getFlagForCountryNew(country)} height={20}/>
                    {myRank}{". "}
                    {name}{". "}
                    {myScore}
                    <br/>
                </span>
            </div>
        </div>
    );
};

export default Profile;