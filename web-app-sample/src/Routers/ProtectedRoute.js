import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const storedUserData = localStorage.getItem("userData");
  const isLogout = JSON.parse(localStorage.getItem("logout"));
  if (!storedUserData && isLogout) {
    return <Navigate to="/" />;
  }
  if (storedUserData && isLogout) {
    return <Navigate to="/login" />;
  }
  return children;
};
