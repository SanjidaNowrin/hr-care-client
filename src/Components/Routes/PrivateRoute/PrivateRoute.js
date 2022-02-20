import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ScaleLoader
 from "react-spinners/ScaleLoader";

//spinner css
const PrivateRoute = ({ children, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#01578A");
  const { user, isLoading } = useAuth();
  let location = useLocation();
  const spinnerStyle = {
    margin: "0 auto",
    display:'flex',
    alignItem:'center',
    justifyContent:'center'
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 9000);
  }, []);
  if (isLoading)
    return (
      <span className="visually-hidden">
        <ScaleLoader
          loading={loading}
          color={color}
          css={spinnerStyle}
          size={70}
        />
      </span>
    );
  if (user.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
