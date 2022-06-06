import { Route, BrowserRouter as Router, Switch, Link, useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import { ref, set, onValue, push, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { db } from "../../firebase";
import Phrase from '../PhrasePage';

function ViewPhrase(props) {

    const user = getAuth().currentUser;
    const [phraseList, setPhraseList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const viewStuff = () => {
        setPhraseList(props.data)
        //   console.log(phraseList)
    }

    const ids = Object.keys(phraseList);

    return (
        <div>
            <div>
                {ids.map((id, index) => {
                    return (
                        <div key={index} class="phrase-card">
                            <Link to={`/${id}`}>{phraseList[id]["Phrase"]}</Link>
                        </div>
                    )
                })
                }
            </div>
            <button onClick={() => viewStuff()}>View List</button>
        </div>
    );
}

export default ViewPhrase;