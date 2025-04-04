import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import logo from "../../assets/images/Logo3.png"
import womanKickingBall from "../../assets/images/register/woman-kicking.svg"
import soccerFlag from "../../assets/images/register/soccer-flag.svg"
import soccerAnalytics from "../../assets/images/register/soccer-analytics.svg"
import tactics from "../../assets/images/register/tactics.svg"
import timer from "../../assets/images/register/timer.svg"
import "../../styles/register.css"
import { register } from '../../services/auth'
import useAuth from '../../hooks/useAuth'
import { terms } from '../../utils/terms'

function Register() {
  const {token} = useParams("token")
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [termsModal, setTermsModal] = useState(false)
  const {auth,setAuth} = useAuth()
  const [error,setError] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
  }, [termsModal])

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(agreed)
    setError("");
    try {
      const response = await register({ firstName,lastName,password,confirmPassword, agreed },token);
      setAuth({accessToken:response.data.token,roles:response.data.roles})
      if (response.status >= 400 && response.status < 500) {
        setError(err.response.data.message);
      }
      setAuth(response.data)

      navigate("../app")
 
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        setError(err.response.data.message);
      } else {    
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

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
            <form className='register-form-content' onSubmit={(e)=>handleRegister(e)}>
            
              <div className='register-name'>
              <label htmlFor="firstName"><input placeholder='Enter your first name' type="text" name="firstName" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)} /></label>
              <label htmlFor="lastName"><input placeholder='Enter your last name' type="text" name="lastName" id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)} /></label>
              </div>
              <label htmlFor="password"><input placeholder='Enter your password' type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} /></label>
              <label htmlFor="confirmPassword"><input placeholder='Confirm your password' type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} /></label>
              <label className="terms-label">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="terms-checkbox"
                />
                <span className="custom-checkbox"></span>
                <div>I accept the</div>
                <button type="button" onClick={() => setTermsModal(!termsModal)} className="terms-con">
                  Terms & Conditions
                </button>
              </label>
              <input type="submit" value="Sign Up"/>
            </form>
            {error && <p className='error'>{error}</p>}
            <p>Already have an account? <Link to="../login">Login</Link></p>
            </div>
        </div>
        {termsModal && (
          <div className="terms-con-modal">
            <div className="terms-modal-content">
              <h2>Terms & Conditions</h2>
              <div className="terms-text">
                {terms}
              </div>
              <button onClick={() => setTermsModal(false)} className="close-terms">Close</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Register