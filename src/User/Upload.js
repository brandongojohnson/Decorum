import React from 'react';
import { getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {set, ref as dataRef, update, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import {db} from "../firebase";
import { useState } from 'react';

function U2(props) {
    const [fileURL, setFileURL] = useState(null);
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);

    const user = getAuth().currentUser;

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const fileRef = ref(storage, file.name);

       uploadBytes(fileRef, file)
        .then((snapshot) => {
            console.log("good job");
            (getDownloadURL(fileRef)
            .then(data => {
                // console.log(data)
                setFileURL(data)
            })
            )
          })
          setShow(true);
      };
    
        //connect user with photo
      const addPic = () => {
        update(dataRef(db, 'users/' + `${user.uid}/`), {
            ProfilePic: fileURL,
        });
        // console.log(user)
        setShow(false);
    }
    return (
      
        <div>
           {show && <button onClick = {addPic}>Add Pic</button>}
            <input type="file" onChange={onFileChange} />
            {/* <button onClick={()=>console.log(fileURL)}>fileURL</button> */}
        </div>
        
    );
}

export default U2;