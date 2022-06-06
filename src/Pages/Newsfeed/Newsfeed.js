import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import ViewPhraseList from './ViewPhraseList';
import { ref, set, onValue, push, update } from "firebase/database";
import { IDGenerator } from "../../IDGenerator.js"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


function Add(props) {
    const user = getAuth().currentUser;
    const [phrase, setPhrase] = useState('');

    const writeUserData = () => {
        const userID = "Pat";
        const pID = IDGenerator();

        //User Declaration
        push(ref(db, 'users/' + `${user.uid}/` + 'userPosts/'), pID)

        //All Phrases
        update(ref(db, 'Phrases/' + `${pID}/`), {
            Phrase: phrase,
            pID: pID,
            uID: user.uid,
        })
        setPhrase("")
        console.log(IDGenerator())
    }

    return (
        <div>
            <h1>How do you professionally say?</h1>
            <input type='text' onChange={(e) => setPhrase(e.target.value)} value={phrase}></input>
            <button onClick={writeUserData}>Submit</button><br />
            <ViewPhraseList data={props.data} />
        </div>
    );
}

export default Add;