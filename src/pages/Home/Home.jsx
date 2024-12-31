import React from "react";
import home from "../../assets/images/home/home-bg.webp";
import homePhone from "../../assets/images/home/phone-main.png";
import signupPhone from "../../assets/images/home/phone-signup.png";
import leaguePhone from "../../assets/images/home/phone-league.png";
import teamPhone from "../../assets/images/home/phone-team.png";
import shooting from "../../assets/images/home/shooting.webp";
import "../../styles/home.css";

function Home() {
  return (
    <div className="static-home-div">
      <div className="static-home-hero">
        <img
          src={home}
          className="static-home-hero-image"
          alt="Soccer ball in a field"
        />
        <div className="static-slogan">
          <h2>Play Hard. Stay Involved. Track It All.</h2>
          <p>
            SportTrackr is the go-to app for anyone involved in organized
            amateur sports. Whether you're a player, coach, or organizer, it
            provides the tools you need to stay connected, track progress and
            more, and enhance your experience on and off the field.
          </p>
          <a className="btn b-white ">Try the app out!</a>
        </div>
      </div>
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
      <div>
        <div className="what-we-offer">
          <div className="what-we-offer-text">
            <h2>What do we bring to the field that others do not?</h2>
            <div>
              <h4>1. Easy and Convenient</h4>
              <p>Games every day that you can join in just a few taps.</p>
            </div>
            <div>
              <h4> 2. Zero Commitment</h4>
              <p>
                Play your favorite sport without the pressure of long-term
                commitments.
              </p>
            </div>
            <div>
              <h4>3. No uncertainty</h4>
              <p>
                We handle all of the logistics so you can relax and just play.
              </p>
            </div>
          </div>
          <img src={shooting} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
