// PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { token, onboarding } = useSelector((state) => state.user);

  // If there's a token but the user still needs onboarding, 
  // do NOT redirect to /home. Let the Login component finish its work.
  if (token && !onboarding?.needs_profile && !onboarding?.needs_photos) {
    return <Navigate to="/home/people" replace />;
  }

  return children;
}

export default PublicRoute;
