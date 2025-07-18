/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { apiClient } from '../libraries/api-client';
import { useAuthStore } from '../useAuthStore';
import { useNavigate } from 'react-router';

export default function Tasks() {
  const { logOut, access_token, refresh_token, changeAccessToken, changeRefreshToken, loggedInUser } = useAuthStore((state) => state);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = (await apiClient.get('/workspaces/tasks')) as any[];
        console.log(tasks);
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChangeAccessToken = async () => {
    await changeAccessToken();
  };

  const handleChangeRefreshToken = async () => {
    await changeRefreshToken();
  };
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Tasks</h1>
      <button
        onClick={() => {
          logOut();
          navigate('/login');
        }}
      >
        Logout
      </button>
      <strong>{access_token}</strong>
      <br />
      <strong>{refresh_token}</strong>
      <button onClick={handleChangeAccessToken}>Change access token for demo</button>
      <button onClick={handleChangeRefreshToken}>Change refresh token for demo</button>
      <hr />

      {tasks?.map((task: any) => (
        <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}
