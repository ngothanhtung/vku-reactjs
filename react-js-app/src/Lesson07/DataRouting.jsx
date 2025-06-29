import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}
function NotFound() {
  return <h2>404 Not Found</h2>;
}
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '*', element: <NotFound /> },
]);

export default function DataRouting() {
  return <RouterProvider router={router} />;
}
