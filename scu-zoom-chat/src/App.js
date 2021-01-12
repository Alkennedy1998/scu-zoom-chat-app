import React, {useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';

import Navbar from './components/Navbar';
import SignInPage from './components/SignInPage'
import About from './components/About'
import ChatRoom from './components/ChatRoom';
import JoinRoom from './components/JoinRoom';
import { withFirebase } from './api/Firebase';


function App({ firebase }) {
  const [user] = useAuthState(firebase.auth);
  const [username, setUsername] = useState('default');
  const [roomId, setRoomId] = useState('');
  //const muiTheme = createMuiTheme(colorData);

  return (
    <Router>
      <Switch>

        <Route exact path = '/' component ={JoinRoom}/>
        <Route
        exact path = '/signin'
        render={(props) => (
          <SignInPage {...props} firebase={firebase} setUsername={setUsername} roomId={roomId}/>
        )}
        />
        <Route path='/about' component={About}/>
        <Route
        path = '/:roomId'
        render={(props) => (
          <ChatRoom {...props} username={username} firebase={firebase}/>
        )}
        />
        </Switch>
      </Router>
    );
}



export default withFirebase(App);