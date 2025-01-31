import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/users.css";

function CustomDropdown({ options = [], selectedValue, onChange, placeholder }) { // Default to empty array
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedValue || placeholder}
                <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

CustomDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    selectedValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default CustomDropdown;