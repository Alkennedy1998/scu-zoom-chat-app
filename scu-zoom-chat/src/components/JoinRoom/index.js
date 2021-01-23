/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import sha256 from 'sha256';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../../api/Firebase';

import '../../App.css';
const JoinRoom = ({history, firebase}) => {
  const [zoomLink, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    // switch tso correct chat room
    const roomId = (sha256(zoomLink).substring(0, 12));
    history.push('/room/' + roomId);
    setValue('');
    event.preventDefault();
  };


  return (
    <>
      <h2>Please be Civil</h2>
      <h3>Enter your link to join your class</h3>
      <input
        type="text"
        value={zoomLink}
        onChange={handleChange}
        placeholder="https://scu.zoom.us/..." />
      <button
        type="submit"
        className='sign-in'
        disabled={!zoomLink}
        onClick={handleSubmit}
      >Enter
      </button>
    </>
  );
};

export default withRouter(withFirebase(JoinRoom));
