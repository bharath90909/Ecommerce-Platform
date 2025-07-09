import React, { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../utils/constants";

interface AuthState {
  user: any | null;
  loading: boolean;
  isAdmin: boolean;
}

interface RootState {
  auth: AuthState;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = memo(
  ({ children, requireAdmin = false, redirectTo = ROUTES.LOGIN }) => {
    const location = useLocation();
    const { user, loading, isAdmin } = useSelector(
      (state: RootState) => state.auth
    );

    // Show loading spinner while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      );
    }

    // Redirect to login if not authenticated
    if (!user) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Check admin requirement
    if (requireAdmin && !isAdmin) {
      return (
        <Navigate
          to={ROUTES.HOME}
          state={{ from: location, error: "Admin access required" }}
          replace
        />
      );
    }

    return <>{children}</>;
  }
);

ProtectedRoute.displayName = "ProtectedRoute";

export default ProtectedRoute;
