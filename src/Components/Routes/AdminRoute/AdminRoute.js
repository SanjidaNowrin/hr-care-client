import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loaders from "../../Share/Loader";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isAdmin, isLoading } = useAuth();
  let location = useLocation();
  if (isLoading) {
    return <span className="visually-hidden"><Loaders /></span>;
  }
  if (user.email && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminRoute;
