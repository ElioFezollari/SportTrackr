import React, { useState } from 'react';
import "../styles/components/hamburger-icon.css";

function Hamburger() {
  const [isActive, setIsActive] = useState(false);

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
