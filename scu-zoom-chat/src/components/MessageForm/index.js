/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {withFirebase} from '../../api/Firebase';

import '../../App.css';

const MessageForm = ({username, firebase, roomId})=>{
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    const {displayName, uid, photoURL} = firebase.auth.currentUser;

    if (displayName != null) {
      // username = displayName;
      localStorage.getValue('username');
    }

    firebase.firestore.collection(roomId).add({
      user: username,
      text: value,
      // error with firebase.firestore not function call, firebase.firestore())
      createdAt: firebase.app.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
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
};


export default withFirebase(MessageForm);
