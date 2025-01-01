import React from "react";
import shooting from "../../assets/images/home/shooting.webp";

function Offer() {
  return (
    <div>
      <div className="what-we-offer">
        <div className="what-we-offer-text">
          <h2>What do we bring to the field that others do not?</h2>
          <div>
          <h4>1. View Your Statistics</h4>
          <p>Check your individual performance, goals, assists, overall contributions and more!</p>
          </div>
          <div>
          <h4>2. In-app Messaging</h4>
          <p>Facilitate seamless communication between teams, players, and administrators.</p>
          </div>
          <div>
          <h4>3. Edit Your Profile</h4>
          <p>Customize personal information and set your player preferences.</p>
          </div>
        </div>
        <img src={shooting} alt="" />
      </div>
    </div>
  );
}

export default Offer;
