import { Routes, Route, BrowserRouter } from 'react-router';
import UserForm from './UserForm';
import UserList from './UserList';
import UserDetail from './UserDetail';
import UserLayout from './UserLayout';
import NoPage from './NoPage';

export default function UserManager() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout />}>
            <Route
            index
            element={
                <div className="space-y-8">
                <UserForm />
                <UserList />
                </div>
            }
            />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="*" element={<NoPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
   
  );
}