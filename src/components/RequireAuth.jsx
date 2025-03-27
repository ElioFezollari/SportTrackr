import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    const hasAccess = storedRoles.some(role => allowedRoles?.includes(role));
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return hasAccess ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />;
    }

    return hasAccess ? <Outlet /> : <Navigate to='/app' state={{ from: location }} replace />;
};

export default RequireAuth;