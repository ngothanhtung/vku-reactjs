import { Navigate } from "react-router";
import { hasAnyRoles, isAllowAccessForRoles } from "../auth.util";
import { useAuthStore } from "../auth.store";

/**
 * Role-based HOC
 * Protect just one Component
 * @param requiredRoles string[]
 * @returns 
 */
const withRoles = (requiredRoles: string[]) => {
    return function <P extends object>(Component: React.ComponentType<P>) {
      return function WithRoleComponent(props: P) {
        const {user } = useAuthStore();
        
        if (!user) {
          return <Navigate to="/login" replace />;
        }
        
        // Root users bypass role checks
        if (isAllowAccessForRoles(user.roles, ['root', 'admin'])) {
          return <Component {...props} />;
        }
        
        if (!hasAnyRoles(requiredRoles)) {
          return <Navigate to="/unauthorized" replace />;
        }
        
        return <Component {...props} />;
      };
    };
  };
  
export default withRoles