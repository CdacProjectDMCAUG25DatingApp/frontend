import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.user.token);
  const onboarding = useSelector((state) => state.user.onboarding);
  const location = useLocation();

  if (!token) return <Navigate to="/" />;

  // Allow onboarding pages freely
  const allowedOnboardingRoutes = ["/createprofile", "/addphotos", "/preferences"];

  if (onboarding) {
    if (onboarding.needs_profile && location.pathname !== "/createprofile") {
      return <Navigate to="/createprofile" replace />;
    }
    if (onboarding.needs_photos && location.pathname !== "/addphotos") {
      return <Navigate to="/addphotos" replace />;
    }
    if (onboarding.needs_preferences && location.pathname !== "/preferences") {
      return <Navigate to="/preferences" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
