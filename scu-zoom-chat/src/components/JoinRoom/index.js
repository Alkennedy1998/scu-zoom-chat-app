import React, { useState } from 'react';
import sha256 from 'sha256';

import '../../App.css';
import Navbar from '../Navbar';
const JoinRoom =(props)=>{

    const [zoomLink, setValue] = useState('');



    const handleChange = event =>{
      setValue(event.target.value);
    }

    const handleSubmit = event => {

      //switch to correct chat room
      const roomId=(sha256(zoomLink).substring(0,12));
      props.history.push('/'+roomId);
      setValue('');
      event.preventDefault();
    }


    return (
      <>
        <h2>Please be Civil</h2>
        <h3>Enter your link to join your class</h3>
        <input type="text" value={zoomLink} onChange={handleChange} placeholder="https://scu.zoom.us/..." />
        <button type="submit" className = 'sign-in' disabled={!zoomLink} onClick={handleSubmit}>Enter</button>
      </>
    )


  }

  export default JoinRoom;