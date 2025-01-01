import React from 'react'
import homePhone from "../../assets/images/home/phone-main.png";
import signupPhone from "../../assets/images/home/phone-signup.png";
import leaguePhone from "../../assets/images/home/phone-league.png";
import teamPhone from "../../assets/images/home/phone-team.png";

function Work() {
  return (
    <div className="static-home-work">
        <h2>How SportTrackr works</h2>
        <p>
          Join an organized soccer league and track everything as if youre a
          pro!
        </p>
        <div className="home-phones">
          <div>
            <h5>1. Create an account with us</h5>
            <img src={signupPhone} alt="" />
          </div>
          <div>
            <h5>2. Pick a league of your choosing</h5>
            <img src={leaguePhone} alt="" />
          </div>
          <div>
            <h5>3. Join your team</h5>
            <img src={teamPhone} alt="" />
          </div>
          <div>
            <h5>4. Enjoy our features</h5>
            <img src={homePhone} alt="" />
          </div>
        </div>
      </div>
  )
}

export default Work