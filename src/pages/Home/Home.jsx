import React from "react";

import "../../styles/home.css";
import Reviews from "./Reviews";
import Offer from "./Offer";
import Work from "./Work";
import Hero from "./Hero";
import FAQ from "./FAQ";

function Home() {
  return (
    <div className="static-home-div">
      <Hero />
      <Work />
      <Offer />
      <Reviews />
      <FAQ />
    </div>
  );
}

export default Home;
