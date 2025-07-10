import React, { useEffect } from 'react';
import { getTaskById } from '../services';
import { useNavigate, useParams } from 'react-router';

export default function ViewTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = React.useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Assuming getTask is a function that fetches a task by ID
        const result = await getTaskById(id ? parseInt(id) : 0);
        setTask(result);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);
  return (
    <div>
      ViewTask
      <div>
        {task ? (
          <div>
            <h2>{task.title}</h2>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Start Date: {task.start_date ? new Date(task.start_date).toLocaleDateString() : 'N/A'}</p>
            <p>Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
            <p>Assignee: {task.assignee_id}</p>
            <button onClick={() => navigate('/tasks')}>Back to Tasks</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
