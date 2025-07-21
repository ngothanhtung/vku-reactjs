import React from 'react';
import { useAuthStore } from '../useAuthStore';

/**
 * Protect Action Button with children Components
 * @param param0 
 * @returns 
 */
const ButtonWithPermissions: React.FC<{
    permissions: string[]
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    [key: string]: any;
  }> = ({ permissions, children, onClick, className = '', ...props }) => {
  

    if (!hasPermissions(permissions)) {
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

export default ButtonWithPermissions;