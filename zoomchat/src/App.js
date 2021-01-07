import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({

    apiKey: "AIzaSyDrf7Sv9B1Lbqy9Evel-WQyjVrQbfKn97c",
    authDomain: "scu-zoom-chat-app.firebaseapp.com",
    projectId: "scu-zoom-chat-app",
    storageBucket: "scu-zoom-chat-app.appspot.com",
    messagingSenderId: "429074569360",
    appId: "1:429074569360:web:9a03a76cf7a1980244a015",
    measurementId: "G-XHBN8QJ0HZ"

});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>SCU Zoom Chat</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <>
        <SignIn />
        <AnonSignIn/>
        </>}
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
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>If you sign in with google your name will show up next to messages</p>
    </>
  )

}

class AnonSignIn extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event)
  {
    this.setState({value:event.target.value});
  }

  handleSubmit(event)
  {

    firebase.auth().signInAnonymously()
    .then(() => {
      console.log("Signed In Anonymously");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });

    this.state.value = '';
    event.preventDefault();

  }

  render(){
  return (
    <>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="username" />
        <button type="submit" className ="sign-in" disabled={!this.state.value} >Sign in Anonymously</button>
      </form>
      <p>Use this so no one will know who is typing</p>
    </>
  )
  }

}
function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {

  // we will use this to scroll to bottom of chat on page-reload and after sending a message
  const dummy = useRef();
  //var messages = [];

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])



/*
  // getting the message and sorting them by time of creation
  const messagesRef = firestore.collection("messages");
  messagesRef.orderBy('createdAt', 'asc').limit(25).then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        messages.push(doc);
    })
  });
*/

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <main>
        {/* we will loop over the message and return a
        ChatMessage component for each message */}
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      {/* Form to type and submit messages */}

      <MessageForm/>
      </>
  )
}

class MessageForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event)
  {
    this.setState({value:event.target.value});
  }

  handleSubmit(event)
  {

    alert('A message was submitted ' + this.state.value);

    const { displayName, uid, photoURL } = auth.currentUser;

    firestore.collection("messages").add({
      user: displayName,
      text: this.state.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL
    })

    /*
    .then(()=>{

    });
    */
    this.state.value = '';
    event.preventDefault();

  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Speak Your Mind" />
        <button type="submit" disabled={!this.state.value}>send</button>
      </form>
    )
  }
}

function ChatMessage(props) {
  const { text, uid, user, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://pbs.twimg.com/profile_images/1150444314188795904/TDxSmYz-_400x400.jpg'} />
      <p>{user + ": " + text}</p>
    </div>
  </>)
}

export default App;