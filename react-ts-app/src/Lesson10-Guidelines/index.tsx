import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import OurTasksPage from './pages/OurTasksPage';
import MyTasksPage from './pages/MyTasksPage';
import CreateTaskPage from './pages/CreateTaskPage';
import UpdateTaskPage from './pages/UpdateTaskPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import AuthContext from './context';

export default function TasksManagementGuidelines() {
  const [user, setUser] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="countainer mx-auto px-4 py-8">
        <h1>Tasks Management Guidelines</h1>
        <hr />
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Private */}
            {user && <Route path="/tasks" element={<OurTasksPage />} />}
            {user && <Route path="/assignee-me" element={<MyTasksPage />} />}
            {user && <Route path="/create-task" element={<CreateTaskPage />} />}
            {user && <Route path="/update-task" element={<UpdateTaskPage />} />}

            <Route path="/*" element={<AccessDeniedPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}
