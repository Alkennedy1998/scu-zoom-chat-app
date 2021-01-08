import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import crypto from ("crypto");

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {DisplayNameContext} from './DisplayNameProvider'

firebase.initializeApp({

    apiKey: "AIzaSyDrf7Sv9B1Lbqy9Evel-WQyjVrQbfKn97c",
    authDomain: "scu-zoom-chat-app.firebaseapp.com",
    projectId: "scu-zoom-chat-app",
    storageBucket: "scu-zoom-chat-app.appspot.com",
    messagingSenderId: "429074569360",
    appId: "1:429074569360:web:9a03a76cf7a1980244a015",
    measurementId: "G-XHBN8QJ0HZ"

});

var auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {

  crypto.createHash("sha256")
  .update("Man oh man do I love node!")
  .digest("hex")
  const [user] = useAuthState(auth);

  return (
       <div className="App">
      <header>
        <h1>SCU Zoom Chat</h1>
        <SignOut />
      </header>

      <DisplayNameContext.Consumer>
        {({anonDisplayName,updateDisplayName})=>(
          <section>
          {user ? <ChatRoom anonDisplayName={anonDisplayName}/> :
          <>
          <SignIn />
          <AnonSignIn updateDisplayName={updateDisplayName}/>
          </>}
        </section>
        )}
      </DisplayNameContext.Consumer>


    </div>
  );
}
class JoinRoom extends React.Component(){
  constructor(props)
  {
    super(props);
    this.state = {zoomLink: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event)
  {
    this.setState({displayName:event.target.value});
  }

  handleSubmit(event)
  {
    crypto.createHash("sha256")
    .update(this.state.zoomLink)
    .digest("hex")

    // hash zoomlink

    //switch to correct chat room
    this.state.zoomLink = '';
    event.preventDefault();

  }

  render(){
  return (
    <>
        <input type="text" value={this.state.zoomLink} onChange={this.handleChange} placeholder="https://scu.zoom.us/xxxxxxxxxxxxxxxxxx" />
        <button type="submit" className = 'sign-in' disabled={!this.state.zoomLink} onClick={this.handleSubmit}>Join Room</button>
      <p>Enter the zoom link url and you will join a room with other students from that class</p>
    </>
  )
  }

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
    this.state = {displayName: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event)
  {
    this.setState({displayName:event.target.value});
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

    //Call update method from displayName Context
    this.props.updateDisplayName(this.state.displayName);

    this.state.displayName = '';
    event.preventDefault();

  }

  render(){
  return (
    <>
        <input type="text" value={this.state.displayName} onChange={this.handleChange} placeholder="username" />
        <button type="submit" className = 'sign-in' disabled={!this.state.displayName} onClick={this.handleSubmit}>Sign in Anonymously</button>
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

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(25);

  const [messages] = useCollectionData(query, {idField: 'id'});


  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

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
    alert(this.props.anonDisplayName);

    const { displayName, uid, photoURL } = auth.currentUser;

    //Get display name from context
    const anonDisplayName = this.props.anonDisplayName;

    if(anonDisplayName && displayName == null)
    {
      console.log("anon name assigned")
      displayName = anonDisplayName
    }
    else if(displayName == null)
    {
      displayName = "default";
    }

    firestore.collection("messages").add({
      user: displayName,
      text: this.state.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL
    })

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