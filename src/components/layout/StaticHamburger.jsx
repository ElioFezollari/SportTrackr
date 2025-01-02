import React from 'react';
import '../../styles/components/layouts/staticHamburger.css';
import { NavLink } from 'react-router';

function StaticHamburger({ hamburgerOpen,setHamburgerOpen }) {
  return (
    <div
      className="static-hamburger"
      style={{ display: hamburgerOpen ? 'flex' : 'none' }}
    >
        <button onClick={()=>setHamburgerOpen(false)}>X</button>
        <div className='static-hamburger-link'>            
        <NavLink activeclassname='is-active' to={'/'}>Home</NavLink>
            <NavLink activeclassname='is-active' to={'/about-us'}>About Us</NavLink>
            <NavLink activeclassname='is-active' to={'/login'}>Login</NavLink>
            <NavLink activeclassname='is-active' to={'/register'}>Register</NavLink>
            </div>
    </div>
  );
}

export default StaticHamburger;
