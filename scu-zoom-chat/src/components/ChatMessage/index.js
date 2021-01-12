import React from 'react';

const ChatMessage = (props) => {
    const { text, uid, user, photoURL } = props.message;

    const messageClass = uid === props.firebase.auth.currentUser.uid ? 'sent' : 'received';

    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://pbs.twimg.com/profile_images/1150444314188795904/TDxSmYz-_400x400.jpg'} alt = ";)"/>
        <p>{user + ': ' + text}</p>
      </div>
    </>)
}

export default ChatMessage;