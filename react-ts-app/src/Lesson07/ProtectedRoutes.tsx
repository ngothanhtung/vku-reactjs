import React from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Login() {
  return <h2>Login Page</h2>;
}

function NotFound() {
  return <h2>404 Not Found</h2>;
}

function Private() {
  return <h2>Private Page - Only for authenticated users</h2>;
}

function Admin() {
  return <h2>Admin Page - Only for administrators</h2>;
}

const isAuthenticated = () => {
  return false;
};

const isAdministrator = false;

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/about', element: <About /> },
  { path: '*', element: <NotFound /> },
]);

const routerAdministrator = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  {
    path: '/private',
    element: <Private />,
    loader: () => (!isAuthenticated() ? redirect('/login') : null),
  },
  { path: '/about', element: <About /> },
  { path: '/admin', element: isAdministrator ? <Admin /> : <NotFound /> },

  { path: '*', element: <NotFound /> },
]);

export default function ProtectedRoutes() {
  return <RouterProvider router={isAdministrator ? routerAdministrator : router} />;
}
