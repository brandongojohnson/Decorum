import React from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Upload from './Upload';
import {db} from "../firebase";
import {set, ref as dataRef, update, onValue } from "firebase/database";
import { useState } from 'react';
import UserInfo from './UserInfo.js';

function Signup(props) {

  //-----------------------------------------------
  const [username, setUsername] = useState("");
  const user = getAuth().currentUser;

  const addUserName = () =>{
    updateProfile(user, {
        userName: username,
        })
    update(dataRef(db, 'users/' + `${user.uid}/`), {
        displayName: username,
        })
    // console.log("Just testing")
    // props.setPressAdd(false)


return (
    <div>
        <input type="text" onChange={(e)=>setUsername(e.target.value)} value = {username} placeholder = "username"></input><br/>
        {props.pressAdd && addUserName()}
        {/* <button onClick={()=>addUserName()}>Add Username</button> */}
     
        <Upload/>
    </div>
);
  }

  //----------------------------------------------

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [addUsername, setAddUserName] = useState(false)
  const[pressAdd,setPressAdd] = useState(false);



  const auth = getAuth();

  const clear = () => {
    setEmail("");
    setPassword("");
  }

  const newUser = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        clear();

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      setPressAdd(true);
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // setAddUserName(true)
        // ...
        clear();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const logOff = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div class="modal">
      <div class="modal-content">
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
        <input type="text" onChange={(e)=>setUsername(e.target.value)} value = {username} placeholder = "username"></input><br/>


        {props.signIn == false
          ? <div>
              {/* <UserInfo pressAdd = {pressAdd} setPressAdd = {setPressAdd}/> */}
              {addUserName()}
              <button onClick={() => newUser()}>Sign up</button>
            </div>
          : <button onClick={() => signIn()}>Sign in</button>}

        <button onClick={() => logOff()}>Log off</button>
      </div>
    </div>
  );
}

export default Signup;