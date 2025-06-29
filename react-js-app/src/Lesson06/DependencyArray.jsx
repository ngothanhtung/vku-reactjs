import React, { useEffect } from 'react';

export default function DependencyArray({ id }) {
  useEffect(() => {
    fetch(`/api/user/${id}`).then((res) => {
      console.log(res);
    });
  }, [id]);

  return <div>User</div>;
}
