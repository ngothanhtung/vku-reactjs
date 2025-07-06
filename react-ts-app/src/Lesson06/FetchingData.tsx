import { useState, useEffect } from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function FetchingData() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}
