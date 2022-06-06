import React from 'react';
import { useState } from 'react';
import Upload from './Upload';
// import U2 from './U2.js';
import {set, ref as dataRef, update, onValue } from "firebase/database";
import { getAuth,updateProfile } from 'firebase/auth';
import {db} from "../firebase";


function UserInfo(props) {
    const [username, setUsername] = useState("")
    const user = getAuth().currentUser;

    //fields that update user profile info 

    const addUserName = () =>{
        // updateProfile(user, {
        //     userName: username,
        //     })
        // update(dataRef(db, 'users/' + `${user.uid}/`), {
        //     displayName: username,
        //     })
        console.log("Just testing")
        props.setPressAdd(false)
    };
    
    return (
        <div>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} value = {username} placeholder = "username"></input><br/>
            {props.pressAdd && addUserName()}
            {/* <button onClick={()=>addUserName()}>Add Username</button> */}
         
            <Upload/>
        </div>
    );
}

export default UserInfo;