import React from 'react';
import { createBrowserRouter, RouterProvider, useLoaderData, useRouteError } from 'react-router';

function About() {
  return <h2>About Page</h2>;
}
function NotFound() {
  return <h2>404 Not Found</h2>;
}

function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}
// This component will handle errors in the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary />,
    loader: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      return response.json();
    },
  },
  { path: '/about', element: <About /> },
  { path: '*', element: <NotFound /> },
]);

function Home() {
  const data = useLoaderData();
  return <h2>Home Page: {JSON.stringify(data)}</h2>;
}

export default function DataLoaders() {
  return <RouterProvider router={router} />;
}
