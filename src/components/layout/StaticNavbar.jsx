import '../../styles/staticNavbar.css'
import logo from '../../assets/images/Logo3.png' 
import React from 'react'
import { Link, NavLink } from 'react-router'

function StaticNavbar() {
  return (
    <header className='static-header'>
        <div className='static-header-logo'>
        <img src={logo} alt="Sport Trackr Logo" />
        <h1>Sport Trackr</h1>
        </div>
        <nav className='static-nav'>
            <NavLink activeClassName='is-active' to={'/'}>Home</NavLink>
            <NavLink activeClassName='is-active' to={'/about-us'}>About Us</NavLink>
            <NavLink activeClassName='is-active' to={'/login'}>Login</NavLink>
            <NavLink activeClassName='is-active' to={'/register'}>Register</NavLink>
        </nav>
        <Link className='btn b-gray download-app '>Download The App</Link>
    </header>
  )
}

export default StaticNavbar