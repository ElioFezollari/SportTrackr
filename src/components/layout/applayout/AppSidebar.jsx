import React, { useEffect, useState } from "react";
import "../../../styles/components/layouts/appSideBar.css";
import dashboardimg from "../../../assets/images/appSidebar/dashboard.svg";
import soccerBall from "../../../assets/images/appSidebar/soccerBall.svg";
import users from "../../../assets/images/appSidebar/users.svg";
import employee from "../../../assets/images/appSidebar/employee.svg";
import wallet from "../../../assets/images/appSidebar/wallet.svg";
import jersey from "../../../assets/images/appSidebar/jersey.svg";
import questionMark from "../../../assets/images/appSidebar/question-mark.svg";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { decodeJWT } from "../../../utils/decode";

function AppSidebar({ isActive, setIsActive }) {
  const { auth } = useAuth();

  const [dashboard, setDashboard] = useState(true);
  const [leagues, setLeagues] = useState(true);
  const [transactions, setTransactions] = useState(true);
  const isAdmin = auth.roles && auth.roles.includes("owner");
  const [ifPartOfTeam, setIfPartOfTeam] = useState(false);
  const isStatistician = auth.roles && auth.roles.includes("statistician"); 

  useEffect(() => {
    const decodeToken = decodeJWT(auth.accessToken);
    setIfPartOfTeam(decodeToken?.teamId ? true : false);
  }, [auth.roles]);
  return (
    <div
      className={`${isActive ? "app-sidebar-wrapper" : "sidebar-closed"}   `}
    >
      <div className="app-sidebar">
        <button onClick={() => setIsActive(false)}>X</button>
        <div className="dashboard-div">
          <div className={`${!dashboard ? "closed" : ""} `}>
            <h2 onClick={() => setDashboard(!dashboard)}>
              <span>&gt;</span> General
            </h2>
            <div>
              <Link to={"./dashboard"}>
                {" "}
                <img
                  className="sidebar-icon"
                  src={dashboardimg}
                  alt="icon of a few panels"
                />{" "}
                Dashboard
              </Link>
            </div>
            <div>
              <Link>
                {" "}
                <img
                  className="sidebar-icon"
                  src={questionMark}
                  alt="icon of a question mark"
                />{" "}
                Help
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className={`${!leagues ? "closed" : ""} `}>
            <h2 onClick={() => setLeagues(!leagues)}>
              <span>&gt;</span> Leagues
            </h2>
            <div>
              <Link to="./leagues">
                {" "}
                <img
                  className="sidebar-icon"
                  src={soccerBall}
                  alt="icon of a soccer ball"
                />{" "}
                Leagues
              </Link>
            </div>
            {isStatistician && (
              <div>
                <Link to={"./league-schedule"}>
                  {" "}
                  <img
                    className="sidebar-icon"
                    src={soccerBall}
                    alt="icon of soccer ball"
                  />{" "}
                  Matches
                </Link>
              </div>
            )}
            {isAdmin && (
              <div>
                <Link to={"./users"}>
                  {" "}
                  <img
                    className="sidebar-icon"
                    src={users}
                    alt="icon of two people"
                  />{" "}
                  Users
                </Link>
              </div>
            )}
            {isAdmin && (
              <div>
                <Link to={"./employees"}>
                  {" "}
                  <img
                    className="sidebar-icon"
                    src={employee}
                    alt="icon of an employee"
                  />{" "}
                  Employees
                </Link>
              </div>
            )}
            {ifPartOfTeam &&
              <div>
              <Link to="./myteam">
                {" "}
                <img
                  className="sidebar-icon"
                  src={jersey}
                  alt="icon of an employee"
                />{" "}
                My Team
              </Link>
            </div>
            }
          </div>
        </div>
        {isAdmin && (
          <div>
            <div className={`${!transactions ? "closed" : ""} `}>
              <h2 onClick={() => setTransactions(!transactions)}>
                <span>&gt;</span> Transactions
              </h2>
              <div>
                <Link to="./transactions">
                  {" "}
                  <img
                    className="sidebar-icon"
                    src={wallet}
                    alt="icon of a wallet"
                  />{" "}
                  Transactions
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppSidebar;
