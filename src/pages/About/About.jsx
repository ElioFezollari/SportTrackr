import React from "react";
import "../../styles/about.css";
import hero from "../../assets/images/about/herobackground.webp";
import about from "../../assets/images/about/soccerfoot.jpg";
import mission from "../../assets/images/about/football_app.avif";
import story from "../../assets/images/about/image.png";
import canada from "../../assets/images/about/canada.png";

function About() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img
          src={hero}
          className="static-about-hero-image"
          alt="Soccer ball in the middle"
        />
        <div className="hero-content">
          <h1>Welcome to SportTrackr</h1>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection("about-us")}>
              <span>About Us</span>
            </button>
            <button onClick={() => scrollToSection("mission")}>
              <span>Our Mission</span>
            </button>
            <button onClick={() => scrollToSection("story")}>
              <span>Our Story</span>
            </button>
            <button onClick={() => scrollToSection("contact")}>
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <section id="about-us" className="section about-us-div">
        <div className='about-us-info'>
          <h1>About Us</h1>
          <p>
            SportTrackr is a platform for football enthusiasts to easily find competitive leagues, track personal performance, and stay connected with their team members.
          </p>
        </div>
        <img 
          className='about-us-img'
          src={about}
          alt="Foot on ball"
        />
      </section>

      <section id="mission" className="section our-mission-div">
        <div className='our-mission-info'>
          <h1>Our Mission</h1>
          <p>
            Creating both enjoyable and competitive football groups with the help of SportTrackr, football players in all levels enjoy a better football experience by keeping track of their own accomplishments, interacting with teammates.          
          </p>
        </div>
        <img 
          className='our-mission-img'
          src={mission}
          alt="football app"
        />
      </section>

      <section id="story" className="section our-story-div">
        <div className='our-story-info'>
          <h1>Our Story</h1>
          <p>
            In 2024, fellow GBC undergraduate students Aum Zaveri, Mia Truong, Elio Fezoralli, Kate Labis noticed that sports enthusiasts struggle to find organized and user-friendly platforms that allow them to participate in competitive leagues, track their performance, and communicate effectively with teammates. 
          </p>
          <br />
          <p>
            Besides that, existing platforms often lack seamless integration of these features, most lacking all of them, leading to poor partial user experiences. As a result, SportTrackr was born to solve these problems.
          </p>
        </div>
        <img 
          className='our-story-img'
          src={story}
          alt="four founders"
        />
      </section>

      <section id="contact" className="section contact-us">
        <div className='contact-info-div'>
          <h1>Connect us at One of Our Locations</h1>
          <p>Global Headquarters</p>
          <p>Toronto, Canada</p>
          <p>+1 432-232-232</p>
        </div>

        <img 
          className='contact-us-img'
          src={canada}
          alt="Canada flag"
        />
      </section>

      {/* Card Container Section (Moved outside of contact section) */}
      <div className="card-container"> 
        <div className="flipping-card">
          <div className="card-front">
            <h2>Vietnam</h2>
          </div>
          <div className="card-back">
            <h3>Get in Touch</h3>
            <p>Email: Mia.Truong@georgebrown.ca</p>
            <p>Phone: +84 123-456-7890</p>
            <p>Address: Hanoi, Vietnam</p>
          </div>
        </div>

        <div className="flipping-card">
          <div className="card-front">
            <h2>Albania</h2>
          </div>
          <div className="card-back">
            <h3>Get in Touch</h3>
            <p>Email: Elio.Fezoralli@georgebrown.ca</p>
            <p>Phone: +355 123-456-7890</p>
            <p>Address: Tirana, Albania</p>
          </div>
        </div>

        <div className="flipping-card">
          <div className="card-front">
            <h2>India</h2>
          </div>
          <div className="card-back">
            <h3>Get in Touch</h3>
            <p>Email: Aum.Zaveri@georgebrown.ca</p>
            <p>Phone: +91 123-456-7890</p>
            <p>Address: New Delhi, India</p>
          </div>
        </div>

        <div className="flipping-card">
          <div className="card-front">
            <h2>Philippines</h2>
          </div>
          <div className="card-back">
            <h3>Get in Touch</h3>
            <p>Email: Kate.Labis@georgebrown.ca</p>
            <p>Phone: +63 123-456-7890</p>
            <p>Address: Manila, Philippines</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
