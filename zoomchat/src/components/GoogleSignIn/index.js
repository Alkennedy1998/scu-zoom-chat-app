import React from 'react';

import { withFirebase } from '../../api/Firebase';

const GoogleSignIn = ({ firebase }) => {

    return (
        <>
            <button className='sign-in' onClick={firebase.doSignInWithGoogle}>Sign in with Google</button>
            <p>If you sign in with google your name will show up next to messages</p>
        </>
    );
};

export default withFirebase(GoogleSignIn);