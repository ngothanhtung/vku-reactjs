import { createBrowserRouter, RouterProvider } from 'react-router';
import TasksPage from './pages/TasksPage';
import React, { useEffect, useState } from 'react';
import type { User } from './types';
import MainLayout from './MainLayout';
import CreateTaskPage from './pages/CreateTaskPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // errorElement: <Error />,
    children: [
      {
        path: '/home',
        index: true,
        element: <TasksPage />,
      },

      {
        path: '/tasks',
        element: <TasksPage />,
      },
      {
        path: '/create-task',
        element: <CreateTaskPage />,
      },
      {
        path: '/assignee-me',
        element: <TasksPage />,
      },
    ],
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

export default function TasksManagementWithAntd() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  );
}
