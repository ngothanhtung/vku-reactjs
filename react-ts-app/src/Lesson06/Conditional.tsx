import { useEffect } from 'react';

type UserProps = { id: number };
function User({ id }: UserProps) {
  useEffect(() => {
    fetch(`/api/user/${id}`).then((res) => {
      console.log(res);
    });
  }, [id]);

  return <div>User</div>;
}

export default function Conditional() {
  const id = 1;

  return (
    <div>
      <User id={id} />
    </div>
  );
}
