import React from 'react'
import { Link } from 'react-router'
import logo from "../../assets/images/Logo3.png"
import womanKickingBall from "../../assets/images/register/woman-kicking.svg"
import soccerFlag from "../../assets/images/register/soccer-flag.svg"
import soccerAnalytics from "../../assets/images/register/soccer-analytics.svg"
import tactics from "../../assets/images/register/tactics.svg"
import timer from "../../assets/images/register/timer.svg"
import "../../styles/register.css"
function Register() {
  return (
    <div className='register-wrapper'>
        <div className='register'>
        <div className='register-image'>
            <img src={womanKickingBall} alt="" />
            <img className='absolute' src={soccerFlag} alt="image of a soccer corner flag " />
            <img className='absolute' src={soccerAnalytics} alt="image of a computer with a soccer ball on it and some text on its right " />
            <img className='absolute' src={tactics} alt="image of a formation in sports " />
            <img className='absolute' src={timer} alt="image of a formati0on in sports " />
        </div>
            <div className='register-form'><img src={logo} alt="logo of SportTrackr" />
            <h1>Sign Up </h1>
            <form className='register-form-content'>
            <label htmlFor="" className='email-register' ><input placeholder='Enter your email' type="text" name="email" id="email" /></label>
              <div className='register-name'>
              <label htmlFor=""><input placeholder='Enter your first name' type="text" name="email" id="email" /></label>
              <label htmlFor=""><input placeholder='Enter your last name' type="text" name="email" id="email" /></label>
              </div>
              <label htmlFor=""><input placeholder='Enter your password' type="password" name="password" id="password" /></label>
              <label htmlFor=""><input placeholder='Confirm your password' type="password" name="password" id="password" /></label>
              <input type="submit" value="Sign Up" />
            </form>
            <p>Already have an account? <Link to="../login">Login</Link></p>
              </div>
        </div>
    </div>
  )
}

export default Register