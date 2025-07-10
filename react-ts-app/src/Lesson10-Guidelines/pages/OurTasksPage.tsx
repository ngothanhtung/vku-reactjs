import React, { useContext } from 'react';
import AuthContext from '../context';

type Props = {};

export default function OurTasksPage({}: Props) {
  const { user } = useContext(AuthContext);

  console.log('OurTasksPage user', user);
  return <div>OurTasksPage</div>;
}
