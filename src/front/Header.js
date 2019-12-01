import React, { useState } from 'react';
import './header.css'; 

function Header({ img, name }) {
  return (
    <div className='top-container'>
      <img className='profile-picture' src={img}></img>
      <h3>{name}</h3>
    </div>
  );
}

export default Header;
