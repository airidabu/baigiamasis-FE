import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: "admin" | "user" | "author" | ("admin" | "user" | "author")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
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

    return <>{children}</>;
}

export default ProtectedRoute;