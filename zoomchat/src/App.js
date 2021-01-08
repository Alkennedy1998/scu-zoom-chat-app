import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import sha256 from 'sha256';

import SignOut from './components/SignOut';
import MessageForm from './components/MessageForm';
import AnonSignIn from './components/AnonSignIn';
import GoogleSignIn from './components/GoogleSignIn';
import { withFirebase } from './api/Firebase';
import './App.css';

function App({ firebase }) {
  const [user] = useAuthState(firebase.auth);
  const [displayName, setDisplayName] = useState('');

  return (
    <div className='App'>
      <header>
        <h1>SCU Zoom Chat</h1>
        <SignOut />
      </header>

      <section>
        {user
          ? <ChatRoom displayName={displayName} firebase={firebase}/>
          : <>
              <GoogleSignIn />
              <AnonSignIn setDisplayName={setDisplayName}/>
            </>
        }
      </section>
    </div>
  );
}




function ChatRoom({ firebase, displayName }) {

  // we will use this to scroll to bottom of chat on page-reload and after sending a message
  const dummy = useRef();

  const messagesRef = firebase.firestore.collection('messages');
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
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} firebase={firebase} />)}
        <span ref={dummy}></span>
      </main>

      {/* Form to type and submit messages */}

      <MessageForm displayName={displayName} />
    </>
  )
}


function ChatMessage(props) {
  const { text, uid, user, photoURL } = props.message;

  const messageClass = uid === props.firebase.auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://pbs.twimg.com/profile_images/1150444314188795904/TDxSmYz-_400x400.jpg'} />
      <p>{user + ': ' + text}</p>
    </div>
  </>)
}

export default withFirebase(App);