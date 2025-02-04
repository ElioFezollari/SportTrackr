import { useContext } from "react";
import AthleteDashboard from "./AthleteDashboard";
import AuthContext from "../../context/AuthProvider";
import OwnerDashboard from "./OwnerDashboard";

function Dashboard() {
  const {auth} = useContext(AuthContext)
  const isAdmin = auth.roles && auth.roles.includes("owner");
  return isAdmin ? <OwnerDashboard/> : <AthleteDashboard />;
}

export default Dashboard;
