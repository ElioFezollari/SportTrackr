import React from 'react'
import '../../styles/login.css'
import soccerPlayer from "../../assets/images/login/login-player.svg"
import logo from "../../assets/images/Logo3.png"
import { Link } from 'react-router'
function Login() {
  return (
    <div className='login-wrapper'>
        <div className='login'>
            <div className='login-form'><img src={logo} alt="logo of SportTrackr" />
            <h1>Log In</h1>
            <form className='login-form-content'>
              <label htmlFor=""><input placeholder='Enter your email' type="text" name="email" id="email" /></label>
              <label htmlFor=""><input placeholder='Enter your password' type="password" name="password" id="password" /></label>
              <input type="submit" value="Log In" />
            </form>
            <a href="">Forgot Password?</a>
            <p>Don' t have an account? <Link href="">Sign Up</Link></p>
              </div>
            <div className='login-image'><img src={soccerPlayer} alt="player kicking ball" /></div>
        </div>
    </div>
  )
}

export default Login