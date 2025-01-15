import React, { useState } from 'react';
import "../../../styles/components/hamburgerIcon.css";

function Hamburger({isActive,setIsActive}) {


  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <button className={`hamburger-toggle ${isActive ? 'is-active' : ''}`} onClick={handleToggle}>
      Menu
    </button>
  );
}

export default Hamburger;
