import React, { useEffect } from 'react';
import useFetchUsers from './CustomHooks';

interface IUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export default function UseEffectHookExamples() {
  const [userId, setUserId] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  // const [loading, setLoading] = React.useState(true);
  const [reload, setReload] = React.useState(0);
  // Method: 1
  // useEffect(() => {
  //   // This effect runs once when the component mounts
  //   // Call API
  //   fetch('https://jsonplaceholder.typicode.com/users2')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUsers(data);
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching users:', error);
  //     })
  //     .finally(() => {
  //       console.log('Fetch users completed');
  //       setLoading(false);
  //     });
  //   console.log('UseEffectHookExamples mounted');
  // }, [reload]);

  // Method 2: try catch
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     } finally {
  //       console.log('Fetch users completed');
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [reload]);
  const [data, loading] = useFetchUsers();
  console.log('useFetchUsers data:', data);

  console.log('UseEffectHookExamples rendered');
  if (loading) {
    return <div>Loading...</div>;
  }

  // Bad
  const handleClick = () => {
    setReload((prev) => prev + 1);
  };
  // DRY: Don't Repeat Yourself
  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleClick}>Reload data</button>
      <button onClick={() => setUserId((prev) => prev + 1)}>View User Details</button>
      <ul>
        {data?.map((user: IUser) => (
          <li key={user.id}>
            {user.name} - {user.email} ({user.phone})
          </li>
        ))}
      </ul>
      {/* <UserDetails userId={userId} /> */}
    </div>
  );
}

function UserDetails({ userId }: { userId: number }) {
  const [user, setUser] = React.useState<IUser | null>(null);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
    console.log(`UserDetails mounted for user ${userId}`);
  }, [userId]);

  return (
    <div>
      <h3>{user?.name}</h3>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
    </div>
  );
}
