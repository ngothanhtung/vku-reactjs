import React from 'react';
import { useNavigate } from 'react-router';

import TaskDate from '../components/TaskDate';
import TaskPriority from '../components/TaskPriority';
import TaskStatus from '../components/TaskStatus';
import TaskTags from '../components/TaskTags';
import TaskTitle from '../components/TaskTitle';
import { data } from '../mock';

import type { Task } from '../types';
export default function Tasks() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const [tasks] = React.useState<Task[]>(data || []);

  const handleEdit = (taskId: string) => {
    console.log('Edit task:', taskId);
    // TODO: Navigate to edit page or open edit modal
    navigate(`/update/${taskId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <p className="text-gray-600 mt-1">Manage and track all your tasks</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <TaskTitle task={{ title: task.title, description: task.description }} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <TaskStatus task={task} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <TaskPriority priority={task.priority} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <TaskDate date={task.startDate} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <TaskDate date={task.dueDate} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.assigneeId || 'Unassigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TaskTags tags={task.tags} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No tasks found</div>
          <div className="text-gray-400 text-sm mt-2">Create your first task to get started</div>
        </div>
      )}
    </div>
  );
}
