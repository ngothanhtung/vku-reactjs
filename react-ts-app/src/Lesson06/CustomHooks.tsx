import React, { useState, useEffect } from 'react';

function useFetchUsers() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return [data, loading];
}

export default useFetchUsers;
