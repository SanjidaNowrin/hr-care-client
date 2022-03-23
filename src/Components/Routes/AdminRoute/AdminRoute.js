import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
    const { user, isAdmin, isLoading } = useAuth();
    console.log(isAdmin, isLoading)
    let location = useLocation();
    if (isLoading) { return <h1 >Loading...</h1> };
    if (user?.email && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminRoute;
