/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
// import {useAuthState} from 'react-firebase-hooks/auth';
import {withRouter, BrowserRouter as Switch, Route} from 'react-router-dom';
// import {withRouter} from 'react-router-dom';


// import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import SignInPage from './components/SignInPage';
import About from './components/About';
import ChatRoom from './components/ChatRoom';
import JoinRoom from './components/JoinRoom';
import {withFirebase} from './api/Firebase';
/**
 * main component contains NavBar and all Routes
 * @param {Firebase} firebase Contains all firebase functions.
 * @return {void} rendered with the switch's choice.
 */
const App = ({firebase, history}) => {
  const [username, setUsername] = useState('default');
  const [roomId, setRoomId] = useState('');

  // ! Possibly calling API every time app rendered
  // todo Find a more efficient method

  useEffect(() => {
    return firebase.auth.onAuthStateChanged((user) => {
      console.log('Auth state Changed! : ' + user.uid);
      if (!user) {
        console.log('push, User: '+ user);
        history.push('/signin');
      } else if (!roomId) {
        console.log('Join room');
        history.push('/');
      } else if (roomId) {
        console.log('Joining Room: '+roomId);
        history.push('/room/roomId/'+roomId);
      } else {
        console.log('error: ' + roomId);
      }
    });
  }, []);

  return (
    <>
      <Navbar setRoomId={setRoomId} roomId={roomId}/>
      <div className='page-content'>
        <Switch>
          <Route exact path = '/' component ={JoinRoom}/>
          <Route path='/about' component={About}/>
          <Route exact path = '/signin' render={(props) => <SignInPage {...props} setUsername={setUsername} roomId={roomId}/>}/>
          <Route path = '/room/:roomId' render={(props) => <ChatRoom {...props} username={username} />}/>
        </Switch>
      </div>
    </>
  );
};

export default withRouter(withFirebase(App));
