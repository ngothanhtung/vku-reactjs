import React, { Suspense } from 'react';
import { Await, createBrowserRouter, RouterProvider, useLoaderData, useRouteError } from 'react-router';

function About() {
  return <h2>About Page</h2>;
}
function NotFound() {
  return <h2>404 Not Found</h2>;
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      return response.json();
    },
    errorElement: <ErrorBoundary />,
  },
  { path: '/about', element: <About /> },
  { path: '*', element: <NotFound /> },
]);

function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}

function Home() {
  const data = useLoaderData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data}>
        <h2>Data Loaded</h2>
      </Await>
    </Suspense>
  );
}

export default function SuspenseIntegration() {
  return <RouterProvider router={router} />;
}
