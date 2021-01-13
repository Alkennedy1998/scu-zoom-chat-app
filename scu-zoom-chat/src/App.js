/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useState} from 'react';
// import {useAuthState} from 'react-firebase-hooks/auth';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
function App({firebase}) {
  // const [user] = useAuthState(firebase.auth);
  const [username, setUsername] = useState('default');
  const [roomId, setRoomId] = useState('');
  // const muiTheme = createMuiTheme(colorData);

  AuthStateListener() {

  }
  FirebaseAuth.addAuthStateListener(AuthStateListener);

  window.addEventListener('keydown', (event) => {
    console.log('keydown <:)');
  });
  return (
    <Router>
      <Navbar setRoomId={setRoomId} roomId={roomId}/>
      <div className='page-content'>
        <Switch>
          <Route exact path = '/' component ={JoinRoom}/>
          <Route path='/about' component={About}/>
          <Route exact path = '/signin' render={(props) => <SignInPage {...props} setUsername={setUsername} roomId={roomId}/>}/>
          <Route path = '/room/:roomId' render={(props) => <ChatRoom {...props} username={username} />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default withFirebase(App);
