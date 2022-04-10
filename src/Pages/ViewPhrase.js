import {Route, BrowserRouter as Router, Switch, Link, useParams} from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import { ref, set, onValue, push, update } from "firebase/database";
import {db} from "../firebase";
import Phrase from './Phrase';

function ViewPhrase(props) {

    const uID = "Pat";
    const [phraseList, setPhraseList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    
      const viewStuff = () =>{
          setPhraseList(props.data)
          console.log(phraseList)
      }

    const names = Object.keys(phraseList);

    const showNames = () =>{
        console.log(names)
    }

    return (

        <div>
            <div>
                { names.map((name, index)=>{
                    return(
                        <div key = {index}>
                            <Link to = {`/${name}`}>{phraseList[name]["Phrase"]}</Link>
                        </div>
                    )
                })
                }
            </div>
    
            <button onClick={()=>viewStuff()}>View List</button>
            {/* <button onClick={()=>showNames()}>show Names</button> */}
            {/* <button onClick={()=>viewData()}>View Data</button> */}
            {/* <button onClick={()=>rePop()}>Pop</button> */}
        </div>
    );
}

export default ViewPhrase;