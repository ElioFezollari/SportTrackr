import React, { useEffect } from 'react';
import '../../../styles/components/layouts/staticHamburger.css';
import { NavLink } from 'react-router';

function StaticHamburger({ hamburgerOpen,setHamburgerOpen }) {
    
    useEffect(() => {
        if (hamburgerOpen) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
      }, [hamburgerOpen]);

  return (
    <>
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
    {hamburgerOpen && <div className={`${hamburgerOpen?"dark-overlay" : ""}`}></div>}
    </>
  );
}

export default StaticHamburger;
