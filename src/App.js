import logo from './logo.svg';
import './App.css';
import './modal.css';
import Add from "./Pages/Newsfeed/Newsfeed.js";
import UserInfo from './User/UserInfo.js';
import {Route, BrowserRouter as Router, Switch, Link, useParams} from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import { ref, set, onValue, push } from "firebase/database";
import {db} from "./firebase";
import "./index.css";
import Navbar from './Navbar';
import Signup from './User/Signup';

import Phrase from './Pages/PhrasePage';

function App() {

  const uID = "Pat";
    const [phraseList, setPhraseList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);


    const readphraseListData = () =>{

        const phraseListData2 = ref((db), "users/" + `${uID}/` + "Phrases/");
        const phraseListData = ref((db),"Phrases/");
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

      // const testing = () =>{
      //   return(
      //     <div>
      //       <h1>This is a test Sir</h1>
      //     </div>
      //   )
      // }

  useEffect(()=>{
    console.log(readphraseListData())
  },[])
  
  return (
    <div className="App">
      <Navbar/>
      {/* {testing()} */}
      <Router>
        <Switch>
        
          <Route path = '/add' ><Add data = {phraseList}/></Route>
          <Route path = '/signup2' ><Signup/></Route>
          <Route path = '/edit' ><UserInfo/></Route>
          <Route path = '/:id' ><Phrase data = {phraseList}/></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
