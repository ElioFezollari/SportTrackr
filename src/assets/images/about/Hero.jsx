import React from "react";
import hero from "../../assets/images/about/hero.jpg";
function Hero() {
  return (
    <div className="static-home-hero static-about">
      <img
        className="static-home-hero-image about-hero"
        src={hero}
        alt="picture of child playing soccer in the beach"
      />
      <div className="about-text">
        <h2>We love to compete... but we thrive on innovation</h2>
        
        <p>
          Our small team is driven by a shared passion for solving problems and
          creating innovative solutions. We thrive on tackling challenges
          head-on, using our diverse skills and perspectives to find simple,
          effective answers. Each project is an opportunity to collaborate,
          pushing the boundaries of what's possible while adding real value.
          With a deep commitment to excellence, we don't just solve problems—we
          aim to make a lasting impact with every solution we build.
        </p>
      </div>
    </div>
  );
}

export default Hero;
