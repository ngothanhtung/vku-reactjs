import { useEffect } from 'react';

type Props = {
  id: number;
};
export default function DependencyArray({ id }: Props) {
  useEffect(() => {
    fetch(`/api/user/${id}`).then((res) => {
      console.log(res);
    });
  }, [id]);

  return <div>User</div>;
}
