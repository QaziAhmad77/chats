import React, { useContext } from 'react';
import userImg from '../img/avatar.jpg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {authContext} from '../context/authContext';

const Navbar = () => {
  const { currentUser } = useContext(authContext);
  console.log(currentUser)
  return (
    <div className="navbar">
      <span className="logo">Qazi Ahmad</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
