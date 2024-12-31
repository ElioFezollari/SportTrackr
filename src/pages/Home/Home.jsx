import React from 'react'
import home from '../../assets/images/home/home-bg.webp'
import homePhone from '../../assets/images/home/phone-main.png'
import signupPhone from '../../assets/images/home/phone-signup.png'
import leaguePhone from '../../assets/images/home/phone-league.png'
import teamPhone from '../../assets/images/home/phone-team.png'
import '../../styles/home.css'

function Home() {
  return (
    <div className='static-home-div'>
        <div className='static-home-hero'>
        <img src={home} className='static-home-hero-image' alt="Soccer ball in a field" />
        <div className='static-slogan'>
          <h2>Play Hard. Stay Involved. Track It All.</h2>
          <p>SportTrackr is the go-to app for anyone involved in organized amateur sports. Whether you're a player, coach, or organizer, it provides the tools you need to stay connected, track progress and more, and enhance your experience on and off the field.</p>
          <a className='btn b-white '>Try the app out!</a>
        </div>
        </div>
        <div className='static-home-work'>
          <h2>How SportTrackr works</h2>
          <p>Join an organized soccer league and track everything as if youre a pro!</p>
          <div className='home-phones'>
            <div>
              <h5>1. Create an account with us</h5>
          <img src={signupPhone}  alt="" />
          </div>
          <div>
          <h5>2. Pick a league of your choosing</h5>
          <img src={leaguePhone} alt="" />
          </div>
          <div>
            <h5>3. Join your team</h5>
          <img src={teamPhone}  alt="" />
          </div>
          <div>
            <h5>4. Enjoy our features</h5>
          <img src={homePhone}  alt="" />
          </div>
          </div>
        </div>
    </div>
  )
}

export default Home  