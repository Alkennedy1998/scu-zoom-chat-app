import React, { useState } from 'react';
import { withFirebase } from '../../api/Firebase';
import '../../App.css';

const AnonSignIn = ({ setUsername, firebase }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    firebase.doSignInAnonymously()
      .then(() => {
        //console.log('Signed In Anonymously');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    // Call update method from displayName props
    setUsername(value);
    setValue('');
  };

  return (
    <>
      <input type='text' className = 'input-box' value={value} onChange={handleChange} placeholder='username' />
      <button type='submit' className='sign-in' disabled={!value} onClick={handleSubmit}>Sign in Anonymously</button>
      <p>Use this so no one will know who is typing</p>
    </>
  );
};

export default withFirebase(AnonSignIn);