import React from "react";
import { Navigate } from "react-router-dom";
function SuperAdminProtectedRoute({ children }) {
  let role = sessionStorage.getItem("role");

  return role === "superadmin" ? children : <Navigate to="/login" />;
}

export default SuperAdminProtectedRoute;
