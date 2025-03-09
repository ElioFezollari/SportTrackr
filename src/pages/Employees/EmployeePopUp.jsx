import React, { useState } from "react";
import RoleFilter from "./RoleFilter";
import Search from "../../components/Search";
import LeaguesFilter from "../../components/LeaguesFIlter";
import axios from "axios";
import { addEmployee } from "../../services/employees";
import useAuth from "../../hooks/useAuth";

function EmployeePopUp({
  setAddEmployeePopUp,
  setAddedEmployee,
  addedEmployee,
}) {
  const { auth } = useAuth();
  const [email, setEmail] = useState("");
  const [employeeLeagues, setEmployeeLeagues] = useState("");
  const [optionPicked, setOptionPicked] = useState("Pick a league");
  const [selectedRole, setSelectedRole] = useState("Role *");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEmployee = async () => {
    if (
      !email ||
      selectedRole === "Role *" ||
      optionPicked === "Pick a league"
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await addEmployee(
        auth.accessToken,
        email,
        selectedRole,
        optionPicked
      );
      if ((response.status = 200)) {
        setAddedEmployee(!addedEmployee);
        setAddEmployeePopUp(false);
      }
    } catch (err) {
      console.error("Error creating employee:", err);
      setError("Failed to add employee. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="employee-popup">
        <button
          className="close-popup"
          onClick={() => setAddEmployeePopUp(false)}
        >
          X
        </button>
        <div className="employee-popup-content">
          <h1>Add Staff Member</h1>
        </div>
        <div className="pop-up-input">
          <Search placeholder="Email *" setText={setEmail} text={email} />
          <RoleFilter
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
          <LeaguesFilter
            optionPicked={optionPicked}
            setOptionPicked={setOptionPicked}
            selectedLeague={employeeLeagues}
            setSelectedLeague={setEmployeeLeagues}
          />
          {error && <p>{error}</p>}
          <button className="add-employee-button" onClick={handleAddEmployee} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeePopUp;
