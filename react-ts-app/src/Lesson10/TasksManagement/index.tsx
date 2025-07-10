// Create LoginContext to manage login state
import { useContext, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router';

import { LoginContext } from './context';
import AssigneeMe from './pages/AssigneeMe';
import CreateTask from './pages/CreateTask';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import UpdateTask from './pages/UpdateTask';
import AccessDenied from './pages/AccessDenied';

// Navigation Component
const Navigation = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(LoginContext);
  console.log('Navigation user:', user);

  if (!user) {
    return null; // Hide navigation if user is not logged in
  }

  const navItems = [
    { path: '/tasks', label: 'Tasks', exact: true },
    { path: '/create', label: 'Create Task', exact: false },
    { path: '/assignee-me', label: 'Assigned to Me', exact: false },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Tasks Management</h1>
          </div>

          {/* Navigation Links */}
          {
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path, item.exact)
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setUser(null); // Clear user context on logout
                  navigate('/login'); // Redirect to login page on logout
                }}
                className="px-4 py-2 rounded-md text-sm bg-red-500 font-medium transition-colors duration-200 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default function TasksManagement() {
  const [user, setUser] = useState(null);
  return (
    <LoginContext.Provider value={{ user: user, setUser: setUser }}>
      <div className="bg-gray-50">
        <BrowserRouter>
          <Navigation />
          <div className="container-fluid mx-auto px-8 py-4">
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />

              {user && <Route path="/tasks" element={<Tasks />} />}
              {user && <Route path="/create" element={<CreateTask />} />}
              {user && <Route path="/update/:id" element={<UpdateTask />} />}
              {user && <Route path="/assignee-me" element={<AssigneeMe />} />}
              <Route path="*" element={<AccessDenied />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </LoginContext.Provider>
  );
}
