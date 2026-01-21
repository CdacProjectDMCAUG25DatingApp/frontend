import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = sessionStorage.getItem("token");

  if (token) return <Navigate to="/home/people" replace />;

  return children;
}
