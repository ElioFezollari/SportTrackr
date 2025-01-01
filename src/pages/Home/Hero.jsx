import React from "react";
import home from "../../assets/images/home/home-bg.webp";
function Hero() {
  return (
    <div className="static-home-hero">
      <img
        src={home}
        className="static-home-hero-image"
        alt="Soccer ball in a field"
      />
      <div className="static-slogan">
        <h2>Play Hard. Stay Involved. Track It All.</h2>
        <p>
          SportTrackr is the go-to app for anyone involved in organized amateur
          sports. Whether you're a player, coach, or organizer, it provides the
          tools you need to stay connected, track progress and more, and enhance
          your experience on and off the field.
        </p>
        <a className="btn b-white ">Try the app out!</a>
      </div>
    </div>
  );
}

export default Hero;
