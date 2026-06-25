import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";

const ProtectedRoute = ({ children }) => {
  const { token, isLoggingOut } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only show modal if no token and NOT logging out intentionally
    if (!token && !hasChecked && !isLoggingOut) {
      setShowModal(true);
      setHasChecked(true);
    }
  }, [token, hasChecked, isLoggingOut]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (!token) {
    return (
      <>
        <Modal
          isOpen={showModal}
          title="Authentication Required"
          message="Please login first to access the tools"
          onClose={handleModalClose}
        />
        <Navigate to="/login" replace />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
