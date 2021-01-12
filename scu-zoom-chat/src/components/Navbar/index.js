import React from 'react'
import {Link} from 'react-router-dom'
import { withFirebase } from '../../api/Firebase';

import InfoIcon from '@material-ui/icons/Info';
import colorData from '../../mui/colorData'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navbar = ({firebase,roomId,setRoomId,props}) =>{

    const handleAboutClick = () => {
        props.history.push('/about');
    }
    return(
        <header>
              <h1>SCU Zoom Chat</h1>
              <AccountCircleIcon onClick={firebase.doSignOut} disabled={!firebase.auth.currentUser}/>
              <MeetingRoomIcon onClick={() => setRoomId('')} disabled={!roomId}/>
              <InfoIcon onClick={handleAboutClick}/>
        </header>
    )
}

export default withFirebase(Navbar);