/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {withFirebase} from '../../api/Firebase';
import '../../App.css';

const AnonSignIn = ({setUsername, redirect, firebase}) => {
  const [value, setValue] = useState('');


  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Call update method from displayName props

    firebase.doSignInAnonymously()
        .then(() => {
          setUsername(value);
          localStorage.setItem('username', value);
          setValue('');
          redirect();
        // console.log('Signed In Anonymously');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
  };

  return (
    <>
      <input
        type='text'
        className = 'input-box'
        value={value}
        onChange={handleChange}
        placeholder='username' />

      <button
        type='submit'
        className='sign-in anon-sign-in'
        disabled={!value}
        onClick={handleSubmit}
      >Sign in Anonymously
      </button>
      <p>Use this so no one will know who is typing</p>
    </>
  );
};

export default withFirebase(AnonSignIn);
