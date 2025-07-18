/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';

import routes from '../routes';
import { useAuthStore } from '../useAuthStore';
export default function MainLayout() {
  const { loggedInUser, logOut } = useAuthStore((state) => state);
  // Get array of user roles ["code"]
  const userRoles: string[] = loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];
  console.log('userRoles', userRoles);
  console.log('routes', routes);
  console.log('Current user:', loggedInUser);
  return (
    <div>
      {/* Render Navigation Bar using plain html */}
      <div style={{ display: 'flex', backgroundColor: '#d4bfff', justifyContent: 'space-between', padding: '10px' }}>
        <nav style={{ display: 'flex', gap: '10px', backgroundColor: '#d4bfff' }}>
          {routes.map((route) => {
            if (route.showOnMenu === false) {
              return null; // Skip routes that should not be shown on the menu
            }

            const routeRoles: string[] = route.roles?.map((role: string) => role?.toLowerCase()) || [];
            const hasAccess = userRoles.some((role: string) => {
              return role === 'administrators' || routeRoles.includes(role?.toLowerCase());
            });

            if (!hasAccess) {
              return null; // Skip routes that the user does not have access to
            }

            return (
              <NavLink key={route.path} to={route.path} style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'blue' })}>
                {route.name}
              </NavLink>
            );
          })}
        </nav>
        <div>
          {!loggedInUser && <Link to="/login">Login</Link>}
          {loggedInUser && (
            <button
              onClick={async () => {
                logOut().then(() => {
                  // Redirect to login page after logout
                  window.location.href = '/login';
                });
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <div>
        {/* Render the child routes */}
        <Outlet />
      </div>
    </div>
  );
}
