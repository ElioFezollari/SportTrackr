import React from 'react'
import '../../styles/components/layouts/staticFooter.css'
import logo from '../../assets/images/Logo3.png'
import { Link, NavLink } from 'react-router'
const currentYear = new Date().getFullYear();
function StaticFooter() {
  
  return (
    <div className='static-footer'>
    <footer>
      <div className='footer-install-banner'><h2>Try SportTrackr for free</h2><div><a className='btn b-gray'>Install Our App</a> <Link href="" className='btn b-gray'>Create an account</Link></div></div>
      <div className='static-footer-wrapper'>
      <div className='static-footer-image'><img src={logo} alt="SportTrackr Logo" /> <h2>SportTrackr</h2></div>
      <div className='static-footer-link'>            
        <NavLink activeclassname='is-active' to={'/'}>Home</NavLink>
            <NavLink activeclassname='is-active' to={'/about-us'}>About Us</NavLink>
            <NavLink activeclassname='is-active' to={'/login'}>Login</NavLink>
            <NavLink activeclassname='is-active' to={'/register'}>Register</NavLink>
            <NavLink activeclassname='is-active' to={'/privacy-policy'}>Privacy Policy</NavLink>
            <NavLink activeclassname='is-active' to={'/terms-and-conditions'}>Terms & Conditions</NavLink>
            </div>
      </div>
    </footer>
    <div className='copyright-footer'><h3>© SportTrackr {currentYear}</h3></div>
    </div>
  )
}

export default StaticFooter