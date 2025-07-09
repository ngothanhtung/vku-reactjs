import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router';

import CreateTask from './pages/CreateTask';
import Tasks from './pages/Tasks';
import UpdateTask from './pages/UpdateTask';

// Navigation Component
const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Tasks', exact: true },
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
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Task Management</h1>
          </div>

          {/* Navigation Links */}
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function TaskManagement() {
  return (
    <div className="bg-gray-50">
      <BrowserRouter>
        <Navigation />
        <div className="container-fluid mx-auto px-8 py-4">
          <Routes>
            <Route index element={<Tasks />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/update/:id" element={<UpdateTask />} />
            <Route
              path="/assignee-me"
              element={
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Assigned to Me</h2>
                  <p className="text-gray-600">This page will show tasks assigned to you.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
