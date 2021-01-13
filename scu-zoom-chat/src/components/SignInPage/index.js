/* eslint-disable react/prop-types */
import AnonSignIn from '../AnonSignIn';
import GoogleSignIn from '../GoogleSignIn';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../../api/Firebase';
import React from 'react';

const SignInPage =({firebase, setUsername, roomId, history})=>{
  const redirect = () => {
    console.log(roomId);
    history.push('/room/' + roomId);

    if (!roomId) {
      history.push('/');
    }
  };


  return (
    <>
      <div className='google-sign-in'>
        <GoogleSignIn />
      </div>
      <AnonSignIn redirect={redirect} setUsername={setUsername}/>
    </>
  );
};

export default withRouter(withFirebase(SignInPage));
