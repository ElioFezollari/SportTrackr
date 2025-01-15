import React, { useState } from "react";
import "../../../styles/components/layouts/appSideBar.css";
import dashboardimg from "../../../assets/images/appSidebar/dashboard.svg";
import soccerBall from "../../../assets/images/appSidebar/soccerBall.svg";
import users from "../../../assets/images/appSidebar/users.svg";
import employee from "../../../assets/images/appSidebar/employee.svg";
import wallet from "../../../assets/images/appSidebar/wallet.svg";
import questionMark from "../../../assets/images/appSidebar/question-mark.svg";
import { Link } from "react-router";
function AppSidebar({isActive,setIsActive}) {
  const [dashboard,setDashboard] = useState(true)
  const [leagues,setLeagues] = useState(true)
  const [transactions,setTransactions] = useState(true)
  return (
    <div className={`${isActive ? "app-sidebar-wrapper" : "sidebar-closed"}   ` }>
      <div className="app-sidebar">
        <button onClick={()=>setIsActive(false)}>X</button>
        <div className="dashboard-div">
          <div className={`${!dashboard ? "closed" : ""} `}> 
            <h2 onClick={()=>setDashboard(!dashboard)}><span>&gt;</span> General</h2>
            <div>
              <img className="sidebar-icon" src={dashboardimg} alt="icon of a few panels" />
              <Link>Dashboard</Link>
            </div>
            <div>
            <img className="sidebar-icon" src={questionMark} alt="icon of a question mark" />
            <Link>Help</Link>
            </div>
          </div>
        </div>
        <div>
          <div className={`${!leagues ? "closed" : ""} `} >
            <h2 onClick={()=>setLeagues(!leagues)}><span >&gt;</span> Leagues</h2>
            <div>
            <img className="sidebar-icon" src={soccerBall} alt="icon of a soccer ball" />
              <Link>My Leagues</Link>
            </div>
            <div>
            <img className="sidebar-icon" src={users} alt="icon of two people" />
              <Link>Users</Link>
            </div>
            <div>
            <img className="sidebar-icon" src={employee} alt="icon of an employee" />
              <Link>Employees</Link>
            </div>
          </div>
        </div>
        <div>
          <div className={`${!transactions ? "closed" : ""} `} >
            <h2 onClick={()=>setTransactions(!transactions)}><span >&gt;</span> Transactions</h2>
            <div>
            <img className="sidebar-icon" src={wallet} alt="icon of a wallet" />
              <Link>Balance</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppSidebar;
