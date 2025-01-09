// src/routes/PublicRoute.js
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");  // Check token directly
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
