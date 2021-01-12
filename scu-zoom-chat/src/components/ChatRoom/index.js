import React, { useEffect, useRef } from 'react';
import { withFirebase } from '../../api/Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage';
import MessageForm from '../MessageForm';
import Navbar from '../Navbar';

const ChatRoom = ({ firebase, username,props }) => {

    //Ensure the user is signed in to access chat
    if(!firebase.user){
      props.history.push('/signin');
    }
    const {roomId} = this.props.match.params;

    // we will use this to scroll to bottom of chat on page-reload and after sending a message
    const dummy = useRef();

    const messagesRef = firebase.firestore.collection(roomId);
    //messagesRef.orderBy('createdAt', 'asc').limitToLast(50);
    const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(50);
    const [messages] = useCollectionData(query, {idField: 'id'});


    useEffect(() => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
      <>
        <main>
          {/* we will loop over the message and return a
          ChatMessage component for each message */}
          {messages && messages.map(msg =><ChatMessage key={msg.id} message={msg} firebase={firebase} />)}
          <span ref={dummy}></span>
        </main>

        {/* Form to type and submit messages */}

        <MessageForm username={username} roomId={roomId}/>
      </>
    )
  }

  export default withFirebase(ChatRoom);

