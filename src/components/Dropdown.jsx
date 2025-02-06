import React, { useState } from "react";
import "../styles/components/dropdown.css";

function Dropdown({ name, options, onChange, width }) {
  const [selectedValue, setSelectedValue] = useState("");


  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    const selectedOption = options.find(option => option.id == e.target.value);

    onChange(selectedOption ? selectedOption.id : ""); 
  };

  return (
    <select
      style={{ width: width }}
      className="dropdown"
      value={selectedValue}
      onChange={handleChange}
    >
      <option value="" disabled>{name }</option>
      {options
        .filter((option) => option.name !== name) 
        .map((option, index) => (
          <option key={index} value={option.id || option.name}>
            {option.name}
          </option>
        ))}
    </select>
  );
}

export default Dropdown;
