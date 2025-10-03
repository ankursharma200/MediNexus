import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { authContext } from "../context/AuthContext"; // adjust path

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  let isExpired = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds
      isExpired = decoded.exp < currentTime;
    } catch (err) {
      isExpired = true; // invalid token
    }
  }

  const isAllowed = allowedRoles.includes(role);

  // Redirect if token missing, expired, or role not allowed
  if (!token || isExpired || !isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
