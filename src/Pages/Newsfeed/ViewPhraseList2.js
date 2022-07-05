import { Route, BrowserRouter as Router, Switch, Link, useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import { ref, set, onValue, push, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { db } from "../../firebase";
import Phrase from '../PhrasePage';

function ViewPhraseList2(props) {

    const user = getAuth().currentUser;

    const [phraseList, setPhraseList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [data, setData] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const viewStuff = () => {
        setPhraseList(props.phrasedata)
        setUserList(props.userdata)
        //   console.log(phraseList)
    }

    const ids = Object.keys(phraseList);

    const upVote = (pID) =>{
        phraseList[pID].hasOwnProperty('Likes') 
        ? update(ref(db, 'Phrases/' + `${pID}/`), {
            Likes: phraseList[pID]["Likes"]+1
        }) 
        : update(ref(db, 'Phrases/' + `${pID}/`), {
            Likes: 1
        }) 
    }

    useEffect(() => {
        const data = ref(db);
        onValue(data, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val())
            }
        })
    }, [])

    
    return (
        <div>
           
            <div>
                {ids.map((id, index) => {
                    return (
                        <div key={index} class="phrase-card">
                            <p>{data["users"][phraseList[id]["uID"]]["displayName"]}</p>
                            <Link to={`/${id}`}>{data["Phrases"][id]["Phrase"]}</Link><br/><br/>
                            <button onClick={()=>upVote(id)}>Vote Up2</button>
                            <button>Vote Downhkdhkdjdkhk</button>
                        </div>
                    )
                })
                }
            </div>
            
            {/* <button onClick={() => viewStuff()}>View List</button> */}
        </div>
    );
}

export default ViewPhraseList2;