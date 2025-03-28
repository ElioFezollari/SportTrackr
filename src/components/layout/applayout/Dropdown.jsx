import React, { useState } from "react";
import "../../../styles/components/layouts/dropdown.css";

const Dropdown = ({ options, onSelect, label, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); 
  };

  return (
    <div className="createteam-dropdown">
      <div onClick={handleToggle} className="createteam-dropdown-toggle">
        {selectedOption ? selectedOption.label : label}
      </div>
      {isOpen && (
        <ul className="createteam-dropdown-menu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
