/* eslint-disable react/prop-types */
import React from 'react';
import {withFirebase} from '../../api/Firebase';
import {withRouter} from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navbar = ({firebase, roomId, setRoomId, history}) =>{
  const handleAboutClick = () => {
    history.push('/about');
  };
  return (
    <header className="header">
      <h1>SCU Zoom Chat</h1>
      <div className='nav-button-group'>

        <span className='nav-button'>
          <AccountCircleIcon onClick={() => {
            firebase.doSignOut(); history.push('');
          }} />
        </span>

        <span className='nav-button'>
          <MeetingRoomIcon onClick={() => setRoomId('')} />
        </span>
        <span className='nav-button'>
          <InfoIcon onClick={handleAboutClick}/>
        </span>
      </div>
    </header>
  );
};

export default withRouter(withFirebase(Navbar));
