import React from "react";
import "../styles/components/dropdown.css"
function Dropdown({ name, options, onChange,width }) {
  return (
      <select style={{width:width}} className="dropdown" value={name} onChange={(e) => onChange(e.target.value)}>
        <option value={name} disabled>{name}</option>
        {options
          .filter((option) => option !== name) 
          .map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
  );
}

export default Dropdown;
