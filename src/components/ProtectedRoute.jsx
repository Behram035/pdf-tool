import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, isLoggingOut } = useContext(AuthContext);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only show alert if no token and NOT logging out intentionally
    if (!token && !hasChecked && !isLoggingOut) {
      alert("Please login first to access the tools");
      setHasChecked(true);
    }
  }, [token, hasChecked, isLoggingOut]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
