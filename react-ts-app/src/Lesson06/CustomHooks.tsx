import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // Add other fields as needed based on the API response
}

function useFetchUsers() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[] | null>(null);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return [data, loading] as const;
}

export default useFetchUsers;
