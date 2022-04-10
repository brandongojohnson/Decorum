import React, { useState, useEffect } from 'react';
import {db} from "../firebase";
import ViewPhrase from './ViewPhrase';
import { ref, set, onValue, push, update } from "firebase/database";
import {IDGenerator} from "./IDGenerator.js"



function Add(props) {
    const [phrase, setPhrase] = useState('');


    const writeUserData = () => {

        const userID = "Pat";
        const iD = IDGenerator();

        update(ref(db,'users/'+ `${userID}/` + 'Phrases/' + `${iD}/` ),{
            Phrase: phrase,
            UniqueID: iD,
        })
        setPhrase("")
        console.log(IDGenerator())
    }

    return (
        <div>
            
            <h1>How do you professionally say?</h1>
            <input type = 'text' onChange={(e) => setPhrase(e.target.value)} value = {phrase}></input>
            <button onClick={writeUserData}>Submit</button><br/>

            <ViewPhrase data = {props.data}/>
        </div>
    );
}

export default Add;