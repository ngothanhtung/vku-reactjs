import React from 'react';
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router';

function About() {
  return <h2>About Page</h2>;
}

function Albums() {
  const data = useLoaderData();
  return <h2>Albums Page: {JSON.stringify(data)}</h2>;
}

function NotFound() {
  return <h2>404 Not Found</h2>;
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/about', element: <About /> },
  {
    path: '/albums',
    element: <Albums />,
    loader: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      return response.json();
    },
  },
  { path: '*', element: <NotFound /> },
]);

function Home() {
  return <h2>Home Page</h2>;
}

export default function DataLoaders() {
  return <RouterProvider router={router} />;
}
