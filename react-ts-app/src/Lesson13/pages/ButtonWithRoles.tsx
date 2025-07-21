import React from 'react';
import { useAuthStore } from '../useAuthStore';

/**
 * Protect Action Button with children Components
 * @param param0 
 * @returns 
 */
const ButtonWithRoles: React.FC<{
    roles: string[]
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    [key: string]: any;
  }> = ({ roles, children, onClick, className = '', ...props }) => {
    
    const { loggedInUser } = useAuthStore();
    // If no user is logged in, return null to prevent rendering
    if (!loggedInUser) {
      return null;
    }
    // if no roles are provided, render the button
    const allow = loggedInUser.roles.some((userRole: any) => roles.includes(userRole.name));
    if(!allow) {
      return null;
    }
  
    return (
      <button  
        onClick={onClick} 
        className={className} 
        {...props}
      >
        {children}
      </button>
    );
  };

export default ButtonWithRoles;