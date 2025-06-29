import React, { useState, useEffect } from 'react';

export default function ChainingEffects({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
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
