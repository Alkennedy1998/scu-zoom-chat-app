import React, { Component, useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';

import '../../App.css';

var auth = firebase.auth();
const firestore = firebase.firestore();

const MessageForm = ({anonDisplayName})=>{

  const [value,setValue] =useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    const { displayName, uid, photoURL } = auth.currentUser;

    if (anonDisplayName && displayName == null) {
      console.log('anon name assigned');
      displayName = anonDisplayName;
    } else if (displayName == null) {
      displayName = 'default';
    }

    firestore.collection('messages').add({
      user: displayName,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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


export default MessageForm;