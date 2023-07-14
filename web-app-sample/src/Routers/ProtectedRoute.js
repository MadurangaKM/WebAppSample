import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const storedUserData = localStorage.getItem("userData");
  if (!storedUserData) {
    return <Navigate to="/" />;
  }
  return children;
};
