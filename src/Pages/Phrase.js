import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, set, onValue, push } from "firebase/database";
import {db} from "../firebase";


function Phrase(props) {

    const [response,setResponse] = useState("");
    const [responseList,setResponseList] = useState("");

    const uID = "Pat";

    let{id} = useParams();
    const data = props.data

    const writeResponseData = () => {
        
        push(ref(db,'users/'+ `${uID}/` + 'Phrases/' + `${id}/` + "Responses/"),response)
        setResponse("")
    }

      useEffect(()=>{

        const responseListData = ref((db), "users/" + `${uID}/` + "Phrases/" + `${id}/` + "Responses/");
        onValue(responseListData,(snapshot) => {
          if (snapshot.exists()) {
            setResponseList(snapshot.val())
            // console.log(response)
          } 
        })
      },[])

        const responseIDs = Object.keys(responseList);

        const viewResponses = () =>{
            console.log(responseList)
            console.log(responseIDs)
            }

    return (
        <div>
            <div id="headline">
            <p id="question">How do you professionally say...</p>
            <h2>{data[id]["Phrase"]}</h2>
            
            <div id="form">
            <input type="text" onChange={(e)=>setResponse(e.target.value) } value = {response} class="query" placeholder='Response...'></input><br/>
            <button onClick={()=>writeResponseData()}>Submit Response</button>
            </div>

            </div>



            {data[id].hasOwnProperty('Responses') &&
            
            <div>
                <table>
                    {responseIDs.map((responseID,index)=>{
                        return(
                            <tr>
                                <td>{data[id]['Responses'][responseID]}</td>
                            </tr>        
                        )
                    })
                    }
                </table>
            </div>}
        </div>
    );
}

export default Phrase;