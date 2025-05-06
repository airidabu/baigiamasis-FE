import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserRole = "admin" | "user" | "author" | null;

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: UserRole;
}

interface TokenPayload {
    id: string;
    name: string;
    surname: string;
    email: string;
    roles: UserRole;
    exp: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    userRole: UserRole;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
    hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const hasRole = (roles: UserRole | UserRole[]): boolean => {
        if (!userRole) return false;
        if (Array.isArray(roles)) {
            return roles.includes(userRole);
        }
        return roles === userRole;
    };

    const parseUserFromToken = (token: string): User | null => {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                return null;
            }
            return {
                id: decoded.id,
                name: decoded.name,
                surname: decoded.surname,
                email: decoded.email,
                role: decoded.roles,
            };
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = parseUserFromToken(token);

            if (userData) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setUser(userData);
                setUserRole(userData.role);
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
            }
        }
        setLoading(false);
    }, []);

    const login = (token: string) => {
        const userData = parseUserFromToken(token);
        if (userData) {
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(userData);
            setUserRole(userData.role);
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
        setLoading(false);
    };

    return (
        <AuthContext.Provider
            value={
                {
                    isAuthenticated,
                    user,
                    userRole,
                    login,
                    logout,
                    loading,
                    hasRole,
                }
            }
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;