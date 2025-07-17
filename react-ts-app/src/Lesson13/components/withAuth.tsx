import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '../auth.store';

/**
 * Base authentication HOC
 * Protect just one Component
 * @param Component 
 * @returns 
 */
const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function WithAuthComponent(props: P) {
    const { user } = useAuthStore();
    
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    return <Component {...props} />;
  };
};
export default withAuth