import { Navigate } from "react-router";
import { hasPermissions, hasAnyRoles, isAllowAccessForRoles } from "../auth.util";
import { useAuthStore } from "../auth.store";
import { PermissionCheckMode } from "../auth.type";

/**
 * Combined role and permission HOC
 * Protect just one Component
 * @param roles string[]
 * @param permissions  string[]
 * @param permissionMode 'any' | 'all'
 * @returns 
 */
const withRolesAndPermissions = (
    roles: string[],
    permissions: string[],
    permissionMode: PermissionCheckMode = 'any'
  ) => {
    return function <P extends object>(Component: React.ComponentType<P>) {
      return function WithRoleAndPermissionsComponent(props: P) {
        const { user } = useAuthStore();
        
        if (!user) {
          return <Navigate to="/login" replace />;
        }
        
        // Root users bypass all checks
        if (isAllowAccessForRoles(user.roles, ['root', 'admin'])) {
          return <Component {...props} />;
        }
        
        const hasRequiredRole = hasAnyRoles(roles);
        const hasRequiredPermissions = hasPermissions(permissions, permissionMode);
        
        if (!(hasRequiredRole && hasRequiredPermissions)) {
          return <Navigate to="/unauthorized" replace />;
        }
        
        return <Component {...props} />;
      };
    };
  };
export default withRolesAndPermissions