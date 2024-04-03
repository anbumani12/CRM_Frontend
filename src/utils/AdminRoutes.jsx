import React from "react";
import { Navigate } from "react-router-dom";
function AdminRoutes({ children }) {
  let role = sessionStorage.getItem("role");
  let token = sessionStorage.getItem("token");
  return token && (role === "superadmin" || role === "admin") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default AdminRoutes;
