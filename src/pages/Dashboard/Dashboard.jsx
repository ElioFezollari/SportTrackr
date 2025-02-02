import { useContext } from "react";
import AthleteDashboard from "./AthleteDashboard";
import AuthContext from "../../context/AuthProvider";

function Dashboard() {
  const {auth} = useContext(AuthContext)
  const isAdmin = auth.roles && auth.roles.includes("owner");
  return isAdmin ? <>Have to add admin dashboard here</> : <AthleteDashboard />;
}

export default Dashboard;
