import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean; 
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    
    // Handle the "Flash": Don't redirect while the app is still checking localStorage
    if(isLoading) {
        return(
            <div className="h-screen flex items-center justify-center">
                <div className="text-[10px] uppercase tracking-[0.4em] animate-pulse">
                    Verifying Credentials...
                </div>
            </div>
        );
    }

    // Not Logged In: Kick them to home (or login)
    if(!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Admin Check: (Optional for now, but part of your "Includes")
    if (requireAdmin && user.role !== 'admin') {
      return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>
}