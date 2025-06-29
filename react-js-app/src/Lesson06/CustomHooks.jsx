import React, { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);
  return data;
}

export default function CustomHooks() {
  const data = useFetch('https://api.example.com/data');
  return <div>{data ? data : 'Loading'}</div>;
}
