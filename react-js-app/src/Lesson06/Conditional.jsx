import React, { useEffect } from 'react';

export default function Conditional() {
  let id = 1;

  return (
    <div>
      <User id={id} />
    </div>
  );
}

function User({ id }) {
  useEffect(() => {
    fetch(`/api/user/${id}`).then((res) => {
      console.log(res);
    });
  }, [id]);

  return <div>User</div>;
}
