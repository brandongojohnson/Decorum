import React from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Upload from './Upload';
import {db} from "../firebase";
import {set, ref as dataRef, update, onValue } from "firebase/database";
import { useState } from 'react';
import UserInfo from './UserInfo.js';

function Signup(props) {

  //Sign up
    //Email
    //Username
    //Password

  //Log in
    //Username
    //Password

  //-----------------------------------------------
  const auth = getAuth();
  const user = auth.currentUser;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const clear = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  }

  const addUserName = (uid) =>{
    update(dataRef(db, 'users/' + `${uid}/`), {
        displayName: username,
        })
        
      }

  const newUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        
        addUserName(userCredential.user.uid);
        clear();

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      clear();
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

       {props.signIn != true && <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} value = {username}></input>}
       <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value = {email}></input>
       <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value = {password}></input><br/>
       {props.signIn != true ? <button onClick={newUser}> Sign Up</button> : <button onClick={signIn}> Sign In</button>}

      </div>
    </div>
  );
}

export default Signup;