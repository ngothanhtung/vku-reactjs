import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useUserContext } from '../hooks/useUserContext';

export default function UserList() {
  const { users } = useUserContext();

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p><strong>{user.name}</strong></p>
                <p>Email: {user.email}</p>
                <p>Age: {user.age ?? 'N/A'}</p>
              </div>
              <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline flex items-center gap-1">
                Detail <ArrowRight size={16} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}