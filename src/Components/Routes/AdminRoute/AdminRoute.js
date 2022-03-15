import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isLoading } = useAuth();
    let location = useLocation();
    if (isLoading) return <span className="visually-hidden">Loading...</span>;
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminRoute;
