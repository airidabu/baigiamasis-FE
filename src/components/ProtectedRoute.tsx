import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

interface ProtectedRouteProps {
    allowedRoles: "admin" | "user" | "author" | ("admin" | "user" | "author")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, hasRole, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !hasRole(allowedRoles)) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;