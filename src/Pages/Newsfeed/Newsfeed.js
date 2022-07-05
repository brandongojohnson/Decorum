import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
// import ViewPhraseList from './ViewPhraseList';
import ViewPhraseList2 from './ViewPhraseList';
import { ref, set, onValue, push, update } from "firebase/database";
import { IDGenerator } from "../../IDGenerator.js"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

//See all new posts
//Post inquiry 

function Add(props) {
    const user = getAuth().currentUser;
    const [phrase, setPhrase] = useState('');

    const writeUserData = () => {
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
            {/* <ViewPhraseList 
            phrasedata={props.phrasedata}
            userdata = {props.userdata}
            loaded = {props.loaded}
             /> */}
             <ViewPhraseList2
            phrasedata={props.phrasedata}
            userdata = {props.userdata}
            loaded = {props.loaded}
             />
        </div>
    );
}

export default Add;