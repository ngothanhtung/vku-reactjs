import React from 'react';
import TaskDate from '../components/TaskDate';
import TaskPriority from '../components/TaskPriority';
import TaskStatus from '../components/TaskStatus';
import TaskTitle from '../components/TaskTitle';

import type { Task } from '../types';
import { getTasks } from '@/Lesson10/TasksManagement/services';

export default function TasksWithOutReactQuery() {
  // Mock data for demonstration
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tasks?.map((task: Task) => (
          <tr key={task.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <TaskTitle task={{ title: task.title, description: task.description }} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <TaskStatus task={task} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <TaskPriority priority={task.priority || 'medium'} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <TaskDate date={task.start_date} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <TaskDate date={task.due_date} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <TaskDate date={task.completed_date} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.assignee_id || 'Unassigned'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
