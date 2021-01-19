/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
// import {useAuthState} from 'react-firebase-hooks/auth';
import {BrowserRouter as Switch, Route} from 'react-router-dom';


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
const App = ({firebase}) => {
  // const [user] = useAuthState(firebase.auth);
  const [username, setUsername] = useState('default');
  const [roomId, setRoomId] = useState('');
  // const muiTheme = createMuiTheme(colorData);

  useEffect(() => {
    return firebase.auth.onAuthStateChanged((user) => {
      if (!user) {
        // history.push('/signin');
      } else if (roomId) {
        // history.push('/room/roomId/'+roomId);
      } else {
        // history.push('/');
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

export default withFirebase(App);
