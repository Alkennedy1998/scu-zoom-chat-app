import React, { useState } from 'react';
import { withFirebase } from '../../api/Firebase';

const SignOut = ({firebase}) => {
    return firebase.auth.currentUser && (
      <button className='sign-out' onClick={firebase.doSignOut}>Sign Out</button>
    )
  }

  export default withFirebase(SignOut);