import React, { use, useContext } from 'react';
import AuthContext from '../context';
import { useNavigate } from 'react-router';

type Props = {};

export default function LoginPage({}: Props) {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    setUser(null);
    navigate('/tasks');
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
