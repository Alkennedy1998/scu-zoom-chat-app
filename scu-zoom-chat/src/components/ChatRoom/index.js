/* eslint-disable react/prop-types */
import React, {useEffect, useRef} from 'react';
import {withFirebase} from '../../api/Firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage';
import MessageForm from '../MessageForm';

const ChatRoom = ({firebase, username, match}) => {
  useEffect(() => {
    const checkData = () => {
      const user = localStorage.getItem('username');
      if (user) {
        username = user;
      }
    };

    window.addEventListener('storage', checkData);

    return () => {
      window.removeEventListener('storage', checkData);
    };
  });
  const {roomId} = match.params;

  // used to scroll to bottom of chat
  const dummy = useRef();

  const messagesRef = firebase.firestore.collection(roomId);
  // messagesRef.orderBy('createdAt', 'asc').limitToLast(50);
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(50);
  const [messages] = useCollectionData(query, {idField: 'id'});


  useEffect(() => {
    dummy.current.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <>
      <main>
        {/* Loops over the message and return a
          ChatMessage component for each message */}
        {messages && messages.map((msg) =>
          <ChatMessage
            key={msg.id}
            message={msg}
            firebase={firebase}
          />)
        }
        <span ref={dummy}></span>
      </main>

      <MessageForm username={username} roomId={roomId}/>
    </>
  );
};

export default withFirebase(ChatRoom);
