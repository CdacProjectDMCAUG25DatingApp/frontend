import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = useSelector((state) => state.user.token);

  if (token) return <Navigate to="/home/people" />;

  return children;
}

export default PublicRoute;
