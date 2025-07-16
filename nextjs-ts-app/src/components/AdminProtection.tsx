/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminProtectionProps {
  children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // Not authenticated, redirect to login
      router.push('/auth/signin');
      return;
    }

    // Check if user has Administrators role
    const userRoles = (session.user as any)?.roles || [];
    const hasAdminRole = userRoles.some((role: any) => role.name === 'Administrators');

    if (!hasAdminRole) {
      // User doesn't have admin role, redirect to unauthorized page
      router.push('/unauthorized');
      return;
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600'></div>
        <span className='ml-2'>Loading...</span>
      </div>
    );
  }

  // Show loading while redirecting
  if (!session) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2'></div>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Check if user has admin role
  const userRoles = (session.user as any)?.roles || [];
  const hasAdminRole = userRoles.some((role: any) => role.name === 'Administrators');

  if (!hasAdminRole) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2'></div>
          <p>Checking permissions...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and has admin role, render children
  return <>{children}</>;
}
