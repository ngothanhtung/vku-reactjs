import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}
// Chaining effects in React allows you to fetch data sequentially based on the results of previous fetches.
// In this example, we first fetch a user by ID, and then fetch posts for that user.
// This is useful when the second fetch depends on the result of the first fetch, such as fetching posts for a specific user.
// This pattern is common in applications where data is interrelated, such as fetching user details and then fetching related data like posts or comments.
// It helps to avoid unnecessary API calls and ensures that the data is fetched in a logical order based on dependencies.

export default function ChainingEffects({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  useEffect(() => {
    if (user)
      fetch(`/api/posts/${user.id}`)
        .then((res) => res.json())
        .then(setPosts);
  }, [user]);

  return <div>{posts.length}</div>;
}
