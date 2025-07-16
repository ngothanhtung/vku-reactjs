import { apiClient } from '../libraries/api-client';
import React from 'react';
import { useAuthStore } from '../useAuthStore';

export default function Tasks() {
  const { access_token, refresh_token, changeAccessToken, changeRefreshToken } = useAuthStore((state) => state);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await apiClient.get('/workspaces/tasks');
        console.log(tasks);
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
      <strong>{access_token}</strong>
      <br />
      <strong>{refresh_token}</strong>
      <button onClick={handleChangeAccessToken}>Change access token for demo</button>
      <button onClick={handleChangeRefreshToken}>Change refresh token for demo</button>
    </div>
  );
}
