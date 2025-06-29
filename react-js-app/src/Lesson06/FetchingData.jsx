import React, { useState, useEffect } from 'react';

export default function FetchingData() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map((p) => (
        <p>{p.title}</p>
      ))}
    </div>
  );
}
