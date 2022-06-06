import React from 'react';
import { useState } from 'react';
import Signup from './User/Signup';

function Navbar(props) {
    const [showModal, setShowModal] = useState(false);
    const [signIn, setSignIn] = useState(true);

    const signup = ()=>{
        setShowModal(true);
        setSignIn(false);
    }
    const signin = ()=>{
        setShowModal(true);
        setSignIn(true);
    }

    return (
        <div>
        <div class="navbar">
            <p>Decorum</p>
        </div>
        <button onClick={()=>signup()}>Sign Up</button>
        <button onClick={()=>signin()}>Sign In</button>

        {showModal && <Signup signIn={signIn}/>}
        </div>
    );
}

export default Navbar;