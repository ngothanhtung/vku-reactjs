import { useNavigate } from 'react-router';

export default function About() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/tasks')}>Tasks</button>
      <button onClick={() => navigate('/tasks-without-react-query')}>Tasks Without React Query</button>
    </div>
  );
}
