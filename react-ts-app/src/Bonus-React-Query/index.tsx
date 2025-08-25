import { BrowserRouter, Link, Route, Routes } from 'react-router';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from './libraries/react-query';
import AccessDenied from './pages/AccessDenied';
import Tasks from './pages/Tasks';
import { LoginContext } from '@/Lesson10/TasksManagement/context';
import { useState } from 'react';
import Login from '@/Lesson13/pages/Login';
import About from './pages/About';
import TasksWithOutReactQuery from './pages/TasksWithOutReactQuery';
import CreateTask from './pages/CreateTask';

export default function ReactQueryExample() {
  const [user, setUser] = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
      <LoginContext.Provider value={{ user: user, setUser: setUser }}>
        <div className="bg-gray-50">
          <BrowserRouter>
            <Link to="/home" className="text-blue-500 hover:underline">
              Home
            </Link>
            <Link to="/about" className="text-blue-500 hover:underline">
              About
            </Link>
            <div className="container-fluid mx-auto px-8 py-4">
              <Routes>
                <Route index element={<Login />} />
                <Route path="/home" element={<About />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/create" element={<CreateTask />} />
                <Route path="/tasks-without-react-query" element={<TasksWithOutReactQuery />} />
                <Route path="*" element={<AccessDenied />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </LoginContext.Provider>
    </QueryClientProvider>
  );
}
