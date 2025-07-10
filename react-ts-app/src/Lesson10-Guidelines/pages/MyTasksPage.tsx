import React, { useContext, useEffect } from 'react';
import AuthContext from '../context';
import { getTasksByAssignee } from '../services';
import type { Task } from '../types';

type Props = {};

export default function MyTasksPage({}: Props) {
  const { user } = useContext(AuthContext);

  console.log('MyTasksPage user', user);

  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const tasks = await getTasksByAssignee(user.id);
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user]);

  console.log('OurTasksPage user', user);
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: Task) => (
            <tr key={task.id} className="hover:bg-gray-100 transition-colors">
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.assignee_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
