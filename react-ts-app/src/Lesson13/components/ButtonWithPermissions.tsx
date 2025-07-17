import { Button } from "@/components/ui/button";
import { hasPermissions } from "../auth.util";


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
      <Button  
        onClick={onClick} 
        className={className} 
        {...props}
      >
        {children}
      </Button>
    );
  };

export default ButtonWithPermissions;