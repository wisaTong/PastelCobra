import React from 'react';
import './navbar.css';

function Navbar({ img, name }) {
  return (
    <nav className='navbar'>
      <div className='nav-item-container'>
        <div className='round'>
          <img className='profile-picture' src={img}></img>
        </div>
        <h3>{name}</h3>
      </div>
    </nav>
  );
}

export default Navbar;
