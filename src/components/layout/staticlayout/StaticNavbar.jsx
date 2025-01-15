import '../../../styles/components/layouts/staticNavbar.css'
import logo from '../../../assets/images/Logo3.png' 
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import StaticHamburger from './StaticHamburger'

function StaticNavbar() {
  const [hamburgerOpen,setHamburgerOpen] = useState(false)
  return (
    <header className='static-header'>
        <div className='static-header-logo'>
        <img src={logo} alt="Sport Trackr Logo" />
        <h1>Sport Trackr</h1>
        </div>
        <nav className='static-nav'>
            <NavLink activeclassname='is-active' to={'/'}>Home</NavLink>
            <NavLink activeclassname='is-active' to={'/about-us'}>About Us</NavLink>
            <NavLink activeclassname='is-active' to={'/login'}>Login</NavLink>
            <NavLink activeclassname='is-active' to={'/register'}>Register</NavLink>
        </nav>
        <Link className='btn b-gray download-app '>Download The App</Link>
        <button onClick={()=>setHamburgerOpen(true)} id="menu-toggle" className="menu-toggle">
          <span className="menu-toggle-bar menu-toggle-bar--top"></span>
          <span className="menu-toggle-bar menu-toggle-bar--middle"></span>
          <span className="menu-toggle-bar menu-toggle-bar--bottom"></span>
        </button>
        {<StaticHamburger hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen}/>}
    </header>
  )
}

export default StaticNavbar