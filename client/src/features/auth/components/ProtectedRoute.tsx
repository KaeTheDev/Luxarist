import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * @name ProtectedRoute
 * @description A high-order component that gates access based on authentication status and user roles.
 * * @logic
 * 1. Checks if the app is still determining auth status (isLoading).
 * 2. If unauthenticated, redirects to Home and saves the attempted URL in location state.
 * 3. If requireAdmin is true, verifies the user has the 'admin' role.
 * 4. If a non-admin attempts an admin route, redirects them to their member dashboard.
 */

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Handle the "Flash": Don't redirect while the app is still checking localStorage
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-[10px] uppercase tracking-[0.4em] animate-pulse">
          Verifying Credentials...
        </div>
      </div>
    );
  }

  // Unauthenticated: Redirect to home
  // location.state allows the Homepage to trigger the login modal automatically
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Unauthorized: Redirect Customer away from Admin pages
  // We pass 'denied: true' so the Dashboard can show an optional "Access Denied" message
  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/dashboard" state={{ denied: true }} replace />;
  }

  // Authorized: Render the requested page
  return <>{children}</>;
}