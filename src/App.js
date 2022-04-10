import logo from './logo.svg';
import './App.css';
import Add from "./Pages/Add.js";
import {Route, BrowserRouter as Router, Switch, Link, useParams} from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import { ref, set, onValue, push } from "firebase/database";
import {db} from "./firebase";
import "./index.css";
import Navbar from './Navbar';

import Phrase from './Pages/Phrase';

function App() {

  const uID = "Pat";
    const [phraseList, setPhraseList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);


    const readphraseListData = () =>{

        const phraseListData = ref((db), "users/" + `${uID}/` + "Phrases/");
        onValue(phraseListData,(snapshot) => {
          if (snapshot.exists()) {
            setPhraseList(snapshot.val())
            setDataLoaded(true);
            console.log("Data Loaded")
        
    
          } else {
            alert("No data found")
          }
        })
      } 

  useEffect(()=>{
    console.log(readphraseListData())
  },[])
  
  return (
    <div className="App">
      <Navbar/>
      <p class="dude">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus justo et sem dictum lobortis.</p>

      <Router>
        <Switch>
        
          <Route path = '/add' ><Add data = {phraseList}/></Route>
          <Route path = '/:id' ><Phrase data = {phraseList}/></Route>
        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
