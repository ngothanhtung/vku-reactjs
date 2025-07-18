// Create LoginContext to manage login state
import { BrowserRouter, Route, Routes } from 'react-router';

import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import Tasks from './pages/Tasks';
import Customer from './pages/Customer';
import { useAuthStore } from './useAuthStore';

export default function TasksManagementWithZustand() {
  const { loggedInUser } = useAuthStore((state) => state);

  console.log('loggedInUser', loggedInUser);

  return (
    <div className="bg-gray-50">
      <BrowserRouter>
        <div className="container-fluid mx-auto px-8 py-4">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<AccessDenied />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
