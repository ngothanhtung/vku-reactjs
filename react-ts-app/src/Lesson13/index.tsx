/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout';
import { useAuthStore } from './useAuthStore';
import routes from './routes';

export default function TasksManagementWithZustandAndSecurity() {
  const { loggedInUser } = useAuthStore((state) => state);
  // Get array of user roles ["code"]
  const userRoles: string[] = loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];

  const generatedRoutes: any[] = routes
    .map((route) => {
      const routeRoles: string[] = route.roles || [];
      const hasAccess = userRoles.some((role: string) => {
        return role === 'administrators' || routeRoles.includes(role?.toLowerCase());
      });
      return hasAccess
        ? {
            path: route.path,
            element: route.element,
            index: route.index,
          }
        : null;
    })
    .filter(Boolean); // Filter out null values

  routes.forEach((route) => {
    if (route.isPublic) {
      generatedRoutes.push({
        path: route.path,
        element: route.element,
        index: route.index,
      });
    }
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: generatedRoutes,
    },

    //  NO MATCH ROUTE
    {
      path: '*',
      element: (
        <main style={{ padding: '1rem' }}>
          <p>404 Page not found 😂😂😂</p>
        </main>
      ),
    },
  ]);
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  );
}
