import React, { Component, useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';

import '../App.css';

var auth = firebase.auth();
const firestore = firebase.firestore();

const JoinRoom =()=>{

    const [zoomLink, setValue] = useState('');



    handleChange = event =>{
      setState({zoomLink:event.target.value});
    }

    handleSubmit = event => {

      sha256(zoomLink).substring(0,12)


      //switch to correct chat room
      setValue('');
      event.preventDefault();

    }

    render(){
    return (
      <>
          <input type="text" value={zoomLink} onChange={handleChange} placeholder="https://scu.zoom.us/xxxxxxxxxxxxxxxxxx" />
          <button type="submit" className = 'sign-in' disabled={!zoomLink} onClick={this.handleSubmit}>Join Room</button>
        <p>Enter the zoom link url and you will join a room with other students from that class</p>
      </>
    )
    }

  }

  export default JoinRoom