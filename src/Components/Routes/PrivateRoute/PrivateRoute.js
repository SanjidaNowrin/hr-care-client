import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    console.log(isLoading)
    let location = useLocation();
    if (isLoading) return <span className="visually-hidden">Loading...</span>;
    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;