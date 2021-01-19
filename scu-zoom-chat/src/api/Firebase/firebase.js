/* eslint-disable require-jsdoc */
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.app = app;
    this.auth = app.auth();
    this.firestore = app.firestore();
    this.analytics = app.analytics();
  }

  doSignInWithGoogle() {
    const provider = new app.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  };

  doSignInAnonymously() {
    return this.auth.signInAnonymously();
  }
  doSignOut() {
    return this.auth.signOut();
  }
}

export default Firebase;
