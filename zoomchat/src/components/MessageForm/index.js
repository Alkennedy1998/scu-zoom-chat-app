import React, { Component, useEffect, useRef, useState } from 'react';
import { withFirebase } from '../../api/Firebase';

import '../../App.css';

const MessageForm = ({ displayName, firebase })=>{

  const [value,setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    const { displayName, uid, photoURL } = firebase.auth.currentUser;

    if (anonDisplayName && displayName == null) {
      console.log('anon name assigned');
      displayName = anonDisplayName;
    } else if (displayName == null) {
      displayName = 'default';
    }

    firebase.firestore.collection('messages').add({
      user: displayName,
      text: value,
      createdAt: firebase.app.firestore.FieldValue.serverTimestamp(), // this might have an error with firebase.firestore (not the functioncall, firebase.firestore())
      uid: uid,
      photoURL: photoURL
    });

    setValue('');
    event.preventDefault();
  };



    return (
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={handleChange}
          placeholder='Speak Your Mind' />
        <button
          type='submit'
          disabled={!value}>
            send
        </button>
      </form>
    );
}


export default withFirebase(MessageForm);