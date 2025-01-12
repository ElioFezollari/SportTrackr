import React from 'react'
import '../../styles/login.css'
import soccerPlayer from "../../assets/images/login/login-player.svg"
import shoes from "../../assets/images/login/shoes.svg"
import trophy from "../../assets/images/login/trophy.svg"
import whistle from "../../assets/images/login/whistle.svg"
import ball from "../../assets/images/login/soccer-ball.svg"
import field from "../../assets/images/login/field.svg"
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
            <p>Don' t have an account? <Link to="../register">Sign Up</Link></p>
              </div>
            <div className='login-image'>
              <img src={soccerPlayer} alt="player kicking ball" />
              <img className='absolute' src={shoes} alt="image of a pair of shoes" />
              <img className='absolute' src={trophy} alt="image of a trophy" />
              <img className='absolute' src={whistle} alt="image of a whistle" />
              <img className='absolute' src={ball} alt="image of a soccer ball" />
              <img className='absolute' src={field} alt="image of a field" />
              </div>
        </div>
    </div>
  )
}

export default Login