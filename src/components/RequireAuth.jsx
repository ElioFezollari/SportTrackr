import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const hasAccess = auth?.roles?.some(role => allowedRoles?.includes(role));
    console.log(auth)
    if (!auth?.accessToken) {
        return hasAccess ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />;
    }

    return hasAccess ? <Outlet /> : <Navigate to='/app' state={{ from: location }} replace />;
};

export default RequireAuth;
