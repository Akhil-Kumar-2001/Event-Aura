import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore"; // adjust if your store file is named differently
import type { JSX } from "react/jsx-runtime";

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: "attendee" | "organizer";
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
