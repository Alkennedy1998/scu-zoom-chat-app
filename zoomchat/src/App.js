import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import sha256 from 'sha256';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import MessageForm from './components/MessageForm';
import AnonSignIn from './components/AnonSignIn';
import './App.css';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

var auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState('');

  return (
    <div className='App'>
      <header>
        <h1>SCU Zoom Chat</h1>
        <SignOut />
      </header>

      <section>
        {user
          ? <ChatRoom displayName={displayName}/>
          : <>
              <SignIn />
              <AnonSignIn setDisplayName={setDisplayName}/>
            </>
        }
      </section>
    </div>
  );
}


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>Sign in with Google</button>
      <p>If you sign in with google your name will show up next to messages</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className='sign-out' onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  // we will use this to scroll to bottom of chat on page-reload and after sending a message
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(25);

  const [messages] = useCollectionData(query, {idField: 'id'});


  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <main>
        {/* we will loop over the message and return a
        ChatMessage component for each message */}
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      {/* Form to type and submit messages */}

      <MessageForm />
    </>
  )
}


function ChatMessage(props) {
  const { text, uid, user, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://pbs.twimg.com/profile_images/1150444314188795904/TDxSmYz-_400x400.jpg'} />
      <p>{user + ': ' + text}</p>
    </div>
  </>)
}

export default App;